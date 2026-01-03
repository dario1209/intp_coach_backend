import { Request, Response } from 'express';
import { z } from 'zod';
import { perplexityService } from '../services/perplexityService';
import { profileService } from '../services/profileService';
import { planService } from '../services/planService';
import { logger } from '../utils/logger';
import { intpPrompts } from '../utils/promptTemplates';

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().max(4000),
  })),
  userId: z.string().optional(),
});

const planSchema = z.object({
  goal: z.string().max(500),
  userId: z.string().optional(),
});

export async function coachChat(req: Request, res: Response, next: any) {
  try {
    const { messages, userId } = chatSchema.parse(req.body);

    // Get user context if available
    const userContext = userId ? await profileService.getContext(userId) : '';

    // Inject INTP system prompt as first user message (Perplexity doesn't support system role)
    const systemMessage = intpPrompts.system + (userContext ? '\n\n' + userContext : '');
    const fullMessages = [
      { role: 'user' as const, content: systemMessage },
      { role: 'assistant' as const, content: 'Understood. I\'ll coach you with this INTP-focused approach.' },
      ...messages,
    ];

    const response = await perplexityService.chat(fullMessages);

    logger.info(`Coach chat completed for user ${userId || 'anonymous'}`);

    res.json({
      response: response.content,
      metadata: response.metadata,
    });
  } catch (error) {
    logger.error('Coach chat error:', error);
    next(error);
  }
}

export async function coachPlan(req: Request, res: Response, next: any) {
  try {
    const { goal, userId } = planSchema.parse(req.body);

    const prompt = `${intpPrompts.system}\n\nBreak down this goal into 3-5 INTP-friendly experiments:\n\n${goal}`;

    const response = await perplexityService.chat([{ role: 'user' as const, content: prompt }]);

    // Parse structured plan
    const plan = planService.parsePlan(response.content);

    res.json({ plan });
  } catch (error) {
    logger.error('Coach plan error:', error);
    next(error);
  }
}

export async function coachNudge(req: Request, res: Response, next: any) {
  try {
    const { userId } = z.object({ userId: z.string() }).parse(req.body);

    const nudge = await profileService.getNudge(userId);

    res.json({ nudge });
  } catch (error) {
    logger.error('Coach nudge error:', error);
    next(error);
  }
}
