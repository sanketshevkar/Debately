from fastapi.testclient import TestClient
import re 
import requests as req


def test_read_main():
    response = req.get("/")
    assert response.status_code == 200
    assert response.json() == {"msg": "Hello World"}

def test_profile_list_fetcher():
    response = req.get("http://localhost:8000/profiles/")
    assert len(response.json()) != 0


def test_delete_profile_success():
    
    req.post("http://localhost:8000/profile/",{"email": "test@mail.com","name": "testname","wallet_amt": 123,"rating": 34,"total_debates_attended": 38})
    
    reponse = req.delete("http://localhost:8000/profile/test@mail.com")

    assert reponse.json() == True
 
 