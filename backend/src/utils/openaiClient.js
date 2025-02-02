const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateMealPlan(userProfile, dailyLog, previousMealPlans = []) {
  try {
    const prompt = `Generate a detailed meal plan for a person with the following characteristics:
    - Height: ${userProfile.height}cm
    - Current Weight: ${userProfile.weight}kg
    - Target Weight: ${userProfile.desired_weight}kg
    - Age: ${userProfile.age}
    - Activity Level Today: ${dailyLog.expected_activity_level}
    - Sleep Score: ${dailyLog.sleep_score}
    - Resting Heart Rate: ${dailyLog.resting_heart_rate}
    - Food Preferences: ${JSON.stringify(userProfile.food_preferences)}
    - Region: ${userProfile.geographical_region}

    Please provide a detailed meal plan with:
    1. Breakfast, lunch, dinner, and snacks
    2. Exact portions in grams
    3. Calorie count per meal
    4. Macronutrient breakdown (protein, carbs, fats)
    5. Micronutrient highlights
    6. Timing recommendations

    IMPORTANT: You must respond with ONLY a valid JSON object in the following format, with no additional text or explanation:
    {
      "totalCalories": number,
      "macronutrients": { "protein": number, "carbs": number, "fats": number },
      "meals": [
        {
          "type": string,
          "time": string,
          "foods": [{ "name": string, "portion": number, "calories": number }],
          "totalCalories": number
        }
      ],
      "micronutrients": { },
      "hydrationRecommendation": string
    }`;

    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "You are a meal planning assistant that responds only with valid JSON objects. Never use markdown formatting or code blocks. Respond with raw JSON only."
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      model: "gpt-4o",
      temperature: 0.7,
      max_tokens: 1000
    });

    // Clean the response of any markdown formatting
    let content = completion.choices[0].message.content;
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw new Error('Failed to generate meal plan');
  }
}

module.exports = {
  generateMealPlan
}; 