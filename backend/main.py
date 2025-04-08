from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from api.ws import router as websocket_router
from routes.upload import router as upload_router 
import models.note as models
import database
from pydantic import BaseModel
import os
from sqlalchemy import create_engine, text
import dotenv

engine = create_engine(dotenv.load_dotenv["DATABASE_URL"])
conn = engine.connect()

res = conn.execute(text("SELECT now()")).fetchall()
print(res)
app = FastAPI()

# Add CORS middleware if needed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(websocket_router)
app.include_router(upload_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Note Taker!"}

# Database Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic Model for Note
class NoteCreate(BaseModel):
    title: str
    content: str

# CRUD Endpoints
@app.post("/notes", response_model=models.NoteResponse)
def create_note(note: NoteCreate, db: Session = Depends(get_db)):
    db_note = models.Note(title=note.title, content=note.content)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

@app.get("/notes", response_model=list[models.NoteResponse])
def get_notes(db: Session = Depends(get_db)):
    return db.query(models.Note).all()

@app.put("/notes/{note_id}", response_model=models.NoteResponse)
def update_note(note_id: int, note: NoteCreate, db: Session = Depends(get_db)):
    db_note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    db_note.title = note.title
    db_note.content = note.content
    db.commit()
    db.refresh(db_note)
    return db_note

@app.delete("/notes/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    db_note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(db_note)
    db.commit()
    return {"message": "Note deleted"}

# Run uvicorn server with:
# uvicorn backend.main:app --reload
