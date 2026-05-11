from fastapi import APIRouter

router = APIRouter()

@router.get("/tools")
def get_tools():
    return {"message": "Tools route working"}
