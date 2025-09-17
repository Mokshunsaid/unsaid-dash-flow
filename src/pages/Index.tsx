import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import MenteeDashboard from './MenteeDashboard';
import MentorDashboard from './MentorDashboard';
import AdminDashboard from './AdminDashboard';
import FindMentors from './FindMentors';
import MySessions from './MySessions';
import LearningPath from './LearningPath';
import Profile from './Profile'; 
import Settings from './Settings';

// Mock user data - in real app this would come from auth context
const mockUser: {
  name: string;
  role: 'mentee' | 'mentor' | 'admin' | 'super-admin';
  avatar: string;
} = {
  name: "Alex Johnson",
  role: "mentee", // Change this to test different roles: 'mentee' | 'mentor' | 'admin' | 'super-admin'
  avatar: "/avatars/alex.jpg"
};

const Index = () => {
  // In a real app, this would come from your auth context/state management
  const [user] = useState(mockUser);

  const renderDashboard = () => {
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
    <DashboardLayout 
      userRole={user.role}
      userName={user.name}
      userAvatar={user.avatar}
    >
      <Routes>
        <Route path="/" element={renderDashboard()} />
        <Route path="/find-mentors" element={<FindMentors />} />
        <Route path="/my-sessions" element={<MySessions />} />
        <Route path="/learning-path" element={<LearningPath />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Index;
