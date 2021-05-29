from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()

class City(BaseModel):
    name : str
    timeZone : str

class Profile(BaseModel):
    name : str
    walletAmt : int 
    rating : int
    totalDebatesAttended : int
    

@app.get('/profiles')
def getProfiles():
    #extract data from pymongo Layer and return the object list
    return {}

@app.get('/profile/{profile_id}')
def getProfileByProfileId(profile_id : int):
    #extract data from pymongo Layer and return the object
    return {}

@app.post('/profile')
def postNewProfile(profile : Profile):
    #save profile object to db via pymongo layer
    return {}

@app.delete('/profile/{profile_id}')
def deleteProfileById(profile_id : int):
    #delete profile object from db via pymongo layer
    return {}

