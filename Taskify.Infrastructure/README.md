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

## EF Core Setup
- EF Core packages installed (Microsoft.EntityFrameworkCore, SQL Server, Tools)
- TaskifyDbContext added and registered in API
- LocalDB connection string configured in Taskify.API/appsettings.json
- Initial migration created: `InitialCreate`
- Database created in LocalDB with tables: Users, Tasks