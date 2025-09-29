/**
 * Custom React Hooks for UnsaidTalks Dashboard Data Fetching
 * Uses the API service to fetch data from Postman Mock Server
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  apiService, 
  DashboardStats, 
  Session, 
  Mentee, 
  WeeklyAnalytics, 
  Notification,
  AvailabilitySlot,
  SessionTemplate,
  ApiResponse 
} from '@/services/api';

// Generic hook for API calls
function useApiCall<T>(
  apiCall: () => Promise<T>
): ApiResponse<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const result = await apiCall();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          console.error('API call failed:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [apiCall]); // Include apiCall in dependencies

  return { data, error, loading };
}

// Dashboard Statistics Hook
export function useDashboardStats() {
  return useApiCall<DashboardStats>(() => apiService.getDashboardStats());
}

// Sessions Hooks
export function useUpcomingSessions() {
  const result = useApiCall<{ sessions: Session[] }>(
    () => apiService.getUpcomingSessions()
  );
  
  return {
    sessions: result.data?.sessions || [],
    loading: result.loading,
    error: result.error
  };
}

export function useSessionHistory() {
  const result = useApiCall<{ sessions: Session[] }>(
    () => apiService.getSessionHistory()
  );
  
  return {
    sessions: result.data?.sessions || [],
    loading: result.loading,
    error: result.error
  };
}

export function useSession(sessionId: string | null) {
  const [data, setData] = useState<Session | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided');
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const result = await apiService.getSessionById(sessionId);
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  return { data, error, loading };
}

// Mentees Hooks
export function useRecentMentees() {
  const result = useApiCall<{ mentees: Mentee[] }>(
    () => apiService.getRecentMentees()
  );
  
  return {
    mentees: result.data?.mentees || [],
    loading: result.loading,
    error: result.error
  };
}

export function useAllMentees() {
  const result = useApiCall<{ mentees: Mentee[] }>(
    () => apiService.getAllMentees()
  );
  
  return {
    mentees: result.data?.mentees || [],
    loading: result.loading,
    error: result.error
  };
}

export function useMentee(menteeId: string | null) {
  const [data, setData] = useState<Mentee | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!menteeId) {
      setError('No mentee ID provided');
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const result = await apiService.getMenteeById(menteeId);
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [menteeId]);

  return { data, error, loading };
}

// Analytics Hooks
export function useWeeklyAnalytics() {
  const result = useApiCall<{ weeklyStats: WeeklyAnalytics[] }>(
    () => apiService.getWeeklyAnalytics()
  );
  
  return {
    weeklyStats: result.data?.weeklyStats || [],
    loading: result.loading,
    error: result.error
  };
}

export function useMonthlyAnalytics() {
  const result = useApiCall<{ monthlyStats: WeeklyAnalytics[] }>(
    () => apiService.getMonthlyAnalytics()
  );
  
  return {
    monthlyStats: result.data?.monthlyStats || [],
    loading: result.loading,
    error: result.error
  };
}

export function useRevenueAnalytics() {
  return useApiCall(() => apiService.getRevenueAnalytics());
}

// Notifications Hook
export function useNotifications() {
  const result = useApiCall<{ notifications: Notification[] }>(
    () => apiService.getNotifications()
  );
  
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (result.data?.notifications) {
      setNotifications(result.data.notifications);
    }
  }, [result.data]);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await apiService.markNotificationAsRead(notificationId);
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await apiService.markAllNotificationsAsRead();
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  }, []);

  return {
    notifications,
    loading: result.loading,
    error: result.error,
    markAsRead,
    markAllAsRead,
    unreadCount: notifications.filter(n => !n.read).length
  };
}

// Availability Hook
export function useAvailability() {
  const result = useApiCall<{ availabilitySlots: AvailabilitySlot[] }>(
    () => apiService.getAvailability()
  );
  
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);

  useEffect(() => {
    if (result.data?.availabilitySlots) {
      setAvailability(result.data.availabilitySlots);
    }
  }, [result.data]);

  const updateAvailability = useCallback(async (newAvailability: AvailabilitySlot[]) => {
    try {
      await apiService.updateAvailability(newAvailability);
      setAvailability(newAvailability);
      return true;
    } catch (error) {
      console.error('Failed to update availability:', error);
      return false;
    }
  }, []);

  return {
    availability,
    loading: result.loading,
    error: result.error,
    updateAvailability
  };
}

// Session Templates Hook
export function useSessionTemplates() {
  const result = useApiCall<{ templates: SessionTemplate[] }>(
    () => apiService.getSessionTemplates()
  );
  
  const [templates, setTemplates] = useState<SessionTemplate[]>([]);

  useEffect(() => {
    if (result.data?.templates) {
      setTemplates(result.data.templates);
    }
  }, [result.data]);

  const createTemplate = useCallback(async (template: Omit<SessionTemplate, 'id'>) => {
    try {
      const newTemplate = await apiService.createSessionTemplate(template);
      setTemplates(prev => [...prev, newTemplate]);
      return newTemplate;
    } catch (error) {
      console.error('Failed to create template:', error);
      throw error;
    }
  }, []);

  const updateTemplate = useCallback(async (templateId: string, updates: Partial<SessionTemplate>) => {
    try {
      const updatedTemplate = await apiService.updateSessionTemplate(templateId, updates);
      setTemplates(prev => 
        prev.map(template => 
          template.id === templateId ? updatedTemplate : template
        )
      );
      return updatedTemplate;
    } catch (error) {
      console.error('Failed to update template:', error);
      throw error;
    }
  }, []);

  const deleteTemplate = useCallback(async (templateId: string) => {
    try {
      await apiService.deleteSessionTemplate(templateId);
      setTemplates(prev => prev.filter(template => template.id !== templateId));
      return true;
    } catch (error) {
      console.error('Failed to delete template:', error);
      return false;
    }
  }, []);

  return {
    templates,
    loading: result.loading,
    error: result.error,
    createTemplate,
    updateTemplate,
    deleteTemplate
  };
}

// Mentor Profile Hook
export function useMentorProfile() {
  const result = useApiCall(() => apiService.getMentorProfile());

  const updateProfile = useCallback(async (updates: Parameters<typeof apiService.updateMentorProfile>[0]) => {
    try {
      await apiService.updateMentorProfile(updates);
      // Trigger a refetch by updating dependencies
      return true;
    } catch (error) {
      console.error('Failed to update profile:', error);
      return false;
    }
  }, []);

  return {
    profile: result.data,
    loading: result.loading,
    error: result.error,
    updateProfile
  };
}

// Session Management Hook with mutations
export function useSessionManagement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const updateSession = useCallback(async (sessionId: string, updates: Partial<Session>) => {
    setLoading(true);
    setError(undefined);
    try {
      const result = await apiService.updateSession(sessionId, updates);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update session';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelSession = useCallback(async (sessionId: string, reason: string) => {
    setLoading(true);
    setError(undefined);
    try {
      const result = await apiService.cancelSession(sessionId, reason);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel session';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addMenteeNote = useCallback(async (menteeId: string, note: string) => {
    setLoading(true);
    setError(undefined);
    try {
      const result = await apiService.addMenteeNote(menteeId, note);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add note';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    updateSession,
    cancelSession,
    addMenteeNote
  };
}

// Polling hook for real-time updates
export function usePolling<T>(
  apiCall: () => Promise<T>,
  interval: number = 30000, // 30 seconds default
  enabled: boolean = true
) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!enabled) return;

    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const result = await apiCall();
        if (isMounted) {
          setData(result);
          setError(undefined);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          timeoutId = setTimeout(fetchData, interval);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [apiCall, interval, enabled]);

  return { data, error, loading };
}