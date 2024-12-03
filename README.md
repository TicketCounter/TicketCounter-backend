const readme = `

# TicketCounter Backend

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Main Packages](#main-packages)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Routes](#routes)
  - [Auth Routes](#auth-routes)
  - [Event Routes](#event-routes)
- [Seeders](#seeders)
- [Testing](#testing)

## Introduction

TicketCounter Backend is a NestJS-based application that provides APIs for user authentication and event management. It includes features such as user registration, login, event creation, participant management, and more.

## Project Structure

```
.env
.eslintrc.js
.gitignore
.prettierrc
jest.config.js
nest-cli.json
nodemon.json
package.json
README.md
src/
  app.controller.spec.ts
  app.controller.ts
  app.module.ts
  app.service.ts
  auth/
    auth.controller.spec.ts
    auth.controller.ts
    auth.module.ts
    auth.schema.ts
    auth.service.spec.ts
    auth.service.ts
    DTOs/
  common/
    guards/
    middlewares/
  events/
    DTOs/
    events.controller.spec.ts
    events.controller.ts
    events.module.ts
    events.schema.ts
    events.service.spec.ts
    events.service.ts
    validators/
  main.ts
  seeders/
test/
  app.e2e-spec.ts
  jest-e2e.json
tsconfig.build.json
tsconfig.json
```

## Main Packages

- `@nestjs/common`: Common utilities and decorators for NestJS.
- `@nestjs/config`: Configuration module for NestJS.
- `@nestjs/core`: Core utilities for NestJS.
- `@nestjs/jwt`: JWT utilities for NestJS.
- `@nestjs/mongoose`: Mongoose integration for NestJS.
- `@nestjs/passport`: Passport integration for NestJS.
- `bcryptjs`: Library for hashing passwords.
- `class-transformer`: Library for transforming plain objects into class instances.
- `class-validator`: Library for validating class properties.
- `mongoose`: MongoDB object modeling tool.
- `passport`: Authentication middleware for Node.js.
- `passport-jwt`: Passport strategy for authenticating with a JSON Web Token.
- `ts-jest`: Jest transformer for TypeScript.

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/TicketCounter/TicketCounter-backend.git
   cd TicketCounter-backend
   ```

2. **Install dependencies:**

   ```sh
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following variables:

   ```env
   MONGO_URI=mongodb://localhost:27017/ticketcounter
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:3000
   PORT=5000
   ```

4. **Run the application:**
   ```sh
   npm run dev
   ```

## Environment Variables

- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for signing JWT tokens.
- `FRONTEND_URL`: URL of the frontend application.
- `PORT`: Port on which the application will run.

## Routes

### Auth Routes

- **POST /auth/register**

  - Description: Register a new user.
  - Body:
    ```json
    {
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com",
      "phone": "1234567890",
      "password": "password"
    }
    ```

- **POST /auth/login**
  - Description: Login a user.
  - Body:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password"
    }
    ```

### Event Routes

- **POST /events/create**

  - Description: Create a new event.
  - Body:
    ```json
    {
      "title": "Test Event",
      "description": "Test Description",
      "date": "2024-12-01T15:37:47.865Z"
    }
    ```

- **DELETE /events/delete**

  - Description: Delete an event.
  - Body:
    ```json
    {
      "id": "eventId"
    }
    ```

- **PUT /events/update**

  - Description: Update an event.
  - Body:
    ```json
    {
      "eventId": "eventId",
      "values": {
        "title": "Updated Event",
        "description": "Updated Description",
        "date": "2024-12-01T15:37:47.865Z"
      }
    }
    ```

- **POST /events/addParticipant**

  - Description: Add a participant to an event.
  - Body:
    ```json
    {
      "id": "eventId",
      "participant": {
        "name": "John Doe",
        "phone": "1234567890"
      }
    }
    ```

- **POST /events/removeParticipant**

  - Description: Remove a participant from an event.
  - Body:
    ```json
    {
      "id": "eventId",
      "participantId": "participantId"
    }
    ```

- **GET /events**

  - Description: Get all events.

- **GET /events/stats**
  - Description: Get event statistics.

## Seeders

Seeders are used to populate the database with dummy data for testing purposes.

### Event Seeder

- **Run the event seeder:**
  ```sh
  npm run seed:events
  ```

### User Seeder

- **Run the user seeder:**
  ```sh
  npm run seed:users
  ```

## Testing

- **Run unit tests:**

  ```sh
  npm test
  ```

- **Run end-to-end tests:**
  ```sh
  npm run test:e2e
  ```
  `;
