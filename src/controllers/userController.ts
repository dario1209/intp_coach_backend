import { Request, Response } from 'express';
import { profileService } from '../services/profileService';
import { logger } from '../utils/logger';

export async function getProfile(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const profile = await profileService.getProfile(userId);
    res.json({ profile });
  } catch (error) {
    logger.error('Get profile error:', error);
    throw error;
  }
}

export async function updatePreferences(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const preferences = req.body;
    const profile = await profileService.updatePreferences(userId, preferences);
    res.json({ profile });
  } catch (error) {
    logger.error('Update preferences error:', error);
    throw error;
  }
}
