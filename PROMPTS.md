# AI Engineering Prompt Log & TDD History

> **Project Name:** Ironclad Motors — Car Dealership Inventory Management System  
> **Developer:** Vruti Gadhiya  
> **Repository:** https://github.com/vrutigadhiya/car-dealership-inventory-system  
> **Live Demo:** https://car-dealership-inventory-system-plum.vercel.app/  
> **Backend API:** https://car-dealership-inventory-system-xz8y.onrender.com  
> **Primary AI Assistants:** Claude (Anthropic) & ChatGPT (OpenAI)  
> **Methodology:** Test-Driven Development (TDD) — Red-Green-Refactor Cycle  
> **Session Archives:**  
> - **ChatGPT Conversation History:** https://chatgpt.com/c/6a5f2e9e-3900-83e8-804f-06560c262be5
> - **Claude Conversation History:** https://claude.ai/chat/f361a7d3-ea25-4af2-8036-e8c17f342ad7?onboarding=1

## 📋 Overview & AI Collaboration Methodology

This log documents the chronological sequence of prompts, architectural decisions, and TDD iterations used during the engineering of **Ironclad Motors**.

### The Red-Green-Refactor Workflow

1. 🔴 **RED Phase:** Generated failing Jest and Supertest integration tests for all REST endpoints *before* writing controller or service logic. Edge cases included out-of-stock purchases, unauthorized admin access, duplicate emails, and malformed ObjectIDs.
2. 🟢 **GREEN Phase:** Implemented minimal Express routes, controllers, and services to turn all failing tests green.
3. 🔵 **REFACTOR Phase:** Refactored business logic into a decoupled **Controller-Service Architecture**, implemented Mongoose queries with `.lean()`, handled race conditions atomically using Mongoose `$inc`, and established global error middleware.
4. 🤝 **Git Co-Authorship:** Commits produced during pair-programming sessions are credited using standard Git trailers (`Co-authored-by: Claude <noreply@anthropic.com>` / `Co-authored-by: ChatGPT <chatgpt@openai.com>`).

---

# 🏗️ Session 1: Architecture, Directory Structure & Schemas

## Prompt 1.1: System Architecture & Mongoose Data Models

**User Prompt**

> I am building a full-stack MERN Car Dealership Inventory System named "Ironclad Motors" following strict TDD.
>
> Please design:
>
> 1. A clean, modular folder hierarchy separating `/backend` (`config`, `controllers`, `services`, `middleware`, `models`, `routes`, `tests`, `uploads`) and `/frontend` (`components`, `pages`, `context`, `services`, `utils`).
> 2. Mongoose schemas for:
>    - `User`: `name`, `email` (unique), `password` (hashed with bcrypt), `role` (`customer` or `admin`)
>    - `Vehicle`: `make`, `model`, `category` (SUV, Sedan, Hatchback, EV), `price`, `quantity`, `vin`, `imageUrl`, `description`
>    - `Booking`: `user`, `vehicle`, `purchasePrice`, `bookingDate`, `status`
> 3. Compound index on `Vehicle` for `{ make: 1, category: 1, price: 1 }`.

### AI Response Summary

- Provided clean Controller-Service architecture.
- Generated User, Vehicle and Booking models.
- Added proper indexing and pre-save hooks.

---

# 🔒 Session 2: Authentication & Authorization (TDD)

## Step 2.1 — 🔴 RED Phase — Registration Integration Tests

### User Prompt

> Write ONLY the Jest/Supertest integration test file `tests/auth.register.test.js` for `POST /api/auth/register`.
>
> Cover:
>
> - 201 Created
> - Duplicate email
> - Missing required fields
>
> Do not generate controller code.

### Test Run Result 

```text
FAIL ❌ (Expected - No route exists)
```

---

## **Step 2.2 — 🟢 GREEN Phase — Registration Controller & Service**

### **User Prompt**

> Now write the Express controller and service logic for `POST /api/auth/register` to pass all tests.

### **Test Run Result**

```
PASS ✅
```


---

## Step 2.3 — 🔴 RED Phase — Login & JWT Authentication Tests

### User Prompt

> Write the test suite `tests/auth.login.test.js` for `POST /api/auth/login`.
>
> Assert:
>
> - 200 OK
> - 401 Invalid password
> - 401 Email not found
> - 400 Missing fields

### Test Run Result

```
FAIL ❌ (Expected)
```

---

## Step 2.4 — 🟢 GREEN Phase — Login Logic & Auth Middleware

### User Prompt

> Implement login logic using bcrypt.compare, sign a JWT containing id and role, and implement authMiddleware.js.

### Test Run Result

```
PASS ✅
```

---

# 🚗 Session 3: Vehicle Inventory & Seed Data

## Step 3.1 — 🔴 RED Phase — Vehicle Catalog Tests

### User Prompt

> Write integration tests in `tests/vehicle.test.js` to seed the database with mock vehicles and test `GET /api/vehicles`.

### Test Run Result

```
FAIL ❌ (Expected)
```

---

## Step 3.2 — 🟢 GREEN Phase & 🔵 REFACTOR

### User Prompt

> Implement `GET /api/vehicles`, create `seed.js`, and refactor queries to use `.lean()`.

### Test Run Result

```
PASS ✅
```

---

# 🔍 Session 4: Multi-Parameter Search & Filtering

## Step 4.1 — 🔴 RED Phase

### User Prompt

> Write integration tests in `tests/vehicle.search.test.js` for `GET /api/vehicles/search`.
>
> Test:
>
> - Search by make
> - Search by category
> - Search by price
> - Combined filters
> - Empty result

### Test Run Result

```
FAIL ❌ (Expected)
```

---

## Step 4.2 — 🟢 GREEN Phase

### User Prompt

> Implement `searchVehicles` using `$regex`, `$gte`, and `$lte`.

### Test Run Result

```
PASS ✅
```

---

# 🛒 Session 5: Purchase Workflow & Concurrency Control

## Step 5.1 — 🔴 RED Phase

### User Prompt

> Write booking integration tests covering:
>
> - Purchase vehicle
> - Out of stock
> - My bookings
> - Admin-only bookings endpoint

### Test Run Result

```
FAIL ❌ (Expected)
```

---

## Step 5.2 — ⚠️ BUG FIX & 🟢 GREEN Phase

### User Prompt

> Refactor the purchase controller to use an atomic `findOneAndUpdate` with `$inc` to eliminate race conditions.

### Test Run Result

```
PASS ✅
```
---

# 🎨 Session 6: React Frontend, Mobile UI & Axios Integration

## Prompt 6.1 — Axios HTTP Client & Interceptors

### User Prompt

> Create `src/services/api.js` using Axios.
>
> Requirements:
>
> - Read `VITE_API_BASE_URL`
> - Automatically attach JWT token
> - Redirect to `/login` on 401

---

## Prompt 6.2 — Responsive Vehicle Inventory Dashboard & Admin CRUD

### User Prompt

> Build a responsive React 18 UI styled with Tailwind CSS.
>
> Include:
>
> - Responsive Navbar
> - Customer/Admin dashboards
> - Search filters
> - Vehicle grid
> - Purchase flow
> - Admin CRUD
> - Restock modal
> - Multer image upload
> - Booking management

---

# 🎨 Session 7: Frontend UI/UX Enhancements

## Prompt 7.1: Responsive Navigation

**User Prompt**

> "Make the navigation fully responsive. Replace the mobile hamburger menu with a compact user avatar showing initials (e.g., 'Vruti Gadhiya' → 'VG'). Add active route highlighting and keep desktop navigation unchanged."

### AI Contribution

- Responsive navigation bar
- Initials-based profile avatar
- Active page highlighting
- Mobile-friendly spacing
- Improved accessibility

---

## Prompt 7.2: Dashboard Responsiveness

**User Prompt**

> "Make Admin Dashboard, User Dashboard, My Bookings, Admin Bookings, Footer, and all cards responsive for mobile devices."

### AI Contribution

Implemented:

- Responsive grid layouts
- Mobile booking cards
- Scrollable tables
- Flexible spacing
- Better typography scaling
- Responsive footer
- Optimized mobile experience

---

## Prompt 7.3: Loading Experience

**User Prompt**

> "Create a branded animated car loader and integrate it into every page while data is loading."

### AI Contribution

Added:

- Animated car loader
- Loading states
- Consistent loading UI
- Reusable `CarLoader` component

---

# 🔐 Session 8: Authentication UI Improvements

## Prompt 8.1: Password Visibility

**User Prompt**

> "Add an eye icon to Login and Register pages to toggle password visibility."

### AI Contribution

Implemented:

- Show/Hide password
- Eye / Eye-Off toggle
- Password visibility animation
- Better UX

---

## Prompt 8.2: Purchase Form Autofill

**User Prompt**

> "When a logged-in user books a vehicle, automatically pre-fill their name and email."

### AI Contribution

Implemented:

- Auto-filled user name
- Auto-filled email
- Editable fields
- Reduced typing

---


# 📄 Session 9: Documentation

## Prompt 9.1: Professional README

**User Prompt**

> "Create a professional GitHub README with badges, live demo, screenshots, API documentation, setup guide, dependencies, mobile responsiveness, and AI usage."

### AI Contribution

Produced:

- Professional README
- Technology badges
- Live Demo section
- Backend API link
- Mobile Responsive section
- Features overview
- Installation guide
- API documentation
- Testing instructions
- AI methodology
- Attractive formatting

---

# ⚡ Website Performance Optimization & Testing

## 🚀 Google PageSpeed Insights Testing

The deployed **Ironclad Motors - Car Dealership Inventory Management System** was tested using **Google PageSpeed Insights** to evaluate website speed, performance, accessibility, SEO, and best practices.

Performance testing tool:

🔗 https://pagespeed.web.dev/


---

## 📊 Performance Score

🚀 **Performance Score: 95%**

# 📱 Mobile Responsiveness

During development, AI assistance was used to improve responsiveness across the application.

Optimizations include:

- Responsive Navbar
- Responsive Footer
- Responsive Dashboard
- Responsive Vehicle Cards
- Responsive Booking Cards
- Responsive Admin Tables
- Mobile-friendly Forms
- Flexible Grid Layouts
- Better Typography Scaling
- Improved Touch Targets
- Optimized Spacing

---

# 🤖 AI Usage Summary

| Area | AI Assistance |
|-------|---------------|
| Architecture | ✅ |
| Folder Structure | ✅ |
| MongoDB Models | ✅ |
| Express Controllers | ✅ |
| Services | ✅ |
| Authentication | ✅ |
| Authorization | ✅ |
| JWT | ✅ |
| CRUD Operations | ✅ |
| Search & Filtering | ✅ |
| Booking System | ✅ |
| Inventory Restocking | ✅ |
| Race Condition Fix | ✅ |
| React Components | ✅ |
| Responsive Design | ✅ |
| Mobile UI | ✅ |
| Navbar | ✅ |
| Footer | ✅ |
| Forms | ✅ |
| Email Confirmation | ✅ |
| Axios | ✅ |
| Testing | ✅ |
| Jest | ✅ |
| Supertest | ✅ |
| Debugging | ✅ |
| Documentation | ✅ |

---

# 🏁 Final Reflection

This project was developed following a strict **Test-Driven Development (TDD)** workflow while using AI as a pair-programming assistant.

AI accelerated repetitive implementation tasks such as generating tests, scaffolding components, debugging runtime errors, improving responsive layouts, and producing technical documentation.

All architectural decisions, feature prioritization, validation, testing, deployment, and final code review remained the developer's responsibility.

The final application includes:

- Secure JWT Authentication
- Role-Based Access Control
- Vehicle Inventory Management
- Customer Booking Workflow
- Booking History
- Admin Dashboard
- Inventory Restocking
- Image Uploads
- Fully Responsive UI
- TDD-based Backend
- Production Deployment on Render & Vercel
- Comprehensive Documentation

---
