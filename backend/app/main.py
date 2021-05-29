from fastapi import FastAPI
from .profilecontroller import router as pr
from .roomcontroller import router as rr

app = FastAPI()

app.include_router(pr)
app.include_router(rr)