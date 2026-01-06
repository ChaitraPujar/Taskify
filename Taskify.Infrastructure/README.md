# Taskify.Infrastructure

This project contains the **implementation layer** of Taskify.

## Purpose
- Handles data access and business logic
- Implements service interfaces defined in `Taskify.Core`
- Contains repository and authentication logic
- Prepares the solution for Entity Framework Core integration

## Design Principles
- Clean separation from Core domain
- Only depends on Core; no API dependencies
- Ready for EF Core, JWT, and other infrastructure concerns
