const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
require('dotenv').config();

const { testConnection, initializeDatabase } = require('./database');
const userRoutes = require('./routes/userRoutes');
const dailyRoutes = require('./routes/dailyRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const supplementRoutes = require('./routes/supplementRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { explorer: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/daily', dailyRoutes);
app.use('/api/mealplan', mealPlanRoutes);
app.use('/api/supplements', supplementRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    
    // Initialize database (sync models)
    await initializeDatabase();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 