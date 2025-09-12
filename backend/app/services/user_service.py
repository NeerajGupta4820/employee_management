from app.config import db
from app.schemas.user_schema import UserCreate
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_user(user: UserCreate):
    if db.users.find_one({"username": user.username}):
        return None
    password_hash = pwd_context.hash(user.password)
    user_doc = {
        "username": user.username,
        "email": user.email,
        "password_hash": password_hash
    }
    result = db.users.insert_one(user_doc)
    return str(result.inserted_id)

def get_user_by_username(username: str):
    return db.users.find_one({"username": username})
