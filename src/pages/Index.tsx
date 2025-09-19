import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import MenteeDashboard from './MenteeDashboard';
import MentorDashboard from './MentorDashboard';
import AdminDashboard from './AdminDashboard';
import FindMentors from './FindMentors';
import MySessions from './MySessions';
import LearningPath from './LearningPath';
import Profile from './Profile'; 
import Settings from './Settings';
import MenteesPage from './MenteesPage';
import AvailabilityPage from './AvailabilityPage';
import AnalyticsPage from './AnalyticsPage';

const Index = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'mentee':
        return <MenteeDashboard />;
      case 'mentor':
        return <MentorDashboard />;
      case 'admin':
      case 'super-admin':
        return <AdminDashboard />;
      default:
        return <MenteeDashboard />;
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout 
        userRole={user?.role || 'mentee'}
        userName={user?.name || 'User'}
        userAvatar={user?.avatar || '/avatars/default.jpg'}
      >
        <Routes>
          <Route path="/" element={renderDashboard()} />
          
          {/* Mentee-specific routes */}
          <Route 
            path="/find-mentors" 
            element={
              <ProtectedRoute allowedRoles={['mentee']}>
                <FindMentors />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/learning-path" 
            element={
              <ProtectedRoute allowedRoles={['mentee']}>
                <LearningPath />
              </ProtectedRoute>
            } 
          />
          
          {/* Mentor-specific routes */}
          <Route 
            path="/my-mentees" 
            element={
              <ProtectedRoute allowedRoles={['mentor']}>
                <MenteesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/availability" 
            element={
              <ProtectedRoute allowedRoles={['mentor']}>
                <AvailabilityPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute allowedRoles={['mentor', 'admin', 'super-admin']}>
                <AnalyticsPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin-specific routes */}
          <Route 
            path="/approvals" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'super-admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sessions" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'super-admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/users" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'super-admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Common routes for all authenticated users */}
          <Route path="/my-sessions" element={<MySessions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Legacy admin route for backward compatibility */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'super-admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Index;
