# 🛒 MERN Grocery Store

A full-stack e-commerce grocery store application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features include user authentication with OTP verification, shopping cart, order management, and a beautiful responsive UI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.x-blue.svg)

## ✨ Features

### 🔐 Authentication & Security
- User registration and login
- OTP verification via email
- Forgot password with email reset link
- Password strength validation
- JWT-based authentication
- Secure password hashing with bcrypt

### 🛍️ Shopping Features
- Browse products by category
- Search functionality
- Product details page
- Add to cart with quantity management
- Real-time cart updates
- Responsive product grid

### 📦 Order Management
- Secure checkout process
- Order confirmation
- Order history tracking
- Order status updates
- Complete order details view

### 🎨 UI/UX
- Modern, responsive design
- Mobile-friendly interface
- Smooth animations
- Professional Tailwind CSS styling
- Intuitive navigation
- Beautiful gradient themes

## 🛠️ Tech Stack

### Frontend
| Technology | Description |
|------------|-------------|
| **React** | UI library for building interactive interfaces |
| **React Router v6** | Client-side routing |
| **Axios** | HTTP client for API requests |
| **Tailwind CSS** | Utility-first CSS framework |
| **Vite** | Fast build tool and development server |
| **Context API** | State management for cart and auth |

### Backend
| Technology | Description |
|------------|-------------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **JWT** | JSON Web Tokens for authentication |
| **Bcrypt** | Password hashing |
| **Nodemailer** | Email service for OTP |
| **CORS** | Cross-origin resource sharing |

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Running locally or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- **npm** or **yarn** package manager
- **Gmail account** (for email OTP functionality)

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/grocery-mern-store.git
cd grocery-mern-store
```

### 2️⃣ Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/grocery-store
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/grocery-store

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Gmail SMTP Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-16-char-app-password

# Server Configuration
PORT=5000
NODE_ENV=development
```

#### 📧 Getting Gmail App Password:

1. Enable **2-Factor Authentication** on your Google account
2. Go to [Google Account Settings](https://myaccount.google.com/) → Security
3. Find **2-Step Verification** → **App passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password to your `.env` file

### 3️⃣ Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

The frontend is configured to connect to `http://localhost:5000` by default.

### 4️⃣ Seed Database (Optional)

Populate the database with sample products and categories:

```bash
cd backend
node seed.js
```

This will create:
- Sample product categories (Fruits, Vegetables, Dairy, Bakery, etc.)
- Sample products with images and descriptions

## 🎯 Running the Application

### Option 1: Using Batch Files (Windows)

**Terminal 1 - Start Backend:**
```bash
start-backend.bat
```

**Terminal 2 - Start Frontend:**
```bash
start-frontend.bat
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Access the Application

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **MongoDB**: `mongodb://localhost:27017/grocery-store`

## 📁 Project Structure

```
grocery-mern-store/
│
├── backend/                    # Backend Node.js application
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   │   └── database.js    # MongoDB connection
│   │   │
│   │   ├── controllers/       # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── categoryController.js
│   │   │   └── orderController.js
│   │   │
│   │   ├── middleware/        # Custom middleware
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── models/            # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Category.js
│   │   │   └── Order.js
│   │   │
│   │   ├── routes/            # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── categoryRoutes.js
│   │   │   └── orderRoutes.js
│   │   │
│   │   ├── utils/             # Utility functions
│   │   │   └── emailService.js
│   │   │
│   │   └── server.js          # Express app entry point
│   │
│   ├── .env.example           # Environment variables template
│   ├── package.json
│   └── seed.js                # Database seeder
│
├── frontend/                   # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── context/           # React Context
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   │
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── VerifyOtp.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   └── Orders.jsx
│   │   │
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── .gitignore
├── README.md
└── GITHUB_PUSH_GUIDE.md
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |
| POST | `/verify-otp` | Verify email OTP | No |
| POST | `/forgot-password` | Request password reset | No |
| POST | `/reset-password` | Reset password with token | No |

### Product Routes (`/api/products`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all products | No |
| GET | `/:id` | Get single product | No |
| POST | `/` | Create product | Admin |
| PUT | `/:id` | Update product | Admin |
| DELETE | `/:id` | Delete product | Admin |

### Category Routes (`/api/categories`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all categories | No |
| POST | `/` | Create category | Admin |

### Order Routes (`/api/orders`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get user's orders | Yes |
| GET | `/:id` | Get single order | Yes |
| POST | `/` | Create new order | Yes |

## 🧪 Testing the API

You can test the API using tools like:

### Postman Collection Example

**Register User:**
```json
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "1234567890"
}
```

**Login:**
```json
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

## 🎨 Screenshots

_Add screenshots of your application here once deployed_

## 🚀 Deployment

### Backend Deployment (Render/Heroku)

1. Create a new web service
2. Connect your GitHub repository
3. Set environment variables
4. Deploy!

### Frontend Deployment (Vercel/Netlify)

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

## 📝 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/grocery-store` |
| `JWT_SECRET` | Secret key for JWT | `your-secret-key` |
| `EMAIL_USER` | Gmail address | `your-email@gmail.com` |
| `EMAIL_APP_PASSWORD` | Gmail app password | `16-char-password` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- None at the moment

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**DHANUNJAI**

## 🙏 Acknowledgments

- Thanks to the MERN stack community
- Inspired by modern e-commerce platforms
- Icons and images from various free resources

## 📞 Support

If you have any questions or run into issues:

1. Check the [GitHub Issues](https://github.com/YOUR-USERNAME/grocery-mern-store/issues)
2. Create a new issue with detailed information
3. Contact the maintainer

---

⭐ **If you found this project helpful, please give it a star!** ⭐
