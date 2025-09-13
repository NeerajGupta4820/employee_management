
# Employee Management System

A professional full-stack application for managing employee data, featuring a modern React frontend and FastAPI backend with MongoDB.

---

## 📋 Overview
This project delivers a robust Employee Management System, fulfilling all requirements of the Python + MongoDB assessment. It combines a responsive React UI (Vite + Tailwind CSS) with a secure FastAPI backend and MongoDB database.

---

## 🏗️ Architecture
- **Frontend:** React 18, Vite, Tailwind CSS
- **Backend:** FastAPI (Python 3.8+)
- **Database:** MongoDB
- **Authentication:** JWT Tokens
- **API Communication:** RESTful APIs (axios)

---

## 📁 Project Structure
```
employee_management/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── config.py
│   ├── requirements.txt
│   └── main.py
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── services/
    │   ├── utils/
    │   └── pages/
    ├── package.json
    └── vite.config.js
```

---

## 🖼️ Images
<!-- Add screenshots or architecture diagrams here -->

---

## ✅ Assessment Requirements

### 1. Setup
- FastAPI backend with modular structure
- MongoDB connection in `config.py`
- Database: `assessment_db`, Collection: `employees`
- Document structure matches sample

### 2. Core CRUD APIs
- **Create Employee:** `POST /employees` (unique `employee_id` enforced)
- **Get Employee by ID:** `GET /employees/{employee_id}` (404 if not found)
- **Update Employee:** `PUT /employees/{employee_id}` (partial updates supported)
- **Delete Employee:** `DELETE /employees/{employee_id}` (auth protected)

### 3. Querying & Aggregation
- **List by Department:** `GET /employees?department=Engineering` (sorted by joining date)
- **Average Salary by Department:** `GET /employees/avg-salary` (aggregation pipeline)
- **Search by Skill:** `GET /employees/search?skill=Python` (array search)

### 4. Bonus Features
- Pagination for employee listing
- Unique index on `employee_id`
- Pydantic schema validation
- JWT authentication for protected routes

---

## 🚀 Features

### Backend
- RESTful API (FastAPI)
- MongoDB integration (PyMongo)
- JWT authentication
- Pydantic validation
- Error handling (HTTP status codes)
- CORS for frontend
- Environment variable support

### Frontend
- Modern React app (Vite)
- Responsive UI (Tailwind CSS)
- JWT auth handling
- Employee CRUD
- Search & filter
- Department salary analytics
- Pagination
- Form validation & error handling

### Security
- Password hashing (bcrypt)
- JWT token-based auth
- Protected routes
- Input validation (frontend & backend)
- CORS for secure requests

---

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- MongoDB (local/Atlas)
- npm or yarn

### Backend
```bash
cd backend
pip install -r requirements.txt
# Set environment variables
echo "MONGODB_URL=mongodb://localhost:27017" > .env
echo "SECRET_KEY=your-secret-key-here" >> .env
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
# Set environment variables
echo "VITE_API_BASE_URL=http://localhost:8000" > .env
npm run dev
```

---

## 📊 API Endpoints
| Method | Endpoint                  | Description                   | Auth |
|--------|---------------------------|-------------------------------|------|
| POST   | /auth/signup              | User registration             | No   |
| POST   | /auth/login               | User login                    | No   |
| GET    | /employees                | List employees (filtering)    | No   |
| POST   | /employees                | Create employee               | Yes  |
| GET    | /employees/{id}           | Get employee by ID            | No   |
| PUT    | /employees/{id}           | Update employee               | Yes  |
| DELETE | /employees/{id}           | Delete employee               | Yes  |
| GET    | /employees/avg-salary     | Department salary analytics    | No   |
| GET    | /employees/search         | Search by skill               | Yes  |
| GET    | /user/profile             | Get user profile              | Yes  |

---

## 🎯 Usage
- Register/Login to access protected features
- View, add, edit, and delete employees
- Search/filter employees
- View department-wise salary analytics

---

## 🔧 Technical Highlights
- Modern stack: React, FastAPI, MongoDB
- Type safety: Pydantic schemas
- Error handling: Frontend & backend
- Responsive design: Tailwind CSS
- Performance: Pagination, efficient queries
- Security: JWT, password hashing

---

## 📝 Assignment Compliance
This implementation fully satisfies all requirements from the Python + MongoDB assessment:
- All core CRUD operations
- All querying & aggregation
- All bonus features (pagination, indexing, validation, auth)
- Well-structured, documented code
- Easy local setup