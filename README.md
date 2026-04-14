# project-login
#  Full Login System with MFA (TypeScript + PostgreSQL + Docker + CI/CD)

##  Project Overview

This project is a secure login system built using **TypeScript, Node.js, Express, PostgreSQL, and Multi-Factor Authentication (MFA)**.  
It also includes **Docker for database setup**, **Postman for API testing**, and a **CI/CD pipeline using GitHub Actions**.

---

#  Step-by-Step Implementation

##  Step 1: Project Setup
- Created a full-stack project structure
- Backend using Node.js + TypeScript + Express
- Frontend using simple HTML + JavaScript
- Database using PostgreSQL (Docker)

---

##  Step 2: Database Setup (Docker)
- Used Docker to run PostgreSQL database
- Created database: `mfa_db`
- Stored user details like:
  - username
  - password
  - MFA secret (OTP key)

---

## Step 3: Backend Development
- Built REST APIs using Express
- Connected PostgreSQL using `pg` library
- Implemented TypeScript for type safety

### APIs created:
- `/register` → create user
- `/login` → validate user & generate OTP
- `/verify-otp` → verify MFA OTP

---

## Step 4: Multi-Factor Authentication (MFA)
- Used `speakeasy` library for OTP generation
- OTP is time-based and changes every 30 seconds
- Adds extra security layer after login

---

##  Step 5: API Testing using Postman
- Used Postman to test all APIs
- Tested:
  - User registration
  - Login authentication
  - OTP verification

---

##  Step 6: Frontend Integration
- Created simple HTML frontend
- Connected frontend to backend APIs using `fetch()`
- User can:
  - Login
  - Enter OTP
  - Verify authentication

---

##  Step 7: Full Project Flow
Register → Login → OTP Generation → OTP Verification → Successful Login

---

##  Step 8: CI/CD Pipeline (GitHub Actions)
- Added CI/CD pipeline using GitHub Actions
- Automatically runs on every push to main branch
- Steps include:
  - Install dependencies
  - Build TypeScript project
  - Check for errors

---

## Step 9: Version Control (GitHub)
- Project pushed to GitHub repository
- Maintained using Git commands:
  - git init
  - git add .
  - git commit
  - git push

---

# Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Docker
- Speakeasy (MFA)
- Postman
- GitHub Actions (CI/CD)

---

# Features

✔ User Registration  
✔ Secure Login  
✔ Multi-Factor Authentication (OTP)  
✔ PostgreSQL Database (Docker)  
✔ API Testing with Postman  
✔ CI/CD Pipeline  
✔ Frontend Integration  

---

# How to Run Project

## 1. Start Database
```bash
docker-compose up -d

2. Start Backend
cd backend
npx ts-node index.ts

3. Open Frontend
Open index.html in browser