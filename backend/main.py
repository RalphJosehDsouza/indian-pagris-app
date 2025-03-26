from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
from fastapi.responses import JSONResponse
from fastapi.middleware.gzip import GZipMiddleware
from bson import ObjectId
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

app = FastAPI(title="Indian Pagris API")

@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Content-Security-Policy"] = "default-src 'self'"
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "127.0.0.1"]
)

app.add_middleware(GZipMiddleware, minimum_size=1000)

try:
    MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    client = AsyncIOMotorClient(
        MONGODB_URL,
        serverSelectionTimeoutMS=5000,
        connectTimeoutMS=5000,
        retryWrites=True,
        w='majority'
    )
    db = client.indian_pagris
    logger.info("Successfully connected to MongoDB")
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {str(e)}")
    raise

class Pagri(BaseModel):
    name: str
    region: str
    description: str
    historical_significance: str
    cultural_value: str
    tying_instructions: List[str]
    image_url: str

    class Config:
        min_length = 1
        max_length = 1000

@app.get("/")
async def read_root():
    return {"message": "Welcome to Indian Pagris API"}

@app.get("/pagris")
async def get_pagris():
    pagris = await db.pagris.find().to_list(1000)
    for pagri in pagris:
        pagri["_id"] = str(pagri["_id"])
    return pagris

@app.get("/pagris/{pagri_id}")
async def get_pagri(pagri_id: str):
    try:
        pagri = await db.pagris.find_one({"_id": ObjectId(pagri_id)})
        if pagri:
            pagri["_id"] = str(pagri["_id"])
            return pagri
        raise HTTPException(status_code=404, detail="Pagri not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/pagris")
async def create_pagri(pagri: dict):
    result = await db.pagris.insert_one(pagri)
    pagri["_id"] = str(result.inserted_id)
    return pagri

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logging.error(f"Global error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 