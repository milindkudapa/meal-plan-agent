const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Health/Diet AI Application API',
      version: '1.0.0',
      description: 'API documentation for the Health/Diet AI Application',
      contact: {
        name: 'API Support',
        url: 'http://localhost:3001/api-docs'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server'
      }
    ],
    tags: [
      { name: 'Users', description: 'User management endpoints' },
      { name: 'Daily Logs', description: 'Daily activity logging endpoints' },
      { name: 'Meal Plans', description: 'Meal planning endpoints' },
      { name: 'Supplements', description: 'Supplement management endpoints' },
      { name: 'Authentication', description: 'Authentication endpoints' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            height: { type: 'number' },
            weight: { type: 'number' },
            age: { type: 'integer' },
            activity_level: {
              type: 'string',
              enum: ['sedentary', 'light', 'moderate', 'active', 'very_active']
            },
            desired_weight: { type: 'number' },
            goal_time_period: { type: 'integer' },
            geographical_region: { type: 'string' },
            food_preferences: { type: 'object' }
          },
          required: ['height', 'weight', 'age', 'activity_level', 'desired_weight', 'goal_time_period', 'geographical_region']
        },
        DailyLog: {
          type: 'object',
          properties: {
            user_id: { type: 'integer' },
            date: { type: 'string', format: 'date' },
            expected_activity_level: {
              type: 'string',
              enum: ['sedentary', 'light', 'moderate', 'active', 'very_active']
            },
            sleep_score: { type: 'integer', minimum: 0, maximum: 100 },
            resting_heart_rate: { type: 'integer', minimum: 30, maximum: 200 }
          },
          required: ['user_id', 'expected_activity_level', 'sleep_score', 'resting_heart_rate']
        },
        MealPlan: {
          type: 'object',
          properties: {
            daily_log_id: { type: 'integer' },
            plan_details: {
              type: 'object',
              properties: {
                totalCalories: { type: 'number' },
                macronutrients: {
                  type: 'object',
                  properties: {
                    protein: { type: 'number' },
                    carbs: { type: 'number' },
                    fats: { type: 'number' }
                  }
                },
                meals: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      type: { type: 'string' },
                      time: { type: 'string' },
                      foods: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            name: { type: 'string' },
                            portion: { type: 'number' },
                            calories: { type: 'number' }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          required: ['daily_log_id']
        },
        Supplement: {
          type: 'object',
          properties: {
            user_id: { type: 'integer' },
            supplement_name: { type: 'string' },
            nutrient_info: { type: 'object' }
          },
          required: ['user_id', 'supplement_name', 'nutrient_info']
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'] // Include controllers for more detailed documentation
};

const specs = swaggerJsdoc(options);

module.exports = specs; 