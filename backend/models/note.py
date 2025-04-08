from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel

Base = declarative_base()

class Note(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String)

class NoteBase(BaseModel):
    title: str
    content: str

class NoteResponse(NoteBase):
    id: int

    class Config:
        orm_mode = True
