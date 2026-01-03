export interface Task {
    id: string;
    sessionId: string;
    title: string;
    status: 'pending' | 'active' | 'completed';
    priority: number;
    completedAt?: Date;
  }
  