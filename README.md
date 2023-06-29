# Talker-Manager project
 
# context
 

This API provides a modern and advanced solution for managing people's information, developed with the Express framework and the Node.js programming language. It offers a variety of features to perform CRUD (Create, Read, Update and Delete) operations efficiently and securely.

With this API, it is possible to easily carry out operations of searching, registering, editing and deleting registered people, thus guaranteeing the organization and security of the data. Data storage is done using the fs module, which writes in a Json file, providing a simple and fast implementation for the need. In addition, you can access the documentation built into the swagger available in the "/doc" route for a better understanding and use of the API.



# Technologies used

Backend:
> Node.js

> express

> docker
 

# Running application

## Installation with docker

* Run the node service with the command:
  > docker-compose up -d
 
This service will start up a container called talker_manager

* Use the command:
  > docker exec -it talker_manager bash

  It will give you access to the interactive terminal of the container created by compose, which is running in the background
 

* Install the dependencies with (command used inside the docker container):
> npm install

* Run the application with (command used inside the docker container):
  > npm start or npm run dev

## Local installation

* Install the dependencies with (command used inside the docker container):
> npm install

* Run the application with (command used inside the docker container):
  > npm start or npm run dev

  To run the project this way, you must have node installed on your computer
#
