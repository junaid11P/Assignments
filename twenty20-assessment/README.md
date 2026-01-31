# Twenty20 Assessment - Portfolio & Auth Portal

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://twenty20-assessment.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)

A high-performance, responsive web application featuring a secure authentication system and a premium glassmorphic portfolio. Built specifically for the **Twenty20 Assessment**.

## 🌐 Live Application
**Link:** [https://twenty20-assessment.vercel.app/](https://twenty20-assessment.vercel.app/)

---

## 🔑 Instructions for Invigilators

To test the full functionality of the application, please follow these steps:

### 1. Account Registration
*   Open the [Live Link](https://twenty20-assessment.vercel.app/).
*   Toggle to the **"Register"** tab.
*   Provide a name, email, and password. 
*   Click **"Create Account"**. Note: For evaluation purposes, any valid email format will work.

### 2. Secure Login
*   After registration, the system will switch you to the **"Login"** tab.
*   Enter your registered credentials.
*   Click **"Login"** to access the protected portfolio route.

### 3. Exploring the Portfolio
*   Once authenticated, you will be redirected to `/portfolio`.
*   Explore the interactive, glassmorphic UI showcasing skills, experience, and projects.
*   The system uses **JWT (JSON Web Tokens)** stored in `httpOnly` cookies for maximum security.

---

## 🛠️ Core Features

*   **Premium UI/UX**: Modern glassmorphism design with smooth animations and responsive layouts.
*   **Secure Authentication**: Full registration and login flow powered by MongoDB and Bcrypt password hashing.
*   **Route Protection**: Next.js Middleware ensures the `/portfolio` route is only accessible to authenticated users.
*   **State-of-the-Art Tech**: Next.js 15 (App Router), React 19, and Tailwind-inspired Vanilla CSS.

---

## 💻 Local Development

### Prerequisites
*   Node.js 18+ 
*   MongoDB Instance (Atlas or Local)

### Setup
1. **Clone & Install**:
   ```bash
   npm install
   ```
2. **Environment Variables**:
   Create a `.env.local` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_random_string
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
3. **Run**:
   ```bash
   npm run dev
   ```

---

## 🏗️ Project Architecture

*   **Frontend**: Next.js 15 with Server & Client Components.
*   **Backend**: Next.js API Routes (Route Handlers).
*   **Auth**: Custom JWT implementation with `httpOnly` cookie persistence.
*   **Styling**: Modern Vanilla CSS with custom design tokens for a "Clean Tech" aesthetic.

---
Created by **Juned** for the Twenty20 Assessment.


