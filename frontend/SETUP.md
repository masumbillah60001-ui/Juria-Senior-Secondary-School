# 🛠️ Setup Guide

Follow these simple steps to get the college portal running on your machine.

## 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or cloud)

## 2. Installation
Open your terminal and run:
```bash
npm install
```

## 3. Configuration
Check the `.env.local` file. It should look like this:
```env
MONGODB_URI=mongodb://localhost:27017/college_db
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=your_secret_key
```

## 4. Seed Database
Populate the database with sample data:
```bash
npm run db:seed
```

## 5. Run Project
Start the development server:
```bash
npm run dev
```

Visit **http://localhost:3000**

## 🛑 Troubleshooting
- **Connection Refused?** Make sure MongoDB service is running.
- **Build Error?** Try deleting `.next` folder and running `npm run dev` again.
