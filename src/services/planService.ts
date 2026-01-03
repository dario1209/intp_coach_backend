import { z } from 'zod';

const planSchema = z.object({
  experiments: z.array(z.object({
    id: z.string(),
    hypothesis: z.string(),
    steps: z.array(z.string()),
    metrics: z.array(z.string()),
  })),
  timeline: z.string().optional(),
});

export class PlanService {
  parsePlan(rawPlan: string) {
    // Simple regex-based parsing; enhance with LLM structured output later
    const experiments = rawPlan
      .split('\n\n')
      .map((block, idx) => ({
        id: `exp-${idx + 1}`,
        hypothesis: block.split('\n')[0] || 'TBD',
        steps: block.split('\n').slice(1, 4),
        metrics: ['completion rate', 'time saved'],
      }))
      .slice(0, 5);

    return planSchema.parse({
      experiments,
      timeline: 'Week 1-2',
    });
  }
}

export const planService = new PlanService();
