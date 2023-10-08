# Tacnique Task Management Backend

## Description

The Tacnique Task Management Backend is a Node.js-based API server designed to manage tasks and user authentication for a task management application. It provides a robust backend infrastructure for creating, updating, and deleting tasks, as well as user registration and login functionality. The server also includes rate limiting and logging middleware for enhanced security and monitoring.

## Features

- User Registration: Users can create accounts with their name, email, and password.
- User Login: Registered users can securely log in with their credentials and receive an authentication token.
- Task Management: Authenticated users can create, retrieve, update, and delete tasks.
- Task Status: Tasks can be marked as "pending" or "completed."
- Authentication Middleware: JWT-based authentication middleware is used to protect routes and ensure secure access.
- Rate Limiting: Rate limiting middleware is applied to prevent abuse and protect against DDoS attacks.
- Logger Middleware: Logger middleware records server activity and helps in monitoring and debugging.

## Prerequisites

Before you can run the Tacnique Task Management Backend, ensure you have the following prerequisites installed:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- MongoDB: [Install MongoDB](https://docs.mongodb.com/manual/installation/)

## Setup

Follow these steps to set up and run the project on your local machine:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Ashik0101/Tacnique_Assignment.git
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

## Configuration

1. **Create a `.env` file in the project root directory.**

2. **Add the following configurations to the `.env` file:**

   ```plaintext
   PORT=5001

   MONGODB_URI= Your MongoDB URL here

   JWT_SECRET=your-secret-key
   ```

## Start the Server

To start the server, run the following command in your terminal:

```bash
npm run server
```

```plaintext
This will start the server on port 5001 by default. You can access the API at http://localhost:5001/
```

# Usage

## Swagger Documentation :

## Please visit the swagger documentation link in order to test the APIs :

### https://tacniques-task-managment.onrender.com/api-docs/

# Users - API endpoints

![Users Endpoints](https://tacnique-swagger-documentation-screenshot.s3.amazonaws.com/Tacnique_screeenshot.png)
