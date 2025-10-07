import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export const generateAIContent = async (prompt: string): Promise<string> => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      // Return mock data if no API key is configured
      return JSON.stringify({
        message: 'AI generation requires OpenAI API key configuration',
        mockData: true,
        prompt: prompt.substring(0, 100),
      });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant specialized in creating marketing content, landing pages, and ad campaigns.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error('Failed to generate AI content');
  }
};

export const generateChatResponse = async (message: string, context?: string): Promise<string> => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return 'Hello! I\'m an AI assistant. To enable full AI capabilities, please configure your OpenAI API key.';
    }

    const messages: any[] = [
      {
        role: 'system',
        content: 'You are a helpful sales assistant. Help customers with their questions about products and services.',
      },
    ];

    if (context) {
      messages.push({
        role: 'system',
        content: `Context: ${context}`,
      });
    }

    messages.push({
      role: 'user',
      content: message,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages,
      temperature: 0.8,
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';
  } catch (error) {
    console.error('Chat AI error:', error);
    return 'I apologize, but I\'m experiencing technical difficulties. Please try again later.';
  }
};
