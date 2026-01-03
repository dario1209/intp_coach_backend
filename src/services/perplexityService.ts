import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { perplexityConfig } from '../config/perplexity';
import { logger } from '../utils/logger';

class PerplexityService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: perplexityConfig.baseURL,
      timeout: perplexityConfig.timeout,
      headers: {
        'Authorization': `Bearer ${perplexityConfig.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async chat(messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>) {
    const config: AxiosRequestConfig = {
      maxRedirects: 0,
      validateStatus: (status) => status < 500,
    };

    try {
      const response = await this.client.post('/chat/completions', {
        model: perplexityConfig.defaultModel,
        messages,
        temperature: 0.7,
        max_tokens: 2000,
        stream: false,
      }, config);

      if (response.status >= 400) {
        logger.error('Perplexity API error response:', response.data);
        throw new Error(`Perplexity API error: ${response.status} - ${JSON.stringify(response.data)}`);
      }

      const choice = response.data.choices?.[0];
      if (!choice) {
        logger.error('No choices in Perplexity response:', response.data);
        throw new Error('No response from Perplexity');
      }

      return {
        content: choice.message.content,
        metadata: {
          model: response.data.model,
          tokens: choice.finish_reason === 'stop' ? choice.message.tokens : 0,
        },
      };
    } catch (error: any) {
      logger.error('Perplexity service error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw new Error('Failed to get response from coach');
    }
  }
}

export const perplexityService = new PerplexityService();
