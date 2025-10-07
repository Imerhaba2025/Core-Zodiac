import { Response, NextFunction } from 'express';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';
import { generateAIContent } from '../services/ai.service';

export const generateLandingPage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { businessName, industry, targetAudience, keyFeatures, tone } = req.body;

    const prompt = `Generate a landing page for:
Business: ${businessName}
Industry: ${industry}
Target Audience: ${targetAudience}
Key Features: ${keyFeatures}
Tone: ${tone || 'professional'}

Create a JSON structure with sections including hero, features, benefits, testimonials, and CTA.`;

    const content = await generateAIContent(prompt);

    res.json({
      status: 'success',
      data: { content },
    });
  } catch (error) {
    next(error);
  }
};

export const generateAdContent = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { platform, product, targetAudience, goal, budget } = req.body;

    const prompt = `Generate ad content for ${platform}:
Product/Service: ${product}
Target Audience: ${targetAudience}
Goal: ${goal}
Budget: $${budget}

Create ad copy including headline, description, and call-to-action.`;

    const content = await generateAIContent(prompt);

    res.json({
      status: 'success',
      data: { content },
    });
  } catch (error) {
    next(error);
  }
};

export const generateProductDescription = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { productName, category, features, benefits, targetAudience } = req.body;

    const prompt = `Generate a product description for:
Product: ${productName}
Category: ${category}
Features: ${features}
Benefits: ${benefits}
Target Audience: ${targetAudience}

Create an engaging product description that highlights the key benefits and features.`;

    const content = await generateAIContent(prompt);

    res.json({
      status: 'success',
      data: { content },
    });
  } catch (error) {
    next(error);
  }
};

export const chatWithAI = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { message, context } = req.body;

    const prompt = context
      ? `Context: ${context}\n\nUser: ${message}\n\nAssistant:`
      : message;

    const response = await generateAIContent(prompt);

    res.json({
      status: 'success',
      data: { response },
    });
  } catch (error) {
    next(error);
  }
};
