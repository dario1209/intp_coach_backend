import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  
  PERPLEXITY_API_KEY: z.string().min(1),
  PERPLEXITY_BASE_URL: z.string().url().default('https://api.perplexity.ai'),
  PERPLEXITY_MODEL: z.string().default('sonar-pro'),
  
  DATABASE_URL: z.string().url(),
  FRONTEND_ORIGIN: z.string().url().transform(url => url.replace(/\/$/, '')),
  
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

export const env = envSchema.parse(process.env);

export type Env = typeof env;
