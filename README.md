*Smart Debate analysis platform*
# Debately server

Main server for managing all the services in the project.
![ezgif com-gif-maker] embed video here


## Prerequisites
This project has 2 seperate components,front-end and back-end.The front-end has node-module dependancies and requires node runtime.
The back-end is developed using fastapi and has pip dependencies.


## Starting the Back-end Server
 ```sh 
 pip install -r requirements.txt
 cd ./backend
 uvicorn backend.app.main:app 
 ```
 
## Starting the Front-end Server
```sh 
cd ./client
npm install
npm start ```


## System Architecture

![System_Architecture](https://basicwebchatapp.s3.ap-south-1.amazonaws.com/DEbate+Session.png)