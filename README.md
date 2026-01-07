# Taskify

Taskify is a simple task management application built as a technical assignment. It allows users to securely create, view, update, delete, and filter tasks while enforcing strict user-based data isolation.
The project focuses on clean architecture, security, and correctness, with a functional UI.

# Features

User registration and login using JWT authentication
Secure task management (CRUD)
Task ownership enforced per authenticated user
Filtering tasks by: Status (Pending / Completed) and Priority (Low / Medium / High)
Clean separation of concerns (Controller -> Service -> Data)
Centralized timestamp handling (CreatedAt, UpdatedAt)
Fully tested using Postman

## Tech Stack
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- SQL Server LocalDB
- JWT Authentication
- Angular (frontend)

## Tools
- Visual Studio 2022
- Postman (API testing)
- Git / GitHub

## Architecture
The solution follows a layered architecture:

- **Taskify.API** – HTTP API layer
- **Taskify.Core** – Domain models and contracts
- **Taskify.Infrastructure** – Data access and service implementations

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

### Running the Application Locally

Prerequisites

- Visual Studio 2022
- .NET 8 SDK

Steps

- Clone the repository
- Open the solution in Visual Studio
- Restore NuGet packages
- Run database migrations: Update-Database
- Run the API project
- Use Postman to test endpoints

The application uses SQL Server LocalDB, no additional database setup required.

## Author
Chaitra Chikodikar
