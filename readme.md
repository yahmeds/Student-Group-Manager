# Super Cool Project! - Installation Guide and API

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB
- NPM

### Installation and Launch

1. In the `/Projet2` directory:
   ```bash
   npm install  
   mongod --dbpath db  # "db" is the name of the folder where the database is stored. You must create your own folder and name it as you like.
    ```
2. In the /Projet2/client directory:
    ```bash
    npm run watch
    ```
3. In the /Projet2/server directory:
    ```bash
    npm install mongoose
    nodemon
    ```

### Ports : 
- The server runs on port 3000: http://localhost:3000
- The database runs on port 27017: mongodb://localhost:27017

### REST API : 
1. Student Endpoints: 
- POST /api/students – Creates a new student in the database
- GET /api/students – Retrieves all students from the database
- DELETE /api/students – Deletes all students from the database
- DELETE /api/students/:id – Deletes a specific student by ID
- PUT /api/students/:id – Updates a student's information by ID

2. Group Endpoints:
- POST /api/groups/init – Creates 6 predefined groups
- GET /api/groups – Retrieves all groups with their associated students
- POST /api/groups/assign – Assigns a student to a group
- GET /api/groups/:number/students – Retrieves students of a specific group
    
###  Features : 
- Student creation
- Predefined group initialization
- Student naming rules enforced (capitalization, commas, etc.)
- Student modification directly via their row, instead of using the creation form
- Student deletion
- Message box replaced with notifications showing completed actions
- Prevents creation of a student with an existing ID
- Prevents submission of empty fields during student creation or update
- Assign students to groups
- Remove students from groups
- Move a student directly from one group to another (e.g., from group 1 to group 3) without having to go through "ungrouped" state


