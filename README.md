# Stock-Tracking-app
Stock Tracking Application
# 📈 Stock Trading Application

A **full-stack stock trading simulation system** built with **React (frontend)**, **Spring Boot (backend)**, **Spring Security (JWT Auth)**, **MySQL (database)**, and **WebSockets** for real-time market data.

This project provides a realistic trading environment where users can:
- Register/login securely with JWT authentication
- View live market quotes and charts
- Place buy/sell orders
- Manage a portfolio and track P&L
- Experience near real-world trading scenarios

## 🚀 Tech Stack

### Backend
- Java 21 + Spring Boot 3.x
- Spring Security + JWT for authentication
- JPA/Hibernate + MySQL
- WebSocket/STOMP for real-time quotes
- Docker support

## Frontend
- React + Vite
- Tailwind CSS for UI
- Axios for API calls
- Recharts for live charts
- SockJS + StompJS for WebSocket connections

## 📂 Project Structure

stock-trading-app/
├── backend/ # Spring Boot backend
│ ├── src/main/java/com/example/trading/
│ │ ├── controller/ # REST controllers
│ │ ├── entity/ # JPA entities
│ │ ├── repository/ # Spring Data repositories
│ │ ├── security/ # JWT, filters, config
│ │ └── service/ # Business logic
│ └── src/main/resources/
│ └── application.yml # DB and app config
│
├── frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── hooks/ # Custom React hooks
│ │ ├── pages/ # Dashboard, Login, Register, etc.
│ │ └── App.jsx # Main app entry
│ └── vite.config.js
│
└── docker-compose.yml # Multi-container setup

## ⚙️ Setup & Installation

## 1. Clone the repository

git clone https://github.com/your-username/stock-trading-app.git
cd stock-trading-app

2. Backend Setup
bash
Copy
Edit
cd backend
./mvnw clean install
./mvnw spring-boot:run
API runs on http://localhost:8080

Default endpoints:

POST /api/auth/register – register new user

POST /api/auth/login – login and get JWT token

GET /api/orders – get orders (requires JWT)

WS /ws – websocket endpoint for live quotes

## 3. Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
Frontend runs on http://localhost:5173

# 4. Database (MySQL)
Create a database:
CREATE DATABASE trading_app;

5.Update application.yml (backend):

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/trading_app
    username: root
    password: root
  jpa:
    hibernate:
      ddl-auto: update

🧪 Example API Usage
Register
json
POST /api/auth/register
{
  "email": "john.doe@example.com",
  "password": "P@55w0rd"
}

Login
json

POST /api/auth/login
{
  "email": "john.doe@example.com",
  "password": "P@55w0rd"
}
Response:
json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
Use this token in Authorization: Bearer <token> header.

📊 Features

🔑 User registration & JWT login

📡 Live stock quotes via WebSocket

📉 Real-time charts

💰 Buy/Sell orders

📂 Portfolio management

🐳 Dockerized setup for deployment

🐳 ## Dockerized setup for deployment

🐳 Running with Docker

docker-compose up --build
Backend → http://localhost:8080

Frontend → http://localhost:5173

MySQL → localhost:3306

📌 Roadmap
 Add watchlist support

 Advanced order types (limit, stop-loss)

 Historical data & charts

 Mobile responsive design

 Deploy to AWS/GCP

🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to fork and submit a PR.
