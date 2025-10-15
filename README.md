# User Database API
A simple Node.js and MongoDB app for managing users.

## Description
The app connects to a MongoDB database and stores user information such as:
- First name  
- Last name  
- Email  

You can view the database through **Mongo Express** at:  
👉 `http://localhost:8081`


## How to Run

Start the application with Docker Compose:
docker-compose up -d


## Run the server
Start the Node.js server:
node index.js

The API server will run at:
👉 http://localhost:3000


# API Endpoints
Method	Endpoint	Description
GET	/users	Get all users
POST	/users	Create a new user
PUT	/users/:id	Update a user by ID
DELETE	/users/:id	Delete a user by ID
