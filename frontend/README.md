# 🎓 College Portal - Complete Management System

A production-ready, full-stack college management system built with **Next.js 14**, **MongoDB**, **NextAuth.js**, and **TypeScript**. Features student portal, faculty dashboard, attendance tracking, results management, and more.

![College Portal](https://img.shields.io/badge/Next.js-14-black) ![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

---

## ✨ Features

### 🎯 Core Modules
- **🔐 Authentication**: Role-based access (Admin, Faculty, Student)
- **👥 Student Management**: Profiles, Enrollment, Academic records
- **👨‍🏫 Faculty Management**: Profiles, Dept assignments
- **📚 Course Management**: Courses, Subjects, Credits
- **🏢 Department Management**: HOD assignments
- **📊 Attendance System**: Tracking & Reports
- **📝 Examination System**: Scheduling & Results

### 🚀 Key Features
- ✅ **Fully Functional API**
- ✅ **Beautiful UI** with Animations
- ✅ **Real-time Updates**
- ✅ **Secure** (BCrypt, JWT)
- ✅ **Type-Safe** (TypeScript)

---

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
Ensure `.env.local` has your `MONGODB_URI`.

### 3. Seed Database
Populate the database with demo data:
```bash
npm run db:seed
```
*Creates 1 Admin, 1 Faculty, 11 Students, Departments, Courses, and Subjects.*

### 4. Run Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

---

## 🔑 Demo Credentials

### Admin Access
- **Email**: `admin@college.edu`
- **Password**: `password123`

### Faculty Access
- **Email**: `faculty@college.edu`
- **Password**: `password123`

### Student Access
- **Email**: `student@college.edu`
- **Password**: `password123`

---

## 📁 Project Structure

```
college-portal/
├── app/                  # Next.js App Router (Auth, Admin, Student, Faculty)
├── components/           # UI Components (Forms, Tables, Layouts)
├── lib/
│   ├── db/               # Database Models & Connection
│   ├── validators/       # Zod Schemas
│   └── utils/            # Helper functions
├── scripts/              # Setup scripts (seed.js)
└── public/               # Static assets
```

## 🔌 API Endpoints

- **Auth**: `/api/auth/[...nextauth]`
- **Students**: `/api/v1/students`
- **Faculty**: `/api/v1/faculty`
- **Departments**: `/api/v1/departments`
- **Courses**: `/api/v1/courses`
- **Subjects**: `/api/v1/subjects`

---

## 🛠️ Tech Stack
- **Framework**: Next.js 14
- **Database**: MongoDB
- **Auth**: NextAuth.js
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Forms**: React Hook Form

---
**Made with ❤️ using Next.js and MongoDB**
