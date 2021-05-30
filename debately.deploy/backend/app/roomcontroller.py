from fastapi import APIRouter
import json
from bson import json_util
from pydantic.errors import ColorError
from .models import SessionDetails, Report
from .configs.mongoconnect import connectMongoClient

router = APIRouter(prefix="/meetings")

db = connectMongoClient()
collection = db['meetings']

@router.get('/{session_id}')
def getSessionByMeetingId(session_id : int):
    """Gets all session details of session with given session_id

    Parameters:
    str: session_id

    Returns:
    Bool: Json with session details"""
    session_room = json.loads(json_util.dumps(collection.find_one({"session_id":session_id})))
    return session_room

@router.post('/add_meeting',status_code=200)
def postSessionById(session_obj : SessionDetails):
    """Add session details of session

    Parameters:
    None

    Returns:
    Bool: Insert Success or Failure"""
    collection.insert_one(dict(session_obj))
    return "insert successful"

@router.delete('/{session_id}',status_code=200)
def deleteSessionByMeetingId(session_id : int):
    """Delete all session details of session with given session_id

    Parameters:
    str: session_id

    Returns:
    Bool: Delete Success / Failure"""
    collection.delete_one({"session_id":session_id})
    return {}