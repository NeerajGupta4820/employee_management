from pydantic import BaseModel, Field, validator
from typing import List, Optional
from datetime import datetime
import re

class EmployeeBase(BaseModel):
    employee_id: str = Field(..., min_length=1, max_length=20, description="Unique employee identifier")
    name: str = Field(..., min_length=1, max_length=100, description="Employee full name")
    department: str = Field(..., min_length=1, max_length=50, description="Department name")
    salary: float = Field(..., ge=0, le=1000000, description="Salary amount (0 to 1,000,000)")
    joining_date: str
    skills: List[str] = Field(..., min_items=1, description="List of skills")

    @validator('employee_id')
    def validate_employee_id(cls, v):
        if not re.match(r'^[A-Za-z0-9_-]+$', v):
            raise ValueError('Employee ID can only contain letters, numbers, underscores, and hyphens')
        return v

    @validator('name')
    def validate_name(cls, v):
        if not re.match(r'^[A-Za-z\s\.\-]+$', v):
            raise ValueError('Name can only contain letters, spaces, dots, and hyphens')
        return v.title()

    @validator('joining_date')
    def validate_joining_date(cls, v):
        try:
            # Try to parse the date to ensure it's valid
            datetime.strptime(v, '%Y-%m-%d')
            return v
        except ValueError:
            raise ValueError('Joining date must be in YYYY-MM-DD format')

    @validator('skills', each_item=True)
    def validate_skills(cls, v):
        if not v.strip():
            raise ValueError('Skill cannot be empty')
        return v.strip()

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100, description="Employee full name")
    department: Optional[str] = Field(None, min_length=1, max_length=50, description="Department name")
    salary: Optional[float] = Field(None, ge=0, le=1000000, description="Salary amount (0 to 1,000,000)")
    joining_date: Optional[str] = None
    skills: Optional[List[str]] = Field(None, min_items=1, description="List of skills")

    @validator('name', always=True)
    def validate_name(cls, v):
        if v is not None:
            if not re.match(r'^[A-Za-z\s\.\-]+$', v):
                raise ValueError('Name can only contain letters, spaces, dots, and hyphens')
            return v.title()
        return v

    @validator('joining_date', always=True)
    def validate_joining_date(cls, v):
        if v is not None:
            try:
                datetime.strptime(v, '%Y-%m-%d')
                return v
            except ValueError:
                raise ValueError('Joining date must be in YYYY-MM-DD format')
        return v

    @validator('skills', always=True)
    def validate_skills(cls, v):
        if v is not None:
            return [skill.strip() for skill in v if skill.strip()]
        return v