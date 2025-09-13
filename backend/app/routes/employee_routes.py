from fastapi import APIRouter, HTTPException, Query, Depends, Request
from app.schemas.employee_schema import EmployeeCreate, EmployeeUpdate
from app.services.employee_service import (
    create_employee, get_employee, update_employee, delete_employee,
    list_employees_by_department, average_salary_by_department, search_employee_by_skill, get_all_employees
)
from app.services.auth_service import get_current_user

router = APIRouter(prefix='/employees', tags=['Employees'])

@router.get('/employees/all')
def get_all_employees_route(skip: int = 0, limit: int = 100):
    return get_all_employees(skip, limit)

@router.post('/', dependencies=[Depends(get_current_user)])
def create_employee_route(emp: EmployeeCreate):
    emp_id = create_employee(emp)
    if not emp_id:
        raise HTTPException(status_code=400, detail='Employee ID already exists')
    return {'message': 'Employee created', 'id': emp_id}

@router.get('/{employee_id}')
def get_employee_route(employee_id: str):
    emp = get_employee(employee_id)
    if not emp:
        raise HTTPException(status_code=404, detail='Employee not found')
    return emp

@router.put('/{employee_id}', dependencies=[Depends(get_current_user)])
async def update_employee_route(employee_id: str, request: Request):
    body = await request.json()
    try:
        emp = EmployeeUpdate(**body)
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Pydantic parse error: {str(e)}")
    count = update_employee(employee_id, emp)
    if count == 0:
        raise HTTPException(status_code=404, detail='Employee not found')
    return {'message': 'Employee updated'}

@router.delete('/{employee_id}', dependencies=[Depends(get_current_user)])
def delete_employee_route(employee_id: str):
    count = delete_employee(employee_id)
    if count == 0:
        raise HTTPException(status_code=404, detail='Employee not found')
    return {'message': 'Employee deleted'}


@router.get('/')
def list_employees(
    department: str = Query(None),
    search: str = Query(None),
    skip: int = 0,
    limit: int = 10
):
    from app.config import db
    query = {}
    if department:
        query['department'] = department
    if search:
        search_regex = {"$regex": search, "$options": "i"}
        query["$or"] = [
            {"name": search_regex},
            {"skills": search_regex},
            {"department": search_regex},
            {"employee_id": search_regex},
            {"salary": {"$regex": search, "$options": "i"}}
        ]
    total_count = db.employees.count_documents(query)
    cursor = db.employees.find(query, {"_id": 0}).sort("joining_date", -1).skip(skip).limit(limit)
    employees = list(cursor)
    return {"employees": employees, "total": total_count}

@router.get('/avg-salary', dependencies=[Depends(get_current_user)])
def avg_salary():
    return average_salary_by_department()

@router.get('/search', dependencies=[Depends(get_current_user)])
def search_by_skill(skill: str = Query(...)):
    return search_employee_by_skill(skill)
