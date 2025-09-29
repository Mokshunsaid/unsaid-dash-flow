/**
 * API Service for UnsaidTalks Dashboard
 * Handles communication with Postman Mock Server
 */

// Types for API responses
export interface DashboardStats {
  totalMentees: number;
  activeSessions: number;
  completedSessions: number;
  upcomingMeetings: number;
  averageRating: number;
  responseRate: string;
  monthlyEarnings: number;
  weeklyEarnings: number;
  totalHours: number;
}

export interface Session {
  id: string;
  menteeId: string;
  menteeName: string;
  menteeAvatar: string;
  topic: string;
  date: string;
  time: string;
  duration: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes: string;
  resumeUploaded: boolean;
  meetingLink: string | null;
  sessionType: string;
  priority: 'high' | 'medium' | 'low';
  menteeLevel: 'beginner' | 'intermediate' | 'advanced';
  preparationNeeded: string[];
  price: number;
}

export interface Mentee {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  lastSession: string;
  progress: 'excellent' | 'good' | 'needs_followup';
  totalSessions: number;
  totalSpent: number;
  goals: string[];
  nextSession: string | null;
  completionRate: number;
  rating: number;
  notes: string;
}

export interface WeeklyAnalytics {
  day: string;
  sessions: number;
  revenue: number;
  hours: number;
}

export interface Notification {
  id: string;
  type: 'session_reminder' | 'new_mentee' | 'payment' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface AvailabilitySlot {
  day: string;
  slots: string[];
}

export interface SessionTemplate {
  id: string;
  name: string;
  duration: string;
  description: string;
  agenda: string[];
  price: number;
  usageCount?: number;
  totalEarnings?: number;
}

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-mock-server-id.mock.pstmn.io';
const API_KEY = import.meta.env.VITE_API_KEY || '';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(`API Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Dashboard Statistics
  async getDashboardStats(): Promise<DashboardStats> {
    return this.request<DashboardStats>('/api/dashboard/mentor/stats');
  }

  // Sessions Management
  async getUpcomingSessions(): Promise<{ sessions: Session[] }> {
    return this.request<{ sessions: Session[] }>('/api/sessions/upcoming');
  }

  async getSessionHistory(): Promise<{ sessions: Session[] }> {
    return this.request<{ sessions: Session[] }>('/api/sessions/history');
  }

  async getSessionById(sessionId: string): Promise<Session> {
    return this.request<Session>(`/api/sessions/${sessionId}`);
  }

  async updateSession(sessionId: string, updates: Partial<Session>): Promise<Session> {
    return this.request<Session>(`/api/sessions/${sessionId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async cancelSession(sessionId: string, reason: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/api/sessions/${sessionId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // Mentees Management
  async getRecentMentees(): Promise<{ mentees: Mentee[] }> {
    return this.request<{ mentees: Mentee[] }>('/api/mentees/recent');
  }

  async getAllMentees(): Promise<{ mentees: Mentee[] }> {
    return this.request<{ mentees: Mentee[] }>('/api/mentees');
  }

  async getMenteeById(menteeId: string): Promise<Mentee> {
    return this.request<Mentee>(`/api/mentees/${menteeId}`);
  }

  async addMenteeNote(menteeId: string, note: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/api/mentees/${menteeId}/notes`, {
      method: 'POST',
      body: JSON.stringify({ note }),
    });
  }

  // Analytics
  async getWeeklyAnalytics(): Promise<{ weeklyStats: WeeklyAnalytics[] }> {
    return this.request<{ weeklyStats: WeeklyAnalytics[] }>('/api/analytics/weekly');
  }

  async getMonthlyAnalytics(): Promise<{ monthlyStats: WeeklyAnalytics[] }> {
    return this.request<{ monthlyStats: WeeklyAnalytics[] }>('/api/analytics/monthly');
  }

  async getRevenueAnalytics(): Promise<{
    thisMonth: number;
    lastMonth: number;
    thisWeek: number;
    pendingPayments: number;
    yearToDate: number;
    averageSessionRate: number;
    totalHours: number;
    topEarningMonth: string;
  }> {
    return this.request('/api/analytics/revenue');
  }

  // Notifications
  async getNotifications(): Promise<{ notifications: Notification[] }> {
    return this.request<{ notifications: Notification[] }>('/api/notifications');
  }

  async markNotificationAsRead(notificationId: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/api/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  async markAllNotificationsAsRead(): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>('/api/notifications/read-all', {
      method: 'PUT',
    });
  }

  // Availability Management
  async getAvailability(): Promise<{ availabilitySlots: AvailabilitySlot[] }> {
    return this.request<{ availabilitySlots: AvailabilitySlot[] }>('/api/availability');
  }

  async updateAvailability(availability: AvailabilitySlot[]): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>('/api/availability', {
      method: 'PUT',
      body: JSON.stringify({ availabilitySlots: availability }),
    });
  }

  // Session Templates
  async getSessionTemplates(): Promise<{ templates: SessionTemplate[] }> {
    return this.request<{ templates: SessionTemplate[] }>('/api/templates');
  }

  async createSessionTemplate(template: Omit<SessionTemplate, 'id'>): Promise<SessionTemplate> {
    return this.request<SessionTemplate>('/api/templates', {
      method: 'POST',
      body: JSON.stringify(template),
    });
  }

  async updateSessionTemplate(templateId: string, updates: Partial<SessionTemplate>): Promise<SessionTemplate> {
    return this.request<SessionTemplate>(`/api/templates/${templateId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteSessionTemplate(templateId: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/api/templates/${templateId}`, {
      method: 'DELETE',
    });
  }

  // Profile Management
  async getMentorProfile(): Promise<{
    id: string;
    name: string;
    email: string;
    avatar: string;
    bio: string;
    expertise: string[];
    experience: string;
    languages: string[];
    timezone: string;
    hourlyRate: number;
  }> {
    return this.request('/api/profile');
  }

  async updateMentorProfile(updates: Partial<{
    name: string;
    email: string;
    avatar: string;
    bio: string;
    expertise: string[];
    experience: string;
    languages: string[];
    timezone: string;
    hourlyRate: number;
  }>): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Error handling utility
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Response wrapper for better error handling
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading: boolean;
}