### Running:
    npm run bootstrap
    npm start

 API:
----------------

### USER

----------------
#### Get all users:
    GET http://localhost:8080/v1/users

#### Get user by id:
    GET http://localhost:8080/v1/users/:id

#### Create user:
    POST http://localhost:8080/v1/users
    {
      "first_name": "Foo",
      "last_name": "Bar"
    }

#### Update user:
    PUT http://localhost:8080/v1/users/:id

#### Delete user:
    PUT http://localhost:8080/v1/users/:id
    
    
----------------
### TASKS

----------------
#### Get all tasks:
    GET http://localhost:8080/v1/tasks

#### Get task by id:
    GET http://localhost:8080/v1/tasks/:id
    GET http://localhost:8080/v1/tasks/:id?sort=-id&filter[status]=done
    
#### Create task:
    POST http://localhost:8080/v1/tasks
    { 
        title: "some title",
        "description": "some task",
        "user_id": 1,
        "status": "View" | "In Progress" | "Done"
    }

#### Update task:
    PUT http://localhost:8080/v1/task/:id
    {
        "user_id": 5,
        "status": "Done"
    }

#### Delete task:
    DELETE http://localhost:8080/v1/tasks/:id
