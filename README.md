# 🏛️ GovPortal Backend

This is the backend of **GovPortal**, a government service management system built with **Node.js**, **Express**, and **PostgreSQL**.  
It provides RESTful APIs for managing departments, services, users, requests, payments, and authentication with role-based access control.

---

## 🚀 Features

- User authentication (JWT-based)
- Role-based permissions (Admin, Department Head, Officer, Citizen)
- CRUD operations for departments, services, and users
- Dynamic form schema for services
- Request and payment tracking
- PostgreSQL database integration
- Secure password hashing (bcrypt)
- Environment configuration support
- Ready for deployment on **Render**

---

## 🧠 Project Structure
govportal-backend/
├── controllers/ # Business logic for each route
├── middleware/ # Authentication, authorization, error handling
├── models/ # Database queries using pg
├── routes/ # Express routes (users, services, etc.)
├── utils/ # Helper utilities
├── db.js # PostgreSQL connection pool
├── server.js # Main entry point
├── .env.example # Example environment variables
└── package.json



