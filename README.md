# 🌾 FarmHelper

FarmHelper is a modern, full-stack agricultural web application built on the **MERN** (MongoDB, Express, React, Node.js) stack. It is designed to assist farmers and agricultural enthusiasts by providing data-driven crop recommendations, detailed crop and fertilizer catalogs, real-time weather data, and educational farming guides.

---

## 🚀 Features

*   **Intelligent Crop Recommendations:** Get personalized crop suggestions based on your location, soil type, and current season.
*   **Comprehensive Crop Explorer:** Browse a massive catalog of crops. View detailed profiles including ideal soil, temperature ranges, water requirements, growing periods, and recommended fertilizers.
*   **Fertilizer Guide:** Access detailed information on various organic and chemical fertilizers, complete with nutrient profiles and best practice usage tips.
*   **Real-time Weather Dashboard:** Check live weather conditions, temperature, humidity, wind speed, and rain predictions for any city.
*   **Educational Modules:**
    *   *Soil Health Check:* Learn how to test, maintain, and improve soil quality.
    *   *Season Guide:* Understand Indian agricultural seasons (Kharif, Rabi, Zaid) and what to plant when.
*   **User Authentication:** Secure email/password login and Google OAuth integration, featuring JSON Web Tokens (JWT) for secure session management.
*   **Search History:** Automatically saves your search history so you can quickly refer back to past crop and fertilizer queries.
*   **Premium UI/UX:** A stunning, highly responsive, card-based interface inspired by modern design trends. Includes dynamic animations and full **Dark / Light mode** support.

---

## 🛠️ Technology Stack

### Frontend
*   **Framework:** React 18 (Bootstrapped with Vite)
*   **Routing:** React Router DOM
*   **State Management:** React Context API (AuthContext, ThemeContext)
*   **Styling:** Vanilla CSS (CSS Variables, Flexbox/Grid, Animations)
*   **Authentication:** `@react-oauth/google`
*   **HTTP Client:** Axios
*   **Icons & Toast:** `react-icons`, `react-hot-toast`

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB & Mongoose
*   **Authentication:** `jsonwebtoken` (JWT), `bcryptjs`
*   **Environment:** `dotenv`

---

## 📂 Project Structure

```text
farmhelper2/
├── backend/                  # Express.js Server
│   ├── config/               # Database connection setup
│   ├── controllers/          # Route logic (Auth, Crops, Weather, Search, History)
│   ├── data/                 # Static datasets (Location-Soil mapping)
│   ├── middleware/           # JWT Authentication middleware
│   ├── models/               # Mongoose schemas (User, Crop, Fertilizer, History)
│   ├── routes/               # Express route definitions
│   ├── utils/                # Helper functions (Token generation)
│   ├── seed.js               # Database population script
│   └── server.js             # Main entry point for backend
│
├── frontend/                 # React.js Client
│   ├── src/
│   │   ├── components/       # Reusable UI elements (Navbar, Sidebar, Cards, etc.)
│   │   ├── context/          # Global state providers (Auth, Theme)
│   │   ├── pages/            # Application views (Dashboard, CropDetail, Settings, etc.)
│   │   ├── services/         # Axios API configuration
│   │   ├── App.jsx           # Main routing component
│   │   ├── main.jsx          # React DOM render point
│   │   └── index.css         # Global styles and design system
│   ├── index.html            # HTML template
│   └── package.json          # Frontend dependencies
│
└── README.md                 # Project Documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
*   Node.js (v16 or higher)
*   MongoDB (Local or MongoDB Atlas)
*   A Google Cloud Console account (for Google OAuth Client ID)
*   OpenWeatherMap API Key (for weather data)

### 1. Clone the repository
```bash
git clone https://github.com/Sankalp7883/FarmHelper.git
cd FarmHelper
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
WEATHER_API_KEY=your_openweathermap_api_key
```

Seed the database with initial crops and fertilizers:
```bash
node seed.js
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend` directory with the following variable:
```env
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

Start the frontend development server:
```bash
npm run dev
```

---

## 🎨 Theme & Design System

The application utilizes a heavily customized CSS-variable-based design system found in `frontend/src/index.css`. It features a beautifully balanced **Olive Green & White** aesthetic in Light Mode, and a deep **Absolute Black & Charcoal** aesthetic in Dark Mode, specifically designed to be easy on the eyes while offering maximum contrast and a premium feel.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check [issues page](https://github.com/Sankalp7883/FarmHelper/issues).

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
