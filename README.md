# MEAN Stack Interview – Backend API

**Candidate:** Zeeshan Raza  
**Email:** [recruitment@atdrive.com](mailto:recruitment@atdrive.com)  
**Repository:** Backend API Server

---

## 🎯 Overview

A RESTful backend API built with **Node.js** and **Express.js**, demonstrating a **dual-database architecture** using **MongoDB** and **MySQL**. The project includes secure user authentication, CRUD operations, order management, and third‑party API integration.

This backend is designed to showcase real‑world MEAN stack backend skills such as clean architecture, security best practices, and scalable API design.

---

## 🏗️ Architecture

### Dual Database Strategy

* **MongoDB** – Products & Orders (document‑based, flexible schema)
* **MySQL** – Users (relational data, authentication)

### High‑Level Flow

* Users are stored and authenticated via **MySQL**
* Products and Orders are managed via **MongoDB**
* Orders reference users (MySQL IDs) and products (MongoDB ObjectIds)

---

## 📁 Project Structure

```
backend/
├── config/
│   ├── mongodb.js        # MongoDB connection
│   └── mysql.js          # MySQL connection pool
├── controllers/
│   ├── productController.js  # Product CRUD logic
│   ├── userController.js     # User register/login
│   └── orderController.js    # Order management
├── models/
│   ├── Product.js        # Product schema (MongoDB)
│   └── Order.js          # Order schema (MongoDB)
├── routes/
│   ├── index.js          # API entry routes
│   ├── products.js       # Product routes
│   ├── users.js          # User routes
│   └── orders.js         # Order routes
├── middleware/
│   └── errorHandler.js   # Centralized error handling
├── services/
│   └── weatherService.js # OpenWeatherMap integration
├── .env.example          # Environment variables template
├── package.json
└── server.js             # Application entry point
```

---

## 📋 Features Implemented

### ✅ Section 1: MEAN Stack CRUD (Products)

* Mongoose schema with validations
* Full CRUD operations (Create, Read, Update, Delete)
* MongoDB as data store
* Field validation (required fields, price constraints)

---

### ✅ Section 2: MySQL Integration (Users)

* MySQL database with connection pooling
* User registration and login
* Password hashing using **bcrypt** (10 salt rounds)
* Username uniqueness check
* Password validation (minimum 6 characters)

---

### ✅ Section 3: API Development (Orders)

* RESTful API design with proper HTTP methods
* Order–User–Product relationship handling
* Auto‑calculation of total order amount
* Product existence validation before order creation
* Orders populated with full product details

---

### ✅ Section 4: Third‑Party API Integration

* Integration with **OpenWeatherMap API**
* City‑based weather lookup
* Graceful error handling for external API failures
* Returns:

  * Temperature
  * Weather description
  * Humidity
  * Wind speed

---

## 🚀 Quick Start

### Prerequisites

* Node.js **v18+**
* MongoDB **v6+** (localhost:27017)
* MySQL **v8+** (localhost:3306)

---

### Installation

```bash
git clone https://github.com/yourusername/mean-stack-backend.git
cd mean-stack-backend
npm install
```

---

### Environment Setup

```bash
cp .env.example .env
```

#### Sample `.env`

```env
PORT=3000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/meantest

# MySQL
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DB=meantest

# OpenWeatherMap
WEATHER_API_KEY=your_api_key_here
```

---

## 🗄️ MySQL Database Setup

```sql
CREATE DATABASE IF NOT EXISTS meantest;
USE meantest;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ▶️ Running the Server

```bash
npm start
```

Server will start on:

```
http://localhost:3000
```

---

## 📌 API Endpoints (Summary)

### Users

* `POST /api/users/register` – Register user
* `POST /api/users/login` – Login user

### Products

* `GET /api/products` – Get all products
* `POST /api/products` – Create product
* `GET /api/products/:id` – Get product by ID
* `PUT /api/products/:id` – Update product
* `DELETE /api/products/:id` – Delete product

### Orders

* `POST /api/orders` – Create order
* `GET /api/orders` – Get all orders

### Weather

* `GET /api/weather/:city` – Get weather by city

---

## 🛡️ Security & Best Practices

* Password hashing with bcrypt
* Centralized error handling middleware
* Environment‑based configuration
* Clean separation of concerns (routes, controllers, services)

---

## 📄 License

This project is created for **technical interview evaluation purposes only**.
