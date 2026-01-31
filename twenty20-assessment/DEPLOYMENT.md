# Deployment Guide: Next.js + MongoDB on Vercel

Follow these steps to deploy your **Twenty20 Assessment** project to Vercel.

## 1. Push Code to GitHub
Ensure all your changes are committed and pushed to a public (or private) GitHub repository.
```bash
git add .
git commit -m "Finalizing portfolio and authentication"
git push origin main
```

## 2. Connect to Vercel
1. Go to [Vercel](https://vercel.com) and log in with your GitHub account.
2. Click the **"Add New..."** button and select **"Project"**.
3. Import your repository from the list.

## 3. Configure Project Settings
- **Framework Preset**: Should automatically detect **Next.js**.
- **Root Directory**: Ensure it points to the root of your project.

## 4. Set Environment Variables (Crucial)
Vercel needs the variables from your `.env.local` to function. In the **Environment Variables** section, add the following:

| Key | Value | Note |
|---|---|---|
| `MONGODB_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `your_secret_key` | A random secure string for tokens |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | Your live deployment URL |

> **Note on MongoDB**: If you are using local MongoDB (`localhost`), you MUST switch to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (the free tier works great) for the live deployment to work.

## 5. Deploy
1. Click **Deploy**.
2. Wait a few minutes for the build to complete.
3. Once finished, you will receive a public URL (e.g., `https://twenty20-assessment.vercel.app`).

## 6. Update MongoDB Whitelist
If you are using MongoDB Atlas:
1. Go to **Network Access** in your MongoDB Atlas dashboard.
2. Add `0.0.0.0/0` to allow access from Vercel's dynamic IP addresses (or use the Vercel-MongoDB integration).

---
**Your deployment is now live!**
