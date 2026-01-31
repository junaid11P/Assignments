# Twenty20 Assessment - Portfolio & Auth Portal

A responsive web application built with Next.js, featuring a secure authentication system and a personalized portfolio for **Juned**.

## Features

- **Secure Authentication**: Register and Login functionality with JWT stored in httpOnly cookies.
- **Protected Routes**: Middleware-based route protection to ensure only authenticated users can access the portfolio.
- **Dynamic Portfolio**: A premium glassmorphism-themed portfolio showcasing skills, experience, and projects.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.
- **Tech Stack**: Next.js 15, React 19, MongoDB, JWT, Lucide React, and Vanilla CSS with modern utility classes.

## Getting Started

### 1. Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB instance)

### 2. Environment Setup
Create a `.env.local` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_string
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Installation
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

[twenty20-assessment](https://twenty20-assessment.vercel.app/)

