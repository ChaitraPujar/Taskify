# Taskify.Core

This project contains the **domain layer** of the Taskify application.

## Purpose
- Holds **core business entities**
- Defines **enums, DTOs, and interfaces**
- Contains **no framework-specific code**
- Can be reused across different application layers

## Design Principles
- Framework-agnostic
- Clean separation of concerns
- Entities represent real-world concepts
- No dependency on ASP.NET Core or Entity Framework

## Contents
- `Entities`: Domain entities such as User and TaskItem
- `Enums`: Enumerations for task priority and status
- `Common`: Shared base classes
- `DTOs`: Data transfer objects
- `Interfaces`: Service and repository contracts
