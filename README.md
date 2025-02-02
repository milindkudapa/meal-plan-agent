# AI-Powered Health & Diet Planning Application

A modern, full-stack application that leverages AI to provide personalized meal plans and health tracking. Built with Next.js, Express, and OpenAI.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Features

- **AI-Powered Meal Planning**
  - Personalized meal suggestions based on health goals
  - Dietary preferences and restrictions support
  - Calorie and macronutrient tracking

- **Health Tracking**
  - Daily activity logging
  - Sleep quality monitoring
  - Heart rate tracking
  - Progress visualization

- **User Management**
  - Secure authentication
  - Personalized user profiles
  - Goal setting and tracking

- **Supplement Management**
  - Track fixed supplements
  - Nutrient information storage
  - Integration with meal plans

## 🚀 Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Chakra UI
- React Icons
- Axios

### Backend
- Node.js
- Express
- SQLite
- Sequelize ORM
- OpenAI API
- Swagger Documentation

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/milindkudapa/meal-plan-agent.git
   cd meal-plan-agent
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   # Database Configuration
   DB_NAME=health_diet_db
   DB_USER=user
   DB_PASSWORD=password
   DB_HOST=localhost

   # OpenAI Configuration
   OPENAI_API_KEY=your-api-key-here

   # Server Configuration
   PORT=3001
   NODE_ENV=development
   ```

## 🚀 Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The server will start on http://localhost:3001
   API documentation available at http://localhost:3001/api-docs

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The application will be available at http://localhost:3000

## 📚 API Documentation

### User Management
- POST `/api/users` - Register new user
- GET `/api/users/:userId` - Get user profile
- PUT `/api/users/:userId` - Update user profile
- GET `/api/users/:userId/stats` - Get user statistics

### Daily Logging
- POST `/api/daily` - Create daily log
- GET `/api/daily` - Get daily log by date
- PUT `/api/daily/:logId` - Update daily log

### Meal Planning
- POST `/api/mealplan` - Generate meal plan
- GET `/api/mealplan/:daily_log_id` - Get meal plan
- PUT `/api/mealplan/:plan_id` - Update meal plan

### Supplements
- POST `/api/supplements` - Add supplement
- GET `/api/supplements/user/:user_id` - Get user supplements
- PUT `/api/supplements/:supplement_id` - Update supplement
- DELETE `/api/supplements/:supplement_id` - Delete supplement

## 🎨 UI Features

- Responsive design for all screen sizes
- Dark/Light mode support
- Accessible components
- Modern, clean interface
- Interactive data visualizations

## 🔒 Security Features

- JWT authentication
- Password hashing
- Input validation
- API rate limiting
- Secure environment variables

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 📦 Deployment

### Backend
1. Set NODE_ENV to 'production'
2. Update environment variables
3. Run build command:
   ```bash
   npm run build
   npm start
   ```

### Frontend
1. Build the application:
   ```bash
   npm run build
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for the GPT API
- Next.js team for the amazing framework
- Chakra UI for the component library
- All contributors and supporters

## 📧 Contact

For any queries or support, please open an issue in the repository. 