from fastapi import APIRouter
# from ..configs.mongoconnect import connectMongoClient
from .models import Profile

<<<<<<< HEAD:app/ProfileController.py

app = FastAPI()
=======
router = APIRouter(prefix="/profiles")  
>>>>>>> df059f84cc2b71ec83f5c36721e0708df14c1514:backend/app/profilecontroller.py

@router.get('/')
def getProfiles():
    #extract data from pymongo Layer and return the object list
    return "Hello"

@router.get('/{profile_id}')
def getProfileByProfileId(profile_id : int):
    #extract data from pymongo Layer and return the object
    return {}

@router.post('/')
def postNewProfile(profile : Profile):
    #save profile object to db via pymongo layer
    return {}

@router.delete('/{profile_id}')
def deleteProfileById(profile_id : int):
    #delete profile object from db via pymongo layer
    return {}
