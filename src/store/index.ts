import { create } from 'zustand';
import { format } from 'date-fns';
import { AppState, Area, TaskInstance, TaskTemplate, User, QuickStats, RecentActivity } from '../types';
import { predefinedTaskTemplates } from '../data/taskTemplates';

interface AppStore extends AppState {
  // Actions
  setUser: (user: User | null) => void;
  setSelectedDate: (date: string) => void;
  setAreas: (areas: Area[]) => void;
  setTasks: (tasks: TaskInstance[]) => void;
  setTemplates: (templates: TaskTemplate[]) => void;
  addTask: (task: TaskInstance) => void;
  updateTask: (taskId: string, updates: Partial<TaskInstance>) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskStatus: (taskId: string) => void;
  generateTasksFromTemplates: (date: string) => void;
  getTasksByAreaAndCategory: (areaId: string, category?: string) => TaskInstance[];
  getTemplatesByArea: (areaId: string) => TaskTemplate[];
  getCategoriesByArea: (areaId: string) => string[];
  downloadTasksAsJSON: (date: string) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  
  // Computed values
  getQuickStats: () => QuickStats;
  getTasksByArea: (areaId: string) => TaskInstance[];
  getTasksByDate: (date: string) => TaskInstance[];
  getRecentActivity: () => RecentActivity[];
}

// Mock data
const mockAreas: Area[] = [
  { id: '1', name: 'A-Frame', icon: 'home', order: 1 },
  { id: '2', name: 'Dorm Rooms', icon: 'bed', order: 2 },
  { id: '3', name: 'Common Area', icon: 'users', order: 3 },
  { id: '4', name: 'Restaurant', icon: 'utensils', order: 4 },
  { id: '5', name: 'Washrooms', icon: 'shower', order: 5 },
];

const mockUser: User = {
  id: '1',
  name: 'edwin',
  email: 'edwin@kampify.com',
  role: 'manager',
  allowedAreas: ['1', '2', '3', '4', '5'],
};

const mockTasks: TaskInstance[] = [
  {
    id: '1',
    areaId: '1',
    title: 'Check heating system',
    description: 'Ensure all heating units are working properly',
    date: format(new Date(), 'yyyy-MM-dd'),
    status: 'pending',
    priority: 'high',
    assigneeId: '1',
    notes: [],
    attachments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    areaId: '2',
    title: 'Clean all rooms',
    description: 'Daily cleaning of dorm rooms',
    date: format(new Date(), 'yyyy-MM-dd'),
    status: 'completed',
    completedAt: new Date().toISOString(),
    priority: 'medium',
    assigneeId: '1',
    notes: [],
    attachments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    areaId: '3',
    title: 'Organize common area',
    description: 'Arrange furniture and clean common spaces',
    date: format(new Date(), 'yyyy-MM-dd'),
    status: 'pending',
    priority: 'low',
    assigneeId: '1',
    notes: [],
    attachments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useAppStore = create<AppStore>((set, get) => ({
  // Initial state
  user: mockUser,
  areas: mockAreas,
  tasks: mockTasks,
  templates: predefinedTaskTemplates,
  users: [mockUser],
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  isOffline: false,
  syncStatus: 'idle',
  isAuthenticated: true,
  token: 'demo-token',

  // Actions
  setUser: (user) => set({ user }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setAreas: (areas) => set({ areas }),
  setTasks: (tasks) => set({ tasks }),
  setTemplates: (templates) => set({ templates }),
  
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, task] 
  })),
  
  updateTask: (taskId, updates) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === taskId ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
    )
  })),
  
  deleteTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== taskId)
  })),
  
  toggleTaskStatus: (taskId) => set((state) => ({
    tasks: state.tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        return {
          ...task,
          status: newStatus,
          completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined,
          updatedAt: new Date().toISOString(),
        };
      }
      return task;
    })
  })),

  // Computed values
  getQuickStats: () => {
    const { tasks, selectedDate } = get();
    const todayTasks = tasks.filter(task => task.date === selectedDate);
    
    return {
      dueToday: todayTasks.length,
      completed: todayTasks.filter(task => task.status === 'completed').length,
      pending: todayTasks.filter(task => task.status === 'pending').length,
    };
  },

  getTasksByArea: (areaId) => {
    const { tasks, selectedDate } = get();
    return tasks.filter(task => task.areaId === areaId && task.date === selectedDate);
  },

  getTasksByDate: (date) => {
    const { tasks } = get();
    return tasks.filter(task => task.date === date);
  },

  getRecentActivity: () => {
    const { tasks, users } = get();
    return tasks
      .filter(task => task.status === 'completed')
      .slice(0, 5)
      .map(task => {
        const user = users.find(u => u.id === task.assigneeId);
        return {
          id: task.id,
          userId: task.assigneeId || '',
          userName: user?.name || 'Unknown',
          userAvatar: user?.avatarUrl,
          action: 'completed',
          taskTitle: task.title,
          timestamp: task.completedAt || task.updatedAt,
        };
      });
  },

  generateTasksFromTemplates: (date) => {
    const { templates } = get();
    
    const newTasks = templates
      .filter(template => template.frequency.type === 'daily')
      .map((template, index) => ({
        id: `${template.id}-${date}-${index}`,
        templateId: template.id,
        areaId: template.areaId,
        title: template.title,
        description: template.description,
        date,
        status: 'pending' as const,
        priority: template.priority,
        assigneeId: template.defaultAssigneeId,
        notes: [],
        attachments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
    
    set(() => ({ tasks: newTasks }));
  },

  downloadTasksAsJSON: (date) => {
    const { tasks } = get();
    const dateTasks = tasks.filter(task => task.date === date);
    const dataStr = JSON.stringify(dateTasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kampify-checklist-${date}.json`;
    link.click();
    URL.revokeObjectURL(url);
  },

  login: async (email, password) => {
    // Mock authentication - replace with real API call
    const users = [
      { ...mockUser, email: 'manager@kampify.com', password: 'password', role: 'manager' as const },
      { id: '2', name: 'Staff User', email: 'staff@kampify.com', password: 'password', role: 'staff' as const, allowedAreas: ['1', '2'] },
    ];
    
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }
    
    const token = `mock-token-${Date.now()}`;
    localStorage.setItem('auth-token', token);
    
    const { password: _, ...userWithoutPassword } = foundUser;
    set({ 
      user: userWithoutPassword, 
      isAuthenticated: true, 
      token 
    });
  },

  logout: () => {
    localStorage.removeItem('auth-token');
    set({ 
      user: null, 
      isAuthenticated: false, 
      token: null 
    });
  },

  getTasksByAreaAndCategory: (areaId, category) => {
    const { tasks, selectedDate, templates } = get();
    const areaTasks = tasks.filter(task => task.areaId === areaId && task.date === selectedDate);
    
    if (!category) return areaTasks;
    
    // Filter by category using template information
    return areaTasks.filter(task => {
      if (task.templateId) {
        const template = templates.find(t => t.id === task.templateId);
        return template?.category === category;
      }
      return false;
    });
  },

  getTemplatesByArea: (areaId) => {
    const { templates } = get();
    return templates.filter(template => template.areaId === areaId);
  },

  getCategoriesByArea: (areaId) => {
    const { templates } = get();
    const areaTemplates = templates.filter(template => template.areaId === areaId);
    const categories = [...new Set(areaTemplates.map(t => t.category).filter(Boolean))];
    return categories as string[];
  },

}));