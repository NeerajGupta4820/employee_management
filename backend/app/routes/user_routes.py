from fastapi import APIRouter, Depends, HTTPException, status
from app.services.user_service import get_user_by_username
from app.schemas.user_schema import UserOut
from app.services.auth_service import get_current_user


router = APIRouter(prefix="/user", tags=["User"])

@router.get("/profile", response_model=UserOut)
def get_profile(current_user: dict = Depends(get_current_user)):
    user = get_user_by_username(current_user["username"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserOut(
        username=user["username"],
        email=user["email"],
        id=str(user.get("_id", ""))
    )

@router.put("/profile", response_model=UserOut)
def update_profile(update: UserOut, current_user: dict = Depends(get_current_user)):
    user = get_user_by_username(current_user["username"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user["email"] = update.email
    from app.config import db
    db.users.update_one({"username": user["username"]}, {"$set": {"email": update.email}})
    return UserOut(
        username=user["username"],
        email=update.email,
        id=str(user.get("_id", ""))
    )
