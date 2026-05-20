const generateMealPlanWithAI = async (preferences: UserPreferences): Promise<MealPlan[]> => {
  // OPTIMIZED PROMPT: Kept short, asks for 1 day, relaxed the strict math constraints.
  const prompt = `
    Generate a simple 1-day sample meal plan based on these parameters:
    Goal: ${preferences.dietaryGoal}
    Calories: ~${preferences.calorieTarget} kcal
    Cuisine: ${preferences.cuisinePreference}
    Condition: ${preferences.healthCondition}
    Allergies: ${preferences.allergies.length > 0 ? preferences.allergies.join(', ') : 'None'}

    Return ONLY a raw JSON array with exactly ONE object matching this structure:
    [
      {
        "day": "Sample Day 1",
        "meals": {
          "breakfast": { "name": "string", "calories": number, "protein": number, "carbs": number, "fats": number },
          "lunch": { "name": "string", "calories": number, "protein": number, "carbs": number, "fats": number },
          "dinner": { "name": "string", "calories": number, "protein": number, "carbs": number, "fats": number },
          "snacks": { "name": "string", "calories": number, "protein": number, "carbs": number, "fats": number }
        }
      }
    ]
  `;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { 
          temperature: 0.2,
          maxOutputTokens: 800 // Safety limit to prevent token drain
        }, 
      }),
    });

    const data = await response.json();
    let jsonString = data.candidates[0].content.parts[0].text;
    
    // Clean up markdown backticks if AI includes them
    jsonString = jsonString.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to generate meal plan:", error);
    throw new Error("Failed to generate meal plan");
  }
};