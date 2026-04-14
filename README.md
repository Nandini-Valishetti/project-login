# project-login
#  Full Login System with MFA (TypeScript + PostgreSQL + Docker + CI/CD)

##  Project Overview

This project is a secure login system built using **TypeScript, Node.js, Express, PostgreSQL, and Multi-Factor Authentication (MFA)**.  
It also includes **Docker for database setup**, and a **CI/CD pipeline using GitHub Actions**.

---

# 🔐 MFA Login System (Node.js + PostgreSQL + Email OTP)

A secure Multi-Factor Authentication (MFA) system built using **Node.js, TypeScript, PostgreSQL, and Email OTP verification**.

---

## 🚀 Features

- User Registration
- Secure Login with bcrypt password hashing
- Email-based OTP verification (2FA)
- PostgreSQL database (Dockerized)
- REST API backend (Express.js)
- Simple frontend (HTML + JavaScript)

---

## 🧱 Tech Stack

- Backend: Node.js, Express.js, TypeScript
- Database: PostgreSQL (Docker)
- Authentication: bcrypt + OTP verification
- Email Service: Nodemailer (Gmail SMTP)
- Frontend: HTML, JavaScript

---

## 📁 Project Structure
backend/
├── src/
│ ├── index.ts # Main server
│ ├── db.ts # PostgreSQL connection
│ ├── mail.ts # Email OTP service
frontend/
├── index.html # Simple UI
docker-compose.yml # PostgreSQL setup

# Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Docker
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