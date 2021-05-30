from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .profilecontroller import router as pr
from .roomcontroller import router as rr


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pr)
app.include_router(rr)