import { Router } from 'express';
import { getProfile, updatePreferences } from '../controllers/userController';

const router = Router();

router.get('/profile/:userId', getProfile);
router.patch('/preferences/:userId', updatePreferences);

export default router;
