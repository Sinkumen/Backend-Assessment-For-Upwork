# To-Do App (Express.js + PostgreSQL + Sequelize)

A simple To-Do API using **Express.js**, **PostgreSQL**, and **Sequelize ORM**.

## Features
- **User Authentication** (JWT)  
- **CRUD To-Dos**  
- **Filtering** (All, Completed, Uncompleted)  
- **Sorting**  
  - **Uncompleted** → Newest first  
  - **Completed** → Oldest first  

## Setup

1. **Install dependencies**  
   ```sh
   npm install
   ```

2. **Run migrations**  
   ```sh
   npx sequelize-cli db:migrate
   ```

3. **Start the server**  
   ```sh
   npm run dev
   ```

## Usage
Use Postman or any API client to interact with the endpoints.
