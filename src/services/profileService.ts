import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const profileSchema = z.object({
  mode: z.enum(['exploration', 'execution', 'reflection']),
  activeExperiment: z.string().optional(),
  focusScore: z.number().optional().min(0).max(100),
  preferences: z.record(z.string(), z.any()).optional(),
});

export class ProfileService {
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { profile: true },
    });

    if (!user?.profile) {
      // Create default INTP profile
      const defaultProfile = {
        mode: 'exploration',
        focusScore: 75,
        preferences: {
          nudgeFrequency: 'hourly',
          experimentStyle: 'hypothesis-driven',
        },
      };

      const created = await prisma.user.upsert({
        where: { id: userId },
        update: { profile: defaultProfile },
        create: { id: userId, email: `${userId}@intp.coach`, profile: defaultProfile },
      });

      return created.profile;
    }

    return profileSchema.parse(user.profile);
  }

  async updatePreferences(userId: string, preferences: any) {
    const profile = await this.getProfile(userId);
    const updated = profileSchema.parse({
      ...profile,
      preferences: { ...profile.preferences, ...preferences },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { profile: updated },
    });

    return updated;
  }

  async getContext(userId: string): Promise<string> {
    const profile = await this.getProfile(userId);
    return `User context: mode=${profile.mode}${profile.activeExperiment ? `, experiment="${profile.activeExperiment}"` : ''}`;
  }

  async getNudge(userId: string): Promise<string> {
    const profile = await this.getProfile(userId);
    const nudges = [
      'Time for your next experiment checkpoint?',
      'What\'s the smallest testable change you can make now?',
      'Debugging opportunity detected.',
    ];
    return nudges[Math.floor(Math.random() * nudges.length)];
  }
}

export const profileService = new ProfileService();
