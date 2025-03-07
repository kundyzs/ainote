from fastapi import APIRouter, UploadFile, File
from ..services.ai_service import process_file

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())
    result = process_file(file_path)
    return {"filename": file.filename, "result": result}