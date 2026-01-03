import { env } from './env';

export const perplexityConfig = {
  baseURL: env.PERPLEXITY_BASE_URL,
  apiKey: env.PERPLEXITY_API_KEY,
  defaultModel: env.PERPLEXITY_MODEL,
  timeout: 60000, // 60s
  maxRetries: 2,
} as const;
