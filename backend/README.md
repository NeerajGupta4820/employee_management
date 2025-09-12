# Employee Management System Backend

## Features
- FastAPI + MongoDB (local)
- JWT Authentication (Signup, Login)
- Protected CRUD APIs for employees
- Query, aggregation, search, pagination
- User profile endpoints
- MongoDB index and schema validation

## Endpoints
- POST /auth/signup
- POST /auth/login
- GET/PUT /user/profile
- CRUD /employees
- GET /employees?department=Engineering
- GET /employees/avg-salary
- GET /employees/search?skill=Python

## Setup
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Set up `.env` with MongoDB and secret key
3. Run server:
   ```bash
   uvicorn app.main:app --reload
   ```

## Notes
- All employee endpoints require JWT authentication
- User passwords are securely hashed
- MongoDB must be running locally
