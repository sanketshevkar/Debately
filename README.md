![firebase](https://img.shields.io/badge/-firebase-orange)
![reactjs](https://img.shields.io/badge/-reactjs-blue)
![mongodb](https://img.shields.io/badge/-mongodb-brightgreen)
![fastapi](https://img.shields.io/badge/-fastapi-informational)

# Debately
![logo](https://camo.githubusercontent.com/4c64e0379b448981209cefc968c967242fee845f403a32f02dae6f94f01c27c3/68747470733a2f2f6261736963776562636861746170702e73332e61702d736f7574682d312e616d617a6f6e6177732e636f6d2f696d6167652e6a7067)\
Smart Debate analysis platform. </br>
Main server for managing all the services in the project.

### Prerequisites
This project has 2 seperate components,front-end and back-end.The front-end has node-module dependancies and requires node runtime.
The back-end is developed using fastapi and has pip dependencies.
1. [NodeJs](https://nodejs.org/en/download/)
2. [FastAPI](https://fastapi.tiangolo.com/)
3. [MongoDB](https://docs.atlas.mongodb.com/)
4. [Firebase](https://firebase.google.com/docs)
5. [WebRTC](https://webrtc.org/getting-started/overview)

---

### API Used
1. [Magic API](https://docs.magic.link/client-sdk/web/get-started)
2. [Symbl AI API](https://docs.symbl.ai/docs/streamingapi/tutorials/receive-ai-insights-from-your-web-browser)


---
### Run Loaclly

#### API Config

#### Firebase config file
```sh
cd ./client/src/firebase
```
Create firebase config file.\
File name - index.js
```sh
import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
});

export default firebase;
````

#### Magic API config file
```sh
cd ./client/src
```
Create magic config file.\
File name - magicKey.js
```sh
const magicKey = {
    API_KEY: ''
}

export default magicKey;
```


#### Starting the Back-end Server
 ```sh 
 pip install -r requirements.txt
 cd ./debately.deploy/backend
 uvicorn backend.app.main:app 
 ```
 
#### Starting the Front-end Server
```sh
cd ./client
npm install
npm start 
```

---
### Contribution Guidelines
For code contributions, read our [CONTRIBUTING guide](https://github.com/sanketshevkar/Debately/blob/main/CONTRIBUTE.md).


---
### System Architecture
![System_Architecture](https://basicwebchatapp.s3.ap-south-1.amazonaws.com/DEbate+Session.png)

---
### Team Tier-4
1. [Sanket Shevkar](https://github.com/sanketshevkar)
2. [Gatij Taranekar](https://github.com/gatij10)
3. [Aaryan Srivastava](https://github.com/aaryan11-hash)
4. [Pranav Pathare](https://github.com/Pranavpathare)
