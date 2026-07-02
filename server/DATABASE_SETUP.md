# Database Setup Guide

## 🚀 Quick Start

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free
3. Create a new cluster (M0 - Always free)
4. Set up a database user with username and password

### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Select "Drivers" → "Node.js"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `logistics_db` with your database name

### Step 3: Setup Environment Variables
1. Copy `.env.example` to `.env` in the server folder
2. Update the values:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/logistics_db?retryWrites=true&w=majority
PORT=3001
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
CORS_ORIGIN=http://localhost:5173
```

### Step 4: Install Dependencies (if not done already)
```bash
cd server
npm install
```

### Step 5: Start the Server
```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
✅ Server running on port 3001
```

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)

### Drivers
- `GET /api/drivers` - Get all drivers
- `POST /api/drivers` - Create driver
- `GET /api/drivers/:id` - Get driver by ID
- `PUT /api/drivers/:id` - Update driver
- `DELETE /api/drivers/:id` - Delete driver

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `POST /api/vehicles` - Create vehicle
- `GET /api/vehicles/:id` - Get vehicle by ID
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Trips
- `GET /api/trips` - Get all trips
- `POST /api/trips` - Create trip
- `GET /api/trips/:id` - Get trip by ID
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip
- `GET /api/trips/status/:status` - Get trips by status

---

## 🧪 Testing Endpoints

### Using Postman or cURL

#### 1. Register User
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "password123",
    "phone": "9876543210",
    "role": "admin"
  }'
```

#### 2. Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

#### 3. Create Driver (requires token from login)
```bash
curl -X POST http://localhost:3001/api/drivers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Rahul Sharma",
    "phone": "9876543210",
    "email": "rahul@example.com",
    "licenseNumber": "DL123456789",
    "city": "Delhi",
    "state": "Delhi",
    "salary": 30000
  }'
```

---

## 📁 Project Structure

```
server/
├── config/
│   └── db.js                    (Database connection)
├── models/
│   ├── User.js                  (User schema with auth)
│   ├── Driver.js                (Driver schema)
│   ├── Vehicle.js               (Vehicle schema)
│   └── Trip.js                  (Trip schema)
├── controllers/
│   ├── authController.js        (Auth logic)
│   ├── driverController.js      (Driver CRUD)
│   ├── vehicleController.js     (Vehicle CRUD)
│   └── tripController.js        (Trip CRUD)
├── routes/
│   ├── authRoutes.js
│   ├── driverRoutes.js
│   ├── vehicleRoutes.js
│   └── tripRoutes.js
├── middleware/
│   └── auth.js                  (JWT verification)
├── server.js                    (Main server file)
├── .env                         (Environment variables)
├── .env.example                 (Example .env file)
└── package.json
```

---

## 🔐 Security Notes

1. **Never commit `.env`** to Git - it's in `.gitignore`
2. Change `JWT_SECRET` in production
3. Use strong database passwords
4. Enable IP whitelist in MongoDB Atlas
5. Use HTTPS in production

---

## 🐛 Troubleshooting

### Connection Error
- Check MongoDB URI in `.env`
- Verify database user credentials
- Check IP whitelist in MongoDB Atlas

### Port Already in Use
```bash
# Change PORT in .env to different number
PORT=3002
```

### Token Expired
- Tokens expire after 7 days
- User needs to login again

---

## 📝 Next Steps

1. **Integrate Frontend:** Update your React services to call these API endpoints
2. **Add Real-time Tracking:** Use Socket.io for live location updates
3. **Add Analytics:** Create analytics endpoints for dashboard
4. **Add File Upload:** For documents, licenses, photos
5. **Add Notifications:** Email or SMS notifications

---

Enjoy! 🚀
