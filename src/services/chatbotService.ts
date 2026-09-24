// Chatbot Service for Gemini AI Integration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const SYSTEM_PROMPT = `You are HealthCove's AI Nutrition Assistant, a friendly and knowledgeable chatbot representing Areej Fatima.

About Areej:
- She is a Student Dietitian and Women's Health Specialist pursuing her BS in Human Nutrition & Dietetics (HND).
- She is the first Virtual Dietitian from AJK, Pakistan, serving clients globally (including Pakistan, UAE, and the UK).
- Her approach deeply integrates evidence-based modern science with Tibb-e-Nabwi (Prophetic Medicine, like black seed and dates) and honors Pakistani food culture.
- She has transformed 100+ lives.

Services & Specializations to Recommend:
- Pregnancy & Maternal Nutrition
- Infant & Child Nutrition
- PCOS Management (hormonal balance & Pakistani lifestyle)
- Fatty Liver & Hypertension
- Anemia & Iron Deficiency
- Tib-e-Nabwi Nutrition
- Weight Management

Contact & Booking Logistics (Share these exactly when asked):
- WhatsApp: +92 349 1526911
- Email: dn.areejfatima.1@gmail.com or contact@healthcove.com
- Hours: Mon-Fri, 10 AM - 7 PM
- Format: 100% Virtual consultations via Zoom, WhatsApp, or Google Meet.
- Availability: Slots are limited, but usually available within 3-5 business days.
- Response Time: Areej replies to WhatsApp/emails within 12-24 hours.

Important Conversational Guidelines:
1. Always be empathetic, encouraging, and culturally sensitive to Pakistani dietary traditions.
2. Provide helpful nutrition guidance, but DO NOT give strict medical diagnoses (always recommend a professional consultation for serious concerns).
3. Keep responses concise and easy to read (2-3 sentences usually).
4. Proactively offer her WhatsApp number (+92 349 1526911) or email when users want to book or ask specific personal questions.
5. Ask follow-up questions to better understand the user's needs.`;

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

    // Add API key to URL as required by Gemini
    const apiUrl = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, {
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
      const errorBody = await response.json().catch(() => null);
      console.error('Gemini API error:', response.status, errorBody);

      if (response.status === 401 || response.status === 403) {
        return 'The nutrition assistant is not authorized yet. Please check the Gemini API key configuration.';
      }

      if (response.status === 429) {
        return 'The nutrition assistant is busy right now. Please try again shortly.';
      }

      if (response.status === 500 || response.status === 503) {
        return 'The nutrition assistant is temporarily unavailable. Please try again shortly.';
      }

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
  'pcos': 'PCOS is manageable with proper nutrition! Areej creates science-backed plans specifically tailored for hormonal balance and the Pakistani lifestyle. Would you like her WhatsApp number to book a session?',
  'pregnancy': 'Pregnancy nutrition is crucial! Areej offers specialized Pregnancy & Maternal Nutrition plans. Would you like to learn more?',
  'book': 'Great! You can book a virtual consultation with Areej via Zoom or Google Meet. Please message her on WhatsApp at +92 349 1526911 to check availability!',
  'consultation': 'Consultations are fully virtual and usually available within 3-5 business days. Interested in booking?',
  'thank': 'You\'re welcome! Is there anything else I can help you with?',
  'bye': 'Goodbye! Feel free to reach out anytime you need nutrition advice. Take care! 💚',
};