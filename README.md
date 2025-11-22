# 🛒 MERN Grocery Store

A full-stack e-commerce grocery store application built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features

- **User Authentication**: Register, login, forgot password, OTP verification
- **Product Management**: Browse products, search, filter by category
- **Shopping Cart**: Add to cart, update quantities, remove items
- **Order Management**: Checkout, order history, order tracking
- **Admin Features**: Manage products, categories, and orders
- **Email Notifications**: OTP verification via Gmail SMTP
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas account)
- npm or yarn package manager

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd grocery-mern
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
MONGO_URI=mongodb://localhost:27017/grocery-store
JWT_SECRET=your-secret-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password
PORT=5000
NODE_ENV=development
```

**Note**: To get a Gmail App Password:
1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account Settings > Security > 2-Step Verification
3. Scroll to "App passwords" and generate a new password
4. Use this 16-character password in your `.env` file

### 3. Frontend Setup

```bash
cd frontend
npm install
```

### 4. Seed Database (Optional)

To populate the database with sample data:
```bash
cd backend
node seed.js
```

## 🚀 Running the Application

### Option 1: Using Batch Files (Windows)

**Start Backend:**
```bash
start-backend.bat
```

**Start Frontend:**
```bash
start-frontend.bat
```

### Option 2: Manual Start

**Backend (from backend directory):**
```bash
npm start
```

**Frontend (from frontend directory):**
```bash
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## 📁 Project Structure

```
grocery-mern/
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── server.js       # Express app setup
│   ├── .env.example        # Environment variables template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Context API
│   │   └── App.jsx         # Main App component
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get single order

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)

## 🧪 Testing

You can test the API endpoints using tools like:
- Postman
- Thunder Client
- cURL

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

Your Name

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by modern e-commerce platforms
