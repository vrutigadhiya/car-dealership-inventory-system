# 🚗 Car Dealership Inventory System

<div align="center">

![MERN](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styled-06B6D4?style=for-the-badge&logo=tailwindcss)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)
![Jest](https://img.shields.io/badge/Tested_with-Jest-C21325?style=for-the-badge&logo=jest)
![Supertest](https://img.shields.io/badge/API-Supertest-success?style=for-the-badge)

**A full-stack MERN application for managing dealership inventory with secure authentication, role-based authorization, vehicle management, inventory tracking, and Test-Driven Development (TDD).**

</div>

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing (bcrypt)
- Role-Based Access
- Persistent Login
- Protected Routes

---

## 🚘 Vehicle Management

### Customer

- View all vehicles
- Search vehicles
- Filter vehicles
- Purchase vehicle
- Live stock updates

### Admin

- Add Vehicle
- Update Vehicle
- Delete Vehicle
- Restock Vehicle
- Search Inventory

---

## 📦 Inventory Control

- Atomic Purchase
- Stock Validation
- Quantity Tracking
- Restock Logic
- Inventory Updates

---

# 🛠 Tech Stack

| Category | Technologies |
|-----------|-------------|
| Frontend | React, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| Styling | Tailwind CSS |
| Testing | Jest, Supertest |
| API | REST API |
| Version Control | Git & GitHub |

---

# 📁 Project Structure

```text
car-dealership-inventory/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── vehicleController.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── adminMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   └── validateObjectId.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Vehicle.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── vehicleRoutes.js
│   │   │
│   │   ├── services/
│   │   │   └── vehicleService.js
│   │   │
│   │   ├── utils/
│   │   │   ├── generateToken.js
│   │   │   ├── buildVehicleFilter.js
│   │   │   ├── checkVehicleStock.js
│   │   │   └── updateVehicleQuantity.js
│   │   │
│   │   ├── tests/
│   │   │   ├── auth.test.js
│   │   │   ├── authMiddleware.test.js
│   │   │   └── vehicle.test.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── VehicleCard.jsx
│   │   ├── VehicleForm.jsx
│   │   ├── SearchBar.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── UserDashboard.jsx
│   │   └── AdminDashboard.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   └── vehicleService.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── README.md
└── PROMPTS.md
```

---

# 🏗 Architecture

```text
React Frontend
       │
       │ Axios + JWT
       ▼
Express REST API
       │
Controllers
       │
Services
       │
Mongoose
       │
MongoDB
```

---

# 🔐 Authentication Flow

```text
Register
    │
    ▼
Hash Password
    │
    ▼
Store User
    │
    ▼
Login
    │
    ▼
Generate JWT
    │
    ▼
Frontend Stores Token
    │
    ▼
Axios Interceptor
    │
    ▼
Protected API Calls
```

---

# 🚀 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login |

---

## Vehicles

| Method | Endpoint | Access |
|---------|----------|--------|
| GET | /api/vehicles | Customer/Admin |
| GET | /api/vehicles/search | Customer/Admin |
| POST | /api/vehicles | Admin |
| PUT | /api/vehicles/:id | Admin |
| DELETE | /api/vehicles/:id | Admin |

---

## Inventory

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/vehicles/:id/purchase | Purchase Vehicle |
| POST | /api/vehicles/:id/restock | Restock Vehicle |

---

# ⚙ Environment Variables

Backend `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key
```

Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 💻 Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🧪 Test Driven Development

## Run Tests

```bash
npm test
```

---

## Coverage

```bash
npm test -- --coverage
```

---

## Current Status

✅ 13 Tests Passing

✅ Authentication Tests

✅ Middleware Tests

✅ Vehicle CRUD Tests

✅ Purchase Tests

✅ Restock Tests

---

# 🔄 TDD Workflow

```text
🔴 RED
↓

Write failing tests

↓

🟢 GREEN

Implement minimum code

↓

🔵 REFACTOR

Clean duplicated logic

↓

Repeat
```

---

# 🔒 Role-Based Access

| Feature | Customer | Admin |
|----------|----------|--------|
| View Vehicles | ✅ | ✅ |
| Search Vehicles | ✅ | ✅ |
| Purchase | ✅ | ✅ |
| Add Vehicle | ❌ | ✅ |
| Edit Vehicle | ❌ | ✅ |
| Delete Vehicle | ❌ | ✅ |
| Restock Vehicle | ❌ | ✅ |

---

# 📸 Screenshots

> Add your screenshots here.

```
Login

Dashboard

Admin Dashboard

Vehicle Search

Vehicle Management
```

---

# 🚀 Future Improvements

- Image Uploads
- Pagination
- Wishlist
- Vehicle Booking
- Payment Integration
- Email Notifications
- Sales Analytics
- Dashboard Charts
- Dark Mode

---

# 🤖 My AI Usage

This project was developed following a Test-Driven Development (TDD) workflow with AI assistance.

### AI-assisted activities

- Generated failing test cases before implementation.
- Followed the Red → Green → Refactor cycle.
- Helped design REST API endpoints.
- Assisted with React architecture and reusable components.
- Refactored duplicated inventory logic.
- Suggested improvements for authentication and authorization.
- Generated technical documentation.
- Helped write meaningful Git commit messages.

### Development Process

```text
Write Tests
      ↓
Fail Tests
      ↓
Implement Feature
      ↓
Pass Tests
      ↓
Refactor Code
      ↓
Commit Changes
```

---

# 📊 Project Highlights

- MERN Stack
- REST API
- JWT Authentication
- Role-Based Authorization
- Vehicle Inventory Management
- Atomic Purchase Logic
- Inventory Restocking
- Search & Filtering
- Responsive UI
- Tailwind CSS
- Axios API Layer
- Protected Routes
- Jest Testing
- Supertest API Testing
- Test-Driven Development
- Clean Folder Structure
- Service Layer Architecture

---

<div align="center">

Made with ❤️ using **MERN Stack + Tailwind CSS + Jest + Supertest**

</div>
