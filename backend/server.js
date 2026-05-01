require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const cropRoutes = require('./routes/cropRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const historyRoutes = require('./routes/historyRoutes');
const searchRoutes = require('./routes/searchRoutes');
const fertilizerRoutes = require('./routes/fertilizerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware,,
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'].filter(Boolean),
    credentials: true,
  })
);
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/fertilizers', fertilizerRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FarmHelper API is running 🌱' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌾 FarmHelper API running on port ${PORT}`);
});
