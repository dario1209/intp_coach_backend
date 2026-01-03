import cors from 'cors';
import { env } from '../config/env';

// Remove trailing slash from origin if present
const origin = env.FRONTEND_ORIGIN.replace(/\/$/, '');

export default cors({
  origin,
  credentials: true,
  optionsSuccessStatus: 200,
});
