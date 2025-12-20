# 🛠 Admin Management API (NestJS)

![NestJS](https://img.shields.io/badge/NestJS-Backend-E0234E?logo=nestjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-success)

> A **NestJS backend API** responsible for handling **admin operations**, **CRUD management**, **role-based access**, and **file uploads** for my portfolio ecosystem.

---

## 📌 Overview

This project is a **RESTful API built with NestJS** that provides administrative capabilities for managing portfolio-related data.

It is primarily consumed by:
- An **Express.js SSR application** (portfolio website & admin panel)
- Other frontend or service consumers (if needed)

This API handles:
- Authentication & authorization
- Admin-only CRUD operations
- File uploads and asset management

---

## ✨ Features

- 🔐 Admin authentication & authorization
- 🧑‍💼 Admin & role management
- 📄 Full CRUD operations
- 📂 File upload support
- 🧩 Modular NestJS architecture
- 📘 Swagger API documentation

---

## 📦 Managed Resources

This API provides CRUD operations for:

- Experiences
- Skills
- Titles
- Educations
- Projects
- Admins
- Roles
- Uploaded files (images, documents, etc.)

---

## 🧠 Architecture

```
Client (Admin Panel / SSR App)
        │
        ▼
Admin Management API (NestJS)
        │
        ▼
Database & File Storage
```

## 🧩 Tech Stack

| Layer | Technology   |
| ----- | ----------   |
| Backend | NestJs     |
| Language| TypeScript |
| Database| PostgreSQL |
| ORM     | Prisma     |
| Auth    | JWT        |
| File Uploads | Multer|

## 📁 Project Structure

```
src/
├── admin/            # Admin module (CRUD operations for admins and roles)
├── auth/             # Authentication and authorization logic
├── generated/        # Automatically generated files (e.g., Prisma client)
├── middlewares/      # Express or NestJS middlewares
├── portfolio/        # Modules for portfolio-related entities (experiences, skills, projects, educations, titles)
├── upload/           # File upload handling (images, documents, etc.)
├── app.controller.spec.ts   # Unit tests for main app controller
├── app.controller.ts        # Main app controller
├── app.module.ts            # Root module, imports all other modules
├── app.service.ts           # Main application service
├── main.ts                  # Entry point for the application
├── prisma.service.ts        # Prisma service for database access
```

## 🔐 Authentication & Authorization

* JWT-based authentication

* Role-based access control (RBAC)

* Protected admin-only routes


## 📂 File Uploads

* Supports uploading images and files

*Used for:

*Profile images

* Project images

* Other portfolio assets

* Powered by Multer

Uploaded files can be stored:

* Locally

* Or via cloud storage (if configured)

## ⚙️ Environment Variables

Create a .env file in the project root:

```
DATABASE_URL=your_postgres_database_url
JWT_SECRET=your_jwt_secret
```

## ▶️ Installation & Running
Development

```
npm install
npm run start:dev
```

Production 
``
npm run build
npm run start:prod
``

## 📖 API Documentation

Swagger UI is available at:
```
http://localhost:3010/api
```

## 👤 Author

Turgut Salgın

* 🐙 GitHub: https://github.com/turgut5534

* 🌐 Portfolio: https://turgutsalgin.com


