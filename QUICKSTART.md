# Quick Start Guide - Authentication System

## 🚀 5-Minute Setup

### Backend (FastAPI)

```bash
cd backend

# 1. Create .env file
cp .env.example .env

# 2. Install dependencies
pip install -r requirements.txt

# 3. Create database (PostgreSQL must be running)
# psql -c "CREATE DATABASE asset_operations_db;"

# 4. Seed demo users
python seed_db.py

# 5. Start server
uvicorn app.main:app --reload
```

Server runs at: `http://localhost:8000`
API docs: `http://localhost:8000/docs`

### Frontend (React + Vite)

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

App runs at: `http://localhost:5173`

## 🔐 Login with Demo Accounts

After starting both servers, go to http://localhost:5173/login

**Demo Credentials:**
- Email: `operator@assetops.com` | Password: `password123`
- Email: `manager@assetops.com` | Password: `password123`
- Email: `director@assetops.com` | Password: `password123`
- Email: `admin@assetops.com` | Password: `password123`

Or click the demo role buttons at the bottom of login page.

## 📁 Key Files Added

**Backend:**
- `backend/app/models/user.py` - User database model
- `backend/app/routes/auth.py` - Authentication endpoints
- `backend/app/services/auth_service.py` - Auth business logic
- `backend/app/schemas/auth_schema.py` - Request/response schemas
- `backend/app/utils/security.py` - JWT & bcrypt utilities
- `backend/seed_db.py` - Create demo users
- `backend/.env.example` - Environment template

**Frontend:**
- `frontend/src/auth/ProtectedRoute.jsx` - Route protection
- `frontend/src/auth/AuthProvider.jsx` - Auth context provider
- `frontend/src/services/authService.js` - API integration
- `frontend/src/hooks/useAuth.js` - Auth hook
- `frontend/src/pages/Login.jsx` - Login page (redesigned)
- `frontend/src/pages/Unauthorized.jsx` - Access denied page
- `frontend/.env.example` - Environment template

## 🔄 Login Flow

1. User enters email & password (or clicks demo button)
2. Frontend sends request to `/api/auth/login`
3. Backend validates credentials and returns JWT token
4. Frontend stores token + user data in localStorage
5. User redirected to role-based dashboard
6. All subsequent requests include token in Authorization header
7. Backend validates token before allowing access

## 🛡️ Role-Based Access

**Routes are protected by role:**
- `/operator/*` - Operator & Admin only
- `/manager/*` - Manager & Admin only
- `/director/*` - Director & Admin only

**Using in components:**
```jsx
import { useAuth } from './context/AuthContext'

function MyComponent() {
  const { user, hasRole, canAccess } = useAuth()
  
  if (hasRole('admin')) {
    // Show admin features
  }
  
  if (canAccess(['manager', 'admin'])) {
    // Show manager features
  }
}
```

## 🧪 Testing

### Test Backend API
```bash
# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"operator@assetops.com","password":"password123"}'

# Validate token
curl -X POST http://localhost:8000/api/auth/validate-token \
  -H "Authorization: Bearer <token>"
```

### Test Frontend
1. Open http://localhost:5173/login
2. Click demo role button (e.g., "Operator")
3. Verify redirect to `/operator/dashboard`
4. Open DevTools → Application → LocalStorage
5. Verify `authToken` and `user` are stored
6. Refresh page - should stay logged in
7. Try accessing `/manager/dashboard` - should redirect to Unauthorized

## 🐛 Troubleshooting

**"Can't connect to database"**
- Make sure PostgreSQL is running
- Check DATABASE_URL in .env
- Create database: `psql -c "CREATE DATABASE asset_operations_db;"`

**"Login returns 401"**
- Verify demo users were created: `python check_table.py`
- Check credentials in seed_db.py

**"CORS error"**
- Frontend URL must be in ALLOWED_ORIGINS in backend/.env
- Default includes http://localhost:5173

**"Session lost on refresh"**
- Check browser allows localStorage
- Verify token not expired
- Check token stored in DevTools

## 📖 Full Documentation

See `AUTHENTICATION.md` for:
- Complete architecture overview
- Security features & best practices
- Production deployment guide
- Advanced configuration
- API reference

## ✨ Features

✅ JWT token authentication
✅ bcrypt password hashing
✅ Role-based access control
✅ Demo accounts for MVP
✅ Session persistence
✅ Automatic token validation
✅ Professional login UI
✅ Unauthorized access handling
✅ Token expiration (24 hours)
✅ CORS configured
✅ Error handling & toast notifications
✅ Loading states
✅ Remember me checkbox

## 🚢 Production Checklist

Before deploying:
- [ ] Generate strong SECRET_KEY
- [ ] Configure PostgreSQL on production
- [ ] Use HTTPS/SSL certificates
- [ ] Set all environment variables
- [ ] Configure CORS for production domain
- [ ] Implement rate limiting
- [ ] Set up error logging/monitoring
- [ ] Backup database strategy
- [ ] Consider refresh token implementation
- [ ] Test all authentication flows

---

**Questions?** See AUTHENTICATION.md or check the inline code comments!
