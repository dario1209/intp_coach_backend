import morgan from 'morgan';
import { env } from '../config/env';

const format = env.NODE_ENV === 'development' 
  ? 'dev' 
  : ':method :url :status :res[content-length] - :response-time ms';

export const requestLogger = morgan(format, {
  skip: (req) => req.url === '/health',
});
