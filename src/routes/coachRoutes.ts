import { Router } from 'express';
import { coachChat, coachPlan, coachNudge } from '../controllers/coachController';

const router = Router();

router.post('/chat', coachChat);
router.post('/plan', coachPlan);
router.post('/nudge', coachNudge);

export default router;
