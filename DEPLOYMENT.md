# Deployment Guide

This project consists of two parts:
1.  **Frontend**: Next.js (Deploy on **Vercel**)
2.  **Backend**: Node.js/Express (Deploy on **Render**)

---

## 🚀 1. Push to GitHub
First, ensure your code is pushed to a GitHub repository.

```bash
git add .
git commit -m "Ready for deployment"
# If not already linked:
# git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---

## 🌐 2. Deploy Frontend (Vercel)
The frontend contains your user interface and authentication logic.

1.  Go to [vercel.com/new](https://vercel.com/new).
2.  Import your GitHub repository.
3.  **Project Configuration**:
    *   **Framework Preset**: Next.js
    *   **Root Directory**: `frontend` (You MUST click "Edit" and select the `frontend` folder).
4.  **Environment Variables**:
    *   `NEXT_PUBLIC_APP_URL`: `https://your-vercel-project.vercel.app`
    *   `NEXTAUTH_URL`: `https://your-vercel-project.vercel.app`
    *   `AUTH_SECRET`: `(Generate a random string)`
    *   `MONGODB_URI`: `(Your MongoDB Atlas Connection String)`
5.  Click **Deploy**.

---

## 🛠️ 3. Deploy Backend (Render)
The backend service (if you are using one separately) goes here.

1.  Go to [dashboard.render.com](https://dashboard.render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  **Service Configuration**:
    *   **Name**: `college-website-backend`
    *   **Root Directory**: `backend` (Important!)
    *   **Runtime**: Node
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
5.  **Environment Variables**:
    *   `MONGODB_URI`: `(Your MongoDB Atlas Connection String)`
    *   `PORT`: `10000` (Render default)
6.  Click **Create Web Service**.

---

## 🔗 4. Connect Frontend to Backend
Once both are deployed:

1.  Copy your **Render Backend URL** (e.g., `https://college-backend.onrender.com`).
2.  Go to **Vercel Project Settings** -> **Environment Variables**.
3.  Add/Update `NEXT_PUBLIC_API_URL` with the Render URL.
4.  **Redeploy** the Frontend on Vercel.
