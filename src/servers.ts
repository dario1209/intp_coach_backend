import express, { Express, Request, Response, NextFunction } from 'express';
import corsMiddleware from './middleware/cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import coachRoutes from './routes/coachRoutes';
import userRoutes from './routes/userRoutes';
import { logger } from './utils/logger';

const app: Express = express();

// Security & standard middleware
app.use(corsMiddleware);
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(requestLogger);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/coach', coachRoutes);
app.use('/user', userRoutes);

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// Global error handler (must be last)
app.use(errorHandler);

export default app;
