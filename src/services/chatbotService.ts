// Chatbot Service for Gemini AI Integration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const SYSTEM_PROMPT = `You are HealthCove's AI Nutrition Assistant, a friendly and knowledgeable dietitian chatbot created by Areej Fatima. 

Your role is to:
1. Provide personalized nutrition guidance based on the user's dietary preferences and health goals
2. Answer questions about nutrition, healthy eating, and wellness
3. Help with dietary concerns like PCOS, pregnancy nutrition, weight management, and women's health
4. Recommend products or services from HealthCove when relevant
5. Encourage users to book consultations for personalized meal plans
6. Be culturally sensitive and supportive of Pakistani dietary traditions

Important Guidelines:
- Always be empathetic and encouraging
- Avoid giving strict medical diagnoses - recommend professional consultation for serious health concerns
- Suggest booking a 1-on-1 consultation with Areej for personalized meal planning
- Keep responses concise (2-3 sentences usually)
- Ask follow-up questions to better understand the user's needs
- Reference HealthCove's services when relevant

Available Services you can mention:
- Pregnancy Nutrition Program
- PCOS & Women's Health
- Maternal and Child Nutrition
- Prophetic Medicine (Tibb)
- 1-on-1 Virtual Coaching via WhatsApp
- Weight Management Programs`;

interface GeminiMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export const sendMessageToChatbot = async (userMessage: string, conversationHistory: GeminiMessage[] = []): Promise<string> => {
  if (!GEMINI_API_KEY) {
    return 'API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.';
  }

  try {
    // Build conversation with system context
    const messages: GeminiMessage[] = [
      {
        role: 'user',
        parts: [{ text: SYSTEM_PROMPT }],
      },
      {
        role: 'model',
        parts: [{ text: 'I understand. I am HealthCove\'s AI Nutrition Assistant. How can I help you today with your nutrition and wellness journey?' }],
      },
      ...conversationHistory,
      {
        role: 'user',
        parts: [{ text: userMessage }],
      },
    ];

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Gemini API error:', error);
      return 'Sorry, I encountered an error. Please try again.';
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    return 'I could not generate a response. Please try again.';
  } catch (error: any) {
    console.error('Chatbot error:', error);
    if (error.name === 'AbortError') {
      return 'Request took too long. Please try again.';
    }
    return 'Sorry, I encountered an error. Please try again later.';
  }
};

// Pre-defined FAQ responses for quick replies (fallback)
export const faqResponses: Record<string, string> = {
  'hello': 'Hello! 👋 I\'m HealthCove\'s nutrition assistant. How can I help you with your nutrition journey today?',
  'hi': 'Hi there! Welcome to HealthCove. What would you like to know about nutrition or our services?',
  'help': 'I can help you with: nutrition guidance, diet plans, health concerns (PCOS, pregnancy, weight loss), recipe ideas, and booking consultations. What interests you?',
  'pcos': 'PCOS is manageable with proper nutrition! I recommend our "Women\'s Health and PCOS" program which includes insulin sensitivity plans and hormonal regulation. Would you like to know more?',
  'pregnancy': 'Pregnancy nutrition is crucial! Our "Pregnancy Nutrition Program" provides trimester-specific plans and fetal growth support. Would you like to learn more?',
  'book': 'Great! You can book a 1-on-1 consultation with Areej. Would you like to schedule a call? I can help you get started!',
  'consultation': 'Our consultations include personalized meal planning, WhatsApp support, and progress tracking. Interested in booking?',
  'thank': 'You\'re welcome! Is there anything else I can help you with?',
  'bye': 'Goodbye! Feel free to reach out anytime you need nutrition advice. Take care! 💚',
};
