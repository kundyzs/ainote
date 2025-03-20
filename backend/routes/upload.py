from fastapi import APIRouter, UploadFile, File
from services.ai_service import process_file, extract_text_from_image

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())
    result = process_file(file_path)
    return {"filename": file.filename, "result": result}

@router.post("/process-frame")
async def process_frame(file: UploadFile = File(...)):
    # Save the uploaded frame
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    # Extract text from the frame
    text = extract_text_from_image(file_path)

    return {"text": text}