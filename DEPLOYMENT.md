# Tool Management System Deployment Guide

This project currently uses:
- Frontend: React + Vite (Vercel)
- Backend: FastAPI + SQLAlchemy (Render)
- Database: PostgreSQL (Supabase)

## 1) Supabase PostgreSQL Setup

1. Open your Supabase project: `https://fjmiomrtdgnkwcraovdl.supabase.co`
2. Go to **Project Settings > Database**.
3. Copy the **Connection string** (URI format).
4. Use the connection string in backend env as `DATABASE_URL`.
   - Recommended format:
     - `postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres?sslmode=require`

## 2) Backend Deployment on Render

### Create Service
1. In Render, create a new **Web Service** from this repo.
2. Set:
   - Root Directory: `backend`
   - Runtime: `Python`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. Health Check Path: `/health`

### Critical Path Check (fixes your error)
If you see:

`ERROR: Could not open requirements file: [Errno 2] No such file or directory: 'requirements.txt'`

Render is building from the wrong directory. Use one of these two valid setups:

- Preferred:
  - Root Directory: `backend`
  - Build Command: `pip install -r requirements.txt`
  - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Fallback (if Root Directory is left blank):
  - Build Command: `pip install -r requirements.txt` (root `requirements.txt` proxies to `backend/requirements.txt`)
  - Start Command must still be run from backend context, so set Root Directory to `backend` to avoid import issues.

### Required Backend Environment Variables
Set these in Render:

- `DATABASE_URL` = Supabase Postgres URI
- `JWT_SECRET` = strong random secret (32+ chars)
- `NODE_ENV` = `production`
- `PORT` = `5000` (Render may inject its own port; app uses `$PORT`)
- `ALGORITHM` = `HS256`
- `ACCESS_TOKEN_EXPIRE_MINUTES` = `1440`
- `ALLOWED_ORIGINS` = `http://localhost:5173,https://<your-vercel-domain>`

## 3) Frontend Deployment on Vercel

1. Import this repo into Vercel.
2. Set project root to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable:
   - `VITE_API_URL=https://<your-render-service>.onrender.com`
6. Deploy.

## 4) CORS Configuration

Backend CORS is environment-driven using `ALLOWED_ORIGINS`.
Use comma-separated URLs:

- Development example:
  - `http://localhost:5173,http://localhost:3000`
- Production example:
  - `http://localhost:5173,https://<your-vercel-domain>`

## 5) Local Environment Files

### backend/.env
Expected keys:

- `DATABASE_URL=`
- `JWT_SECRET=`
- `NODE_ENV=production`
- `PORT=5000`
- `ALGORITHM=HS256`
- `ACCESS_TOKEN_EXPIRE_MINUTES=1440`
- `ALLOWED_ORIGINS=...`

### frontend/.env
Expected keys:

- `VITE_API_URL=`

## 6) Build and Verification

### Frontend
- Install: `npm install`
- Build: `npm run build`

### Backend
- Install: `pip install -r requirements.txt`
- Start: `uvicorn app.main:app --host 0.0.0.0 --port 5000`
- Import test: `python -c "from uvicorn.importer import import_from_string; import_from_string('app.main:app'); print('ok')"`

### Auth Smoke Tests
1. Login from frontend.
2. Confirm token is stored in local storage.
3. Refresh page and validate protected user state.
4. Call `/api/auth/validate-token` with bearer token.
5. Confirm role-dependent UI behavior still works.

## 7) Troubleshooting

- **Database connection errors**
  - Check `DATABASE_URL` format and password.
  - Ensure `sslmode=require` is present for remote DB.
- **CORS blocked requests**
  - Verify exact frontend domain in `ALLOWED_ORIGINS`.
  - Include both local and production origins if needed.
- **401 Unauthorized**
  - Verify `JWT_SECRET` is set and stable between deployments.
  - Confirm `Authorization: Bearer <token>` is sent.
- **Frontend hitting wrong API**
  - Confirm `VITE_API_URL` is set in Vercel and redeploy.
- **requirements.txt not found on Render**
  - Confirm Root Directory is `backend`.
  - Keep Build Command as `pip install -r requirements.txt`.

## 8) Security Checklist

- Do not commit `.env` files.
- Rotate secrets before production go-live.
- Use strong `JWT_SECRET` (32+ chars).
- Restrict `ALLOWED_ORIGINS` to known domains.
