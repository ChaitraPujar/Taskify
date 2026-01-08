# Taskify

Taskify is a simple task management application. It allows users to securely create, view, update, delete, and filter tasks while enforcing strict user-based data isolation.
The project focuses on clean architecture, security, and correctness, with a minimal functional UI.

# API Features

User registration and login using JWT authentication
Secure task management (CRUD)
Task ownership enforced per authenticated user
Filtering tasks by: Status (Pending / Completed) and Priority (Low / Medium / High)
Clean separation of concerns (Controller -> Service -> Data)
Centralized timestamp handling (CreatedAt, UpdatedAt)
API fully tested using Postman

# UI Features

User registration and login
Secure task management (CRUD)
Task filtering by Status and Priority
Inline editing for tasks
Notifications for success/error actions

## Tech Stack
- **Backend:** ASP.NET Core Web API (.NET 8), Entity Framework Core, SQL Server LocalDB, JWT Authentication
- **Frontend:** Angular 21, TypeScript, HTML, CSS

## Tools
- Visual Studio 2022
- Postman (API testing)
- Git / GitHub
- Visual Studio Code

## Backend Architecture
The solution follows a layered architecture:

- **Taskify.API** – HTTP API layer
- **Taskify.Core** – Domain models and contracts
- **Taskify.Infrastructure** – Data access and service implementations

## Frontend Architecture
- **src/app/core** – services, guards, interceptors
- **src/app/features** – feature modules (login, register, tasks) and notification
- **src/app/models** - model for task
- **src/environments** – environment variables for API base URL
- **src/app/app.routes.ts** – routing configuration
- **src/app/app.component.ts** – main component bootstrap
- **src/app/app.config.ts** – HTTP interceptor registration and providers

### API Testing

A Postman collection is provided which covers:

Authentication
Task CRUD
Filtering
Authorization scenarios
Uses collection variables: baseUrl and token

Refer to the Postman collection provided in solution folder for sample requests and responses.

Follow these steps for postman setup:

- Open Postman and import the provided collection Taskify.postman_collection.json from solution
- Set collection variables: baseUrl -> https://localhost:{port} (or your running API URL), token -> leave empty (Postman will populate after login)
- Start testing endpoints

### Running the Backend Locally

Prerequisites:
- Visual Studio 2022
- .NET 8 SDK

Steps:
- Clone the repository
- Open the solution in Visual Studio
- Restore NuGet packages
- Run database migrations: Update-Database
- Run the API project
- Use Postman to test endpoints

The application uses SQL Server LocalDB, no additional database setup required.

### Running Frontend Locally

Prerequisites:
- Node.js 22+
- npm 11+
- Angular CLI 21+

Steps:
- Navigate to frontend folder
- Run `npm install`
- Start the application: `ng serve`
- Open browser at `http://localhost:4200`
- Ensure backend API is running and update `environment.ts` with correct API URL

## Author
Chaitra Chikodikar
