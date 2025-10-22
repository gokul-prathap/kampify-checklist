export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'completed' | 'cancelled';
export type UserRole = 'admin' | 'manager' | 'staff';

export interface Area {
  id: string;
  name: string;
  icon: string;
  order: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  allowedAreas: string[];
}

export interface TaskTemplate {
  id: string;
  areaId: string;
  title: string;
  description: string;
  priority: Priority;
  category?: string; // New field for grouping tasks
  defaultAssigneeId?: string;
  frequency: {
    type: 'none' | 'daily' | 'weekly' | 'monthly' | 'custom';
    rule?: string; // cron-like rule
  };
  attachments: Attachment[];
  createdBy: string;
  updatedAt: string;
}

export interface TaskInstance {
  id: string;
  templateId?: string;
  areaId: string;
  title: string;
  description: string;
  date: string; // ISO date
  status: TaskStatus;
  completedAt?: string;
  assigneeId?: string;
  notes: Note[];
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
  priority: Priority;
}

export interface Note {
  id: string;
  taskInstanceId: string;
  text: string;
  authorId: string;
  createdAt: string;
}

export interface Attachment {
  id: string;
  url: string;
  thumbnailUrl?: string;
  uploadedBy: string;
  createdAt: string;
  name: string;
  size: number;
}

export interface QuickStats {
  dueToday: number;
  completed: number;
  pending: number;
}

export interface RecentActivity {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  action: string;
  taskTitle: string;
  timestamp: string;
}

export interface AppState {
  user: User | null;
  areas: Area[];
  tasks: TaskInstance[];
  templates: TaskTemplate[];
  users: User[];
  selectedDate: string;
  isOffline: boolean;
  syncStatus: 'idle' | 'syncing' | 'error';
  isAuthenticated: boolean;
  token: string | null;
}