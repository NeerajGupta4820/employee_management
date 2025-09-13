from app.config import db
from app.schemas.user_schema import UserCreate
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_user(user: UserCreate):
    # Check if username or email already exists
    if db.users.find_one({"$or": [{"username": user.username}, {"email": user.email}]}):
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

def get_user_by_email(email: str):
    return db.users.find_one({"email": email})

# New function to find user by username OR email
def get_user_by_username_or_email(identifier: str):
    return db.users.find_one({
        "$or": [
            {"username": identifier},
            {"email": identifier}
        ]
    })