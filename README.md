<div align="center">

# 🍕 FoodAI

### AI-Powered Food Ordering System using FastAPI, React & Semantic Search

🚀 Built with React • FastAPI • SQLite • SQLAlchemy • Sentence Transformers

</div>

<div align="center">

# 📖 Overview

FoodAI is a modern restaurant ordering platform built with **React**, **FastAPI**, and **Sentence Transformers**.

Unlike traditional food ordering systems that rely on keyword matching, FoodAI enables users to search using **natural language**, making food discovery faster and more intuitive.

Customers can browse menus, filter categories, search using AI, place orders, and track them, while administrators can manage menu items, monitor analytics, and update order statuses through a dedicated dashboard.

---

# ✨ Features

## 👤 Customer Features

- 🤖 AI-powered semantic food search
- 🍽️ Browse restaurant menu
- 🏷️ Category-based filtering
- 📖 Interactive food details modal
- 🛒 Shopping cart
- ➕ Quantity management
- 💳 Checkout workflow
- 📦 Place orders
- 📱 Fully responsive UI

---

## 👨‍💼 Admin Features

- 📊 Dashboard analytics
- 💰 Revenue overview
- 📦 Total orders
- 📈 Orders grouped by status
- 🍕 Popular menu items
- ➕ Add menu items
- ✏️ Edit menu items
- 🗑️ Delete menu items
- 🔄 Toggle item availability
- 🚚 Update customer order status

---

# 🤖 AI Search

FoodAI integrates **Sentence Transformers** to perform semantic similarity search instead of simple keyword matching.

### Example Queries

```text
Show me something spicy

I want cheesy pizza

Healthy vegetarian meals

Quick snacks

Desserts with chocolate
```

The AI understands the meaning behind the query and recommends the most relevant dishes.

---

# 🏗️ System Architecture

```text
                 React + Tailwind CSS
                          │
                  Axios REST Client
                          │
                    FastAPI Backend
                          │
           SQLAlchemy ORM + Pydantic
                          │
          SQLite Database + Embeddings
                          │
        Sentence Transformers (AI Search)
```

---

# 🛠 Tech Stack

## Frontend

- React
- React Router
- Tailwind CSS
- Axios
- React Hot Toast
- Context API

---

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- Uvicorn

---

## AI

- Sentence Transformers
- all-MiniLM-L6-v2
- Cosine Similarity Search

---

# 📂 Project Structure

```text
FOOD-ORDERING-AI
│
├── backend
│   ├── app
│   │   ├── ai
│   │   ├── auth
│   │   ├── database
│   │   ├── models
│   │   ├── routers
│   │   ├── schemas
│   │   ├── services
│   │   ├── utils
│   │   ├── config.py
│   │   ├── main.py
│   │   └── __init__.py
│   │
│   ├── food_ordering.db
│   ├── requirements.txt
│   ├── runtime.txt
│   ├── render.yaml
│   └── .env
│
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── docs
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/himanshu-sharma27/food-ordering-ai.git
```

```bash
cd food-ordering-ai
```

---

# Backend Setup

```bash
cd backend
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run FastAPI

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger API

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# 📡 API Overview

## Menu

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/menu/` | Get Menu |
| POST | `/menu/` | Add Menu Item |
| PUT | `/menu/{id}` | Update Menu Item |
| DELETE | `/menu/{id}` | Delete Menu Item |
| PATCH | `/menu/{id}/availability` | Toggle Availability |

---

## Orders

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/orders/` | Place Order |
| GET | `/orders/` | View Orders |
| PATCH | `/orders/{id}` | Update Status |

---

## Dashboard

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/dashboard/` | Dashboard Analytics |

---

## AI Search

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/search/` | Semantic Food Search |

---



# 🎯 Key Highlights

- ✅ AI-powered semantic search
- ✅ Full-stack architecture
- ✅ RESTful API design
- ✅ CRUD operations
- ✅ Responsive React UI
- ✅ Admin analytics dashboard
- ✅ SQLAlchemy ORM
- ✅ Modern component-based architecture
- ✅ Production-ready folder structure

---

# 🚀 Future Enhancements

- JWT Authentication
- Payment Gateway Integration
- Order History
- Customer Authentication
- Restaurant Images
- Live Order Tracking
- Ratings & Reviews
- Recommendation Engine
- Email Notifications
- Docker Deployment

---

# 📚 Learning Outcomes

This project strengthened my understanding of:

- FastAPI Backend Development
- SQLAlchemy ORM
- React Architecture
- Context API
- REST API Design
- CRUD Operations
- AI Integration into Web Applications
- Semantic Search
- Dashboard Analytics
- Responsive UI Development
- Full Stack Application Development

---

# 👨‍💻 Author

## Himanshu Sharma

**Computer Science Engineering Student**

🔗 **LinkedIn**

https://www.linkedin.com/in/himanshu-sharma27/

💻 **GitHub**

https://github.com/himanshu-sharma27

---

<div align="center">

### ⭐ If you found this project interesting, consider giving it a Star!

</div>
