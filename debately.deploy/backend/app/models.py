from fastapi.params import File
from pydantic import BaseModel

class Profile(BaseModel):
    email:str
    user_name:str
    description : str
    birth_date : str
    name : str
    wallet_amt : int
    rating : int
    total_debates_attended : int
    meeting_id_list : list
    
class Report(BaseModel):
    reportForUser1 : str
    reportForUser2 : str

class MeetingDto(BaseModel):
    profile_email : str
    meeting_id : str

class SessionDetails(BaseModel):
    session_id : int
    anonymous_name_1 : str
    anonymous_name_2 : str
    user_1_email : str
    user_2_email : str
    report : Report
    




