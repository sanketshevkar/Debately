from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient

import requests

class Report(BaseModel):
    reportForUser1 : str
    reportForUser2 : str

class SessionDetails(BaseModel):
    sessionId : int
    anonymousName1 : str
    anonymousName2 : str
    report : str


@app.get('/meeting/{meeting_id}')
def getSessionByMeetingId(meeting_id : int):
     #extract data from pymongo Layer and return the object list
    return {}

@app.post('/meeting/{meeting_id}')
def postSessionById():
    #save profile object to db via pymongo layer
    return {}

@app.delete('/delete/{meeting_id}')
def deleteSessionByMeetingId():
     #delete profile object from db via pymongo layer
    return {}

