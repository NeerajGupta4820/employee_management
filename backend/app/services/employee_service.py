from app.config import db
from app.schemas.employee_schema import EmployeeCreate, EmployeeUpdate

def get_all_employees(skip: int = 0, limit: int = 100):
    cursor = db.employees.find({}, {"_id": 0}).sort("joining_date", -1).skip(skip).limit(limit)
    return list(cursor)

def create_employee(emp: EmployeeCreate):
    if db.employees.find_one({"employee_id": emp.employee_id}):
        return None
    result = db.employees.insert_one(emp.dict())
    return str(result.inserted_id)

def get_employee(employee_id: str):
    return db.employees.find_one({"employee_id": employee_id}, {"_id": 0})

def update_employee(employee_id: str, data: EmployeeUpdate):
    update_data = {k: v for k, v in data.dict().items() if v is not None}
    result = db.employees.update_one({"employee_id": employee_id}, {"$set": update_data})
    return result.matched_count

def delete_employee(employee_id: str):
    result = db.employees.delete_one({"employee_id": employee_id})
    return result.deleted_count

def list_employees_by_department(department: str, skip: int = 0, limit: int = 10):
    cursor = db.employees.find({"department": department}, {"_id": 0}).sort("joining_date", -1).skip(skip).limit(limit)
    return list(cursor)

def average_salary_by_department():
    pipeline = [
        {"$group": {"_id": "$department", "avg_salary": {"$avg": "$salary"}}},
        {"$project": {"department": "$_id", "avg_salary": 1, "_id": 0}}
    ]
    return list(db.employees.aggregate(pipeline))

def search_employee_by_skill(skill: str):
    return list(db.employees.find({"skills": skill}, {"_id": 0}))
