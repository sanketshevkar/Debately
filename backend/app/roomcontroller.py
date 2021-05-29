from fastapi import APIRouter
# from ..configs.mongoconnect import MongoClient
from .models import SessionDetails, Report

router = APIRouter(prefix="/meetings")

@router.post('/')
def tp(obj):
    return obj

@router.get('/{meeting_id}')
def getSessionByMeetingId(meeting_id : int):
     #extract data from pymongo Layer and return the object list
    return {}

@router.post('/{meeting_id}')
def postSessionById(meeting_id : int, session_obj : SessionDetails):
    #save profile object to db via pymongo layer
    return {}

@router.delete('/{meeting_id}')
def deleteSessionByMeetingId():
     #delete profile object from db via pymongo layer
    return {}