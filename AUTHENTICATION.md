# Authentication & Authorization System

This document explains the complete authentication and role-based access control system for the Asset Operations Management Platform.

## Overview

The platform uses:
- **JWT (JSON Web Tokens)** for stateless authentication
- **bcrypt** for secure password hashing
- **SQLAlchemy** for database ORM
- **FastAPI** for the backend API
- **React Context API** for frontend state management
- **localStorage** for session persistence

## Architecture

### Backend Components

#### 1. **User Model** (`backend/app/models/user.py`)
```python
- id: Integer (Primary Key)
- name: String
- email: String (Unique)
- password_hash: String (bcrypt hashed)
- role: Enum (operator, manager, director, admin)
- department: String
- is_active: Boolean
- created_at: DateTime
```

#### 2. **Security Utils** (`backend/app/utils/security.py`)
- `verify_password()`: Compare plain password with hash
- `get_password_hash()`: Hash password using bcrypt
- `create_access_token()`: Generate JWT token
- `decode_token()`: Validate and decode JWT token

#### 3. **Auth Service** (`backend/app/services/auth_service.py`)
- `create_user()`: Register new user
- `authenticate_user()`: Validate credentials
- `login()`: Return token and user data
- `get_user_by_email()`: Query user
- `get_user_by_id()`: Query user

#### 4. **Auth Routes** (`backend/app/routes/auth.py`)
```
POST /api/auth/login
  - Input: email, password
  - Returns: access_token, token_type, user

POST /api/auth/validate-token
  - Input: Authorization header (Bearer token)
  - Returns: user data

GET /api/auth/me
  - Input: Authorization header
  - Returns: current user profile
```

#### 5. **Database Seeding** (`backend/seed_db.py`)
Creates demo users for MVP testing:
- operator@assetops.com (password123)
- manager@assetops.com (password123)
- director@assetops.com (password123)
- admin@assetops.com (password123)

### Frontend Components

#### 1. **Auth Service** (`frontend/src/services/authService.js`)
```javascript
authService.login(email, password)
authService.logout()
authService.getCurrentUser()
authService.isAuthenticated()
authService.getToken()
authService.validateToken()
authService.demoLogin(role)
```

#### 2. **Auth Context** (`frontend/src/context/AuthContext.jsx`)
Manages global auth state:
- `user`: Current user object
- `token`: JWT access token
- `loading`: Loading state
- `isInitialized`: Auth initialization complete
- `isAuthenticated`: User is logged in
- `login()`: Login method
- `logout()`: Logout method
- `hasRole()`: Check user role
- `canAccess()`: Check role-based access

#### 3. **useAuth Hook** (`frontend/src/hooks/useAuth.js`)
```javascript
const { user, token, isAuthenticated, login, logout, hasRole } = useAuth()
```

#### 4. **ProtectedRoute** (`frontend/src/auth/ProtectedRoute.jsx`)
```jsx
<ProtectedRoute allowedRoles={['manager', 'admin']}>
  <YourComponent />
</ProtectedRoute>
```

#### 5. **Login Page** (`frontend/src/pages/Login.jsx`)
Enterprise-grade login UI with:
- Email and password fields
- Show/hide password toggle
- Remember me checkbox
- Demo account shortcuts
- Error handling
- Loading states
- Gradient background with emerald accent

#### 6. **Unauthorized Page** (`frontend/src/pages/Unauthorized.jsx`)
Shown when user tries to access restricted resources

## Setup & Configuration

### Backend Setup

1. **Install Dependencies**
```bash
cd backend
pip install -r requirements.txt
```

2. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. **Create Database**
```bash
# Using PostgreSQL
psql -c "CREATE DATABASE asset_operations_db;"
```

4. **Seed Demo Users**
```bash
python seed_db.py
```

5. **Run Server**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Configure API Base URL** (optional)
Create `.env.local`:
```
VITE_API_BASE_URL=http://localhost:8000
```

3. **Run Development Server**
```bash
npm run dev
```

## Login Flow

### User Credentials Flow

```
User enters email & password
        ↓
Frontend sends POST /api/auth/login
        ↓
Backend validates credentials against user DB
        ↓
If valid:
  - Generate JWT token
  - Return token + user data
  - Store token in localStorage
  - Store user in localStorage
        ↓
Redirect to role-based dashboard
```

### Demo Account Flow

```
User clicks demo role button
        ↓
Frontend uses hardcoded demo credentials
        ↓
Calls login() with demo email & password
        ↓
Same flow as above
```

## Role-Based Access Control

### Role Hierarchy

| Role | Can Access | Permissions |
|------|-----------|-------------|
| **Operator** | Operator dashboard, Issue/Return assets, Search, My Issued Assets | Read/Write asset operations |
| **Manager** | Manager dashboard, Inventory, Issued Assets, Overdue, Activity, Maintenance | Read/Write + monitoring |
| **Director** | Director dashboard, Analytics, Departments, Reports, Risk | Read-only + strategic view |
| **Admin** | All sections, User management, Settings | Full access |

### Route Protection

```jsx
// Operator only
<ProtectedRoute allowedRoles={['operator']}>
  <OperatorDashboard />
</ProtectedRoute>

// Manager and Admin
<ProtectedRoute allowedRoles={['manager', 'admin']}>
  <ManagerDashboard />
</ProtectedRoute>

// Director only
<ProtectedRoute allowedRoles={['director']}>
  <DirectorDashboard />
</ProtectedRoute>
```

### Dynamic Role Checking

```javascript
const { hasRole, canAccess } = useAuth()

// Check single role
if (hasRole('admin')) {
  // Show admin features
}

// Check multiple roles
if (hasRole(['manager', 'admin'])) {
  // Show manager/admin features
}

// Alternative method
if (canAccess(['director', 'admin'])) {
  // Show features
}
```

## Security Features

### Password Security
- Passwords are hashed using **bcrypt** (not stored in plain text)
- Never store or log passwords
- Hash comparison is constant-time (resistant to timing attacks)

### Token Security
- JWT tokens include expiration time (24 hours by default)
- Tokens are signed with a secret key
- Invalid/expired tokens trigger logout
- Tokens stored in localStorage (consider httpOnly cookies for production)

### API Security
- All protected endpoints require `Authorization: Bearer <token>` header
- Server validates token on every protected request
- Invalid tokens return 401 Unauthorized
- CORS protection for cross-origin requests

### Production Recommendations
- Use HTTPS for all communications
- Store tokens in httpOnly cookies instead of localStorage
- Implement refresh tokens for longer sessions
- Add rate limiting on login endpoint
- Implement account lockout after failed attempts
- Add two-factor authentication
- Use environment variables for all secrets
- Implement audit logging

## Demo Accounts

For MVP testing, use these credentials:

```
Operator:
  Email: operator@assetops.com
  Password: password123

Manager:
  Email: manager@assetops.com
  Password: password123

Director:
  Email: director@assetops.com
  Password: password123

Admin:
  Email: admin@assetops.com
  Password: password123
```

Or use the demo buttons on the login page.

## Token Validation

### On App Load
```javascript
// AuthContext initializes from localStorage
const storedToken = localStorage.getItem('authToken')
const storedUser = localStorage.getItem('user')

if (storedToken && storedUser) {
  setToken(storedToken)
  setUser(JSON.parse(storedUser))
}
```

### API Requests
```javascript
// All requests include token automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### Token Expiration
```javascript
// Invalid tokens trigger logout
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

## Error Handling

### Common Error Responses

```
400 Bad Request: Email already registered
401 Unauthorized: Invalid credentials
401 Unauthorized: User account is inactive
401 Unauthorized: Not authenticated
401 Unauthorized: Invalid token
```

### Frontend Error Handling
- Login errors display in red alert box
- Toast notifications for user feedback
- Graceful fallback for network errors
- Retry logic for failed requests

## Testing the System

### 1. Test Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"operator@assetops.com","password":"password123"}'
```

### 2. Test Token Validation
```bash
curl -X POST http://localhost:8000/api/auth/validate-token \
  -H "Authorization: Bearer <token>"
```

### 3. Test Frontend Login
1. Navigate to http://localhost:5173/login
2. Click on demo role button
3. Verify redirect to correct dashboard
4. Verify token stored in localStorage
5. Test page refresh (should maintain login state)

## Troubleshooting

### Login Returns 401
- Check email and password are correct
- Verify user exists in database: `python check_table.py`
- Ensure database is running

### Token Validation Fails
- Token may be expired (24 hours)
- Token may be malformed
- Check SECRET_KEY matches between backend and frontend

### CORS Errors
- Add frontend URL to `ALLOWED_ORIGINS` in .env
- Restart backend server

### Session Lost on Refresh
- Check localStorage is enabled in browser
- Verify token is being stored: check DevTools → Application → LocalStorage
- Check token hasn't expired

## Next Steps

### Production Deployment
1. Generate strong SECRET_KEY
2. Configure PostgreSQL on production server
3. Use HTTPS certificates
4. Set up environment variables on server
5. Configure CORS for production domain
6. Implement rate limiting
7. Set up monitoring and logging
8. Configure automated backups

### Feature Enhancements
1. Refresh token implementation
2. Email verification for registration
3. Password reset flow
4. OAuth2/SSO integration
5. Multi-factor authentication
6. Role customization UI
7. User management dashboard
8. Activity audit logging

## File Structure

```
backend/
├── app/
│   ├── models/
│   │   ├── tool.py
│   │   └── user.py              # NEW: User model
│   ├── routes/
│   │   ├── tool_routes.py
│   │   └── auth.py              # NEW: Auth endpoints
│   ├── schemas/
│   │   └── auth_schema.py       # NEW: Auth schemas
│   ├── services/
│   │   └── auth_service.py      # NEW: Auth business logic
│   ├── utils/
│   │   └── security.py          # NEW: JWT & bcrypt utils
│   ├── database/
│   │   └── db.py
│   └── main.py
├── seed_db.py                   # NEW: Demo user seeding
├── requirements.txt             # UPDATED: Added auth deps
└── .env.example                 # NEW: Environment template

frontend/
├── src/
│   ├── auth/
│   │   ├── AuthProvider.jsx    # NEW: Auth provider
│   │   └── ProtectedRoute.jsx  # NEW: Route protection
│   ├── context/
│   │   └── AuthContext.jsx     # UPDATED: Enhanced context
│   ├── hooks/
│   │   └── useAuth.js          # NEW: Auth hook
│   ├── services/
│   │   └── authService.js      # NEW: Auth API service
│   ├── pages/
│   │   ├── Login.jsx           # UPDATED: Enterprise UI
│   │   └── Unauthorized.jsx    # NEW: Access denied page
│   └── App.jsx                 # UPDATED: Routing
└── package.json                # UPDATED: Added axios
```

## Additional Resources

- [FastAPI Security](https://fastapi.tiangolo.com/advanced/security/)
- [JWT.io](https://jwt.io/)
- [Bcrypt](https://en.wikipedia.org/wiki/Bcrypt)
- [React Router](https://reactrouter.com/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
