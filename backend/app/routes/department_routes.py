# app/routes/department_routes.py
from fastapi import APIRouter
from app.services.employee_service import average_salary_by_department

router = APIRouter(prefix='/department', tags=['Department'])

@router.get('/avg-salary')
def get_department_avg_salary():
    return average_salary_by_department()