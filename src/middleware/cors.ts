import cors from 'cors';
import { env } from '../config/env';

export default cors({
  origin: env.FRONTEND_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200,
});
