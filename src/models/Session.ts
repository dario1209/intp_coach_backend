export interface Session {
    id: string;
    userId: string;
    title?: string;
    messages: any[]; // JSON array of messages
    goals: any[]; // JSON array
    createdAt: Date;
    updatedAt: Date;
  }
  