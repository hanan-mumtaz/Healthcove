import React, { useState } from 'react';
import { Utensils, Brain, Heart, Zap, Download, Share2 } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

interface MealPlan {
  day: string;
  meals: {
    breakfast: { name: string; calories: number; protein: number; carbs: number; fats: number };
    lunch: { name: string; calories: number; protein: number; carbs: number; fats: number };
    dinner: { name: string; calories: number; protein: number; carbs: number; fats: number };
    snacks: { name: string; calories: number; protein: number; carbs: number; fats: number };
  };
}

interface UserPreferences {
  dietaryGoal: string;
  allergies: string[];
  cuisinePreference: string;
  calorieTarget: number;
  healthCondition: string;
}

const SAMPLE_MEAL_PLANS: Record<string, MealPlan> = {
  day1: {
    day: 'Monday',
    meals: {
      breakfast: {
        name: 'Oatmeal with Berries & Almonds',
        calories: 350,
        protein: 12,
        carbs: 45,
        fats: 10,
      },
      lunch: {
        name: 'Grilled Chicken with Brown Rice & Vegetables',
        calories: 550,
        protein: 40,
        carbs: 55,
        fats: 12,
      },
      dinner: {
        name: 'Baked Salmon with Sweet Potato & Broccoli',
        calories: 480,
        protein: 35,
        carbs: 50,
        fats: 15,
      },
      snacks: {
        name: 'Greek Yogurt with Honey',
        calories: 150,
        protein: 15,
        carbs: 20,
        fats: 2,
      },
    },
  },
  day2: {
    day: 'Tuesday',
    meals: {
      breakfast: {
        name: 'Scrambled Eggs with Whole Wheat Toast',
        calories: 320,
        protein: 16,
        carbs: 38,
        fats: 10,
      },
      lunch: {
        name: 'Lentil Soup with Roasted Vegetables',
        calories: 420,
        protein: 18,
        carbs: 60,
        fats: 8,
      },
      dinner: {
        name: 'Turkey Meatballs with Whole Wheat Pasta',
        calories: 500,
        protein: 38,
        carbs: 52,
        fats: 11,
      },
      snacks: {
        name: 'Mixed Nuts & Dried Fruits',
        calories: 180,
        protein: 6,
        carbs: 22,
        fats: 9,
      },
    },
  },
};

const PreferenceForm: React.FC<{
  onSubmit: (prefs: UserPreferences) => void;
  isLoading: boolean;
}> = ({ onSubmit, isLoading }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryGoal: 'weight-loss',
    allergies: [],
    cuisinePreference: 'pakistani',
    calorieTarget: 2000,
    healthCondition: 'none',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Dietary Goal */}
      <div>
        <label className="block text-sm font-bold text-Dg mb-3">What's Your Goal?</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'weight-loss', label: 'Weight Loss', icon: Zap },
            { value: 'weight-gain', label: 'Weight Gain', icon: Heart },
            { value: 'muscle', label: 'Build Muscle', icon: Brain },
            { value: 'maintenance', label: 'Maintenance', icon: Utensils },
          ].map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setPreferences((p) => ({ ...p, dietaryGoal: value }))}
              className={`p-3 rounded-xl border-2 transition-all flex items-center gap-2 ${
                preferences.dietaryGoal === value
                  ? 'border-Mg bg-Mg/10 text-Mg'
                  : 'border-emerald-100 text-slate-600 hover:border-Mg'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Health Condition */}
      <div>
        <label className="block text-sm font-bold text-Dg mb-3">Any Health Concerns?</label>
        <select
          value={preferences.healthCondition}
          onChange={(e) =>
            setPreferences((p) => ({ ...p, healthCondition: e.target.value }))
          }
          className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-Mg/50 text-slate-700"
        >
          <option value="none">No specific concerns</option>
          <option value="pcos">PCOS</option>
          <option value="diabetes">Diabetes</option>
          <option value="pregnancy">Pregnancy</option>
          <option value="lactation">Lactation</option>
          <option value="heart-health">Heart Health</option>
        </select>
      </div>

      {/* Cuisine Preference */}
      <div>
        <label className="block text-sm font-bold text-Dg mb-3">Preferred Cuisine</label>
        <select
          value={preferences.cuisinePreference}
          onChange={(e) =>
            setPreferences((p) => ({ ...p, cuisinePreference: e.target.value }))
          }
          className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-Mg/50 text-slate-700"
        >
          <option value="pakistani">Pakistani</option>
          <option value="mediterranean">Mediterranean</option>
          <option value="asian">Asian</option>
          <option value="western">Western</option>
          <option value="mixed">Mixed Cuisines</option>
        </select>
      </div>

      {/* Calorie Target */}
      <div>
        <label className="block text-sm font-bold text-Dg mb-3">
          Daily Calorie Target: {preferences.calorieTarget} kcal
        </label>
        <input
          type="range"
          min="1200"
          max="3500"
          step="100"
          value={preferences.calorieTarget}
          onChange={(e) =>
            setPreferences((p) => ({ ...p, calorieTarget: parseInt(e.target.value) }))
          }
          className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-Mg"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-2">
          <span>1200 kcal</span>
          <span>3500 kcal</span>
        </div>
      </div>

      {/* Allergies */}
      <div>
        <label className="block text-sm font-bold text-Dg mb-3">Allergies/Restrictions</label>
        <div className="grid grid-cols-2 gap-2">
          {['Gluten', 'Dairy', 'Nuts', 'Shellfish'].map((allergy) => (
            <label key={allergy} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.allergies.includes(allergy.toLowerCase())}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPreferences((p) => ({
                      ...p,
                      allergies: [...p.allergies, allergy.toLowerCase()],
                    }));
                  } else {
                    setPreferences((p) => ({
                      ...p,
                      allergies: p.allergies.filter((a) => a !== allergy.toLowerCase()),
                    }));
                  }
                }}
                className="w-4 h-4 rounded accent-Mg"
              />
              <span className="text-sm text-slate-700">{allergy}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-Mg to-Lg hover:shadow-lg disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all duration-300"
      >
        {isLoading ? 'Generating Your Meal Plan...' : 'Generate My Meal Plan'}
      </button>
    </form>
  );
};

const MealCard: React.FC<{ meal: any; title: string }> = ({ meal, title }) => {
  const totalCalories = meal.calories;
  return (
    <div className="bg-white/75 backdrop-blur-md rounded-xl border border-white/40 p-4 shadow-md hover:shadow-lg transition-all">
      <h4 className="font-bold text-Mg text-sm mb-2">{title}</h4>
      <p className="text-slate-900 font-semibold text-sm mb-3">{meal.name}</p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-emerald-50 rounded-lg p-2">
          <p className="text-slate-600 font-medium">Calories</p>
          <p className="text-Mg font-bold">{meal.calories}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-2">
          <p className="text-slate-600 font-medium">Protein</p>
          <p className="text-blue-600 font-bold">{meal.protein}g</p>
        </div>
        <div className="bg-amber-50 rounded-lg p-2">
          <p className="text-slate-600 font-medium">Carbs</p>
          <p className="text-amber-600 font-bold">{meal.carbs}g</p>
        </div>
        <div className="bg-rose-50 rounded-lg p-2">
          <p className="text-slate-600 font-medium">Fats</p>
          <p className="text-rose-600 font-bold">{meal.fats}g</p>
        </div>
      </div>
    </div>
  );
};

export default function MealPlanner() {
  const [step, setStep] = useState<'form' | 'results'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<UserPreferences | null>(null);

  const handleGeneratePlan = async (preferences: UserPreferences) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedPlan(preferences);
      setStep('results');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative overflow-hidden pt-16">
      <div className="animated-background" />
      <ParticleBackground />
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meal <span className="text-Mg bg-gradient-to-r from-Mg to-Lg bg-clip-text text-transparent">Planner</span>
            </h1>
            <p className="text-lg text-Dg opacity-90 max-w-2xl mx-auto">
              Get a personalized 7-day meal plan tailored to your dietary goals, health conditions, and food preferences. All meals are culturally appropriate and delicious!
            </p>
          </div>

          {step === 'form' ? (
            // Form Step
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/40">
              <PreferenceForm onSubmit={handleGeneratePlan} isLoading={isLoading} />
            </div>
          ) : (
            // Results Step
            <div className="space-y-8">
              {/* Summary */}
              <div className="bg-gradient-to-r from-Mg/10 to-Lg/10 border-l-4 border-Mg rounded-xl p-6">
                <h2 className="text-2xl font-bold text-Dg mb-4">Your Personalized Meal Plan</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/60 rounded-lg p-3">
                    <p className="text-xs text-slate-600 mb-1">Daily Calories</p>
                    <p className="text-xl font-bold text-Mg">{generatedPlan?.calorieTarget}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3">
                    <p className="text-xs text-slate-600 mb-1">Goal</p>
                    <p className="text-lg font-bold text-Dg capitalize">{generatedPlan?.dietaryGoal.replace('-', ' ')}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3">
                    <p className="text-xs text-slate-600 mb-1">Cuisine</p>
                    <p className="text-lg font-bold text-Dg capitalize">{generatedPlan?.cuisinePreference}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3">
                    <p className="text-xs text-slate-600 mb-1">Duration</p>
                    <p className="text-lg font-bold text-Dg">7 Days</p>
                  </div>
                </div>
              </div>

              {/* Meal Days */}
              {Object.values(SAMPLE_MEAL_PLANS).map((dayPlan, idx) => (
                <div key={idx} className="bg-white/75 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 p-6">
                  <h3 className="text-2xl font-bold text-Dg mb-6">{dayPlan.day}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <MealCard meal={dayPlan.meals.breakfast} title="Breakfast" />
                    <MealCard meal={dayPlan.meals.lunch} title="Lunch" />
                    <MealCard meal={dayPlan.meals.dinner} title="Dinner" />
                    <MealCard meal={dayPlan.meals.snacks} title="Snacks" />
                  </div>
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setStep('form')}
                  className="px-8 py-3 bg-white border-2 border-Mg text-Mg font-bold rounded-xl hover:bg-Mg/5 transition-all"
                >
                  Generate Another Plan
                </button>
                <button className="px-8 py-3 bg-gradient-to-r from-Mg to-Lg text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download as PDF
                </button>
                <button className="px-8 py-3 bg-white border-2 border-Mg text-Mg font-bold rounded-xl hover:bg-Mg/5 transition-all flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share Plan
                </button>
              </div>

              {/* CTA to Consultation */}
              <div className="bg-gradient-to-r from-Mg to-Lg rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-3">Want Personalized Guidance?</h3>
                <p className="mb-6 opacity-90">
                  Book a 1-on-1 consultation with Areej to customize your meal plan further and get weekly WhatsApp support!
                </p>
                <button className="px-8 py-3 bg-white text-Mg font-bold rounded-xl hover:bg-slate-100 transition-all">
                  Book Consultation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
