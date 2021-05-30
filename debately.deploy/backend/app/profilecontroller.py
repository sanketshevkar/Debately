from fastapi import APIRouter
import json
import requests
from bson import json_util
from starlette.routing import Router
# from ..configs.mongoconnect import connectMongoClient
from .models import Profile,MeetingDto
from .configs.mongoconnect import connectMongoClient

router = APIRouter(prefix="/profiles")  

db = connectMongoClient()
collection = db['test']

@router.get('/')
def getProfiles():
    
    """Gets all profile details

    Parameters:
    None

    Returns:
    Json with Profiles"""
    
    profile_list = []
    profile_results = collection.find()

    for profiles in profile_results:
        profile_list.append(json.loads(json_util.dumps(profiles)))
    
    return profile_list


@router.get('/{profile_email}')
def getProfileByProfileId(profile_email : str):
    """Gets all profile details of user with given profile_email

    Parameters:
    str: profile_email

    Returns:
    Json with Profile details """

    profile_result = collection.find_one({"email":profile_email})

    profile = json.loads(json_util.dumps(profile_result))
    
    return profile

@router.post('/')
def postNewProfile(profile : Profile):
    
    """Gets all profile details of user with given profile_email

    Parameters:
    str: profile_email

    Returns:
    Json with Profile details """
    
    profile_email = profile.email
    profile_query = collection.find({"email":profile_email})
    profile_query = [item for item in profile_query]

    if not profile_query : 
        collection.save(dict(profile))
        return True

    return False


@router.post("/add_meeting")
def add_meeting(meetingDto : MeetingDto):
    email = meetingDto.profile_email
    meeting_id = meetingDto.meeting_id
    collection.update({"email":email},{"$push":{"meeting_id_list":meeting_id}})
    
    return True
    


@router.delete('/{profile_email}',status_code=200)
def delete_Profile_By_Id(profile_email : str):
    """Deletes all profile details of user with given profile_email

    Parameters:
    str: profile_email

    Returns:
    Bool: Success of deletion """
    
    result = collection.delete_one({"email":profile_email})
    
    return result.acknowledged


@router.get('/analytics/{conversation_id}')
def get_analytics_by_conversationid(conversation_id : str):

    baseUrl = "https://api.symbl.ai/v1/conversations/"+conversation_id+"/analytics"

    access_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjU4ODk2MzMyODYwOTQ4NDgiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiM2RYcUVUYmt5am9CRWpJc2dPQjFSanM3N1Z2blNpaW9AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjIyMzIzODQ4LCJleHAiOjE2MjI0MTAyNDgsImF6cCI6IjNkWHFFVGJreWpvQkVqSXNnT0IxUmpzNzdWdm5TaWlvIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.TeZQ7ZpYgPNW5l67RpWWUKEZnej4YVtfbjoVOzpGvQ-MV9556e0xJy3WqVMfvC5yrdnB_Wrutu-xbhsrmxl_dUtv4aoToXTTjT8s5z-EFC0qhvTr0KZhQk4iDrVzNn3ba8pR-hSAYsaxUjD01hYGbUe-pr36PvnuMWIJ-UtnpHMBeUkZjdzNCvbGg_m3B9wwXe5Fdqf1nJDfmqGbx1CyCfW_ln1-y_fcfrsilULXc-z0fTDW6l3Iv7EAzqT_8G2jQx94hG96RQ8OifJY6cVIFBiIYYmsQAYik2zOXS7GcXH4Gzd_zCchCMuErO1PASn6vbMHx1kwLYSyATBaUtJX3w'

    headers = {

    'Authorization': 'Bearer ' + access_token,

    'Content-Type': 'application/json'

    }

    response = requests.request("GET", baseUrl, headers=headers)

    return response.json()