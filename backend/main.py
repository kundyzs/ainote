from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.ws import router as websocket_router
from backend.routes.upload import router as upload_router 

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