print("Loading auth_routes.py")
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user_schema import UserCreate, UserLogin
from app.services.user_service import create_user, get_user_by_username
from app.services.auth_service import authenticate_user, create_access_token, get_current_user


router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(user: UserCreate):
    try:
        user_id = create_user(user)
        if not user_id:
            raise HTTPException(status_code=400, detail="Username already exists")
        return {"message": "User created successfully", "user_id": user_id}
    except Exception as e:
        print(f"Error in signup: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token({"sub": user["username"]})
    return {"access_token": access_token, "token_type": "bearer"}