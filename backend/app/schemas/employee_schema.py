from pydantic import BaseModel, Field
from typing import List, Optional

class EmployeeBase(BaseModel):
    employee_id: str
    name: str
    department: str
    salary: float
    joining_date: str
    skills: List[str]

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    department: Optional[str] = None
    salary: Optional[float] = None
    joining_date: Optional[str] = None
    skills: Optional[List[str]] = None
