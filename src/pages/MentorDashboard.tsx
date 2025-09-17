import React from 'react';
import { Calendar, Users, BarChart3, Clock, Star, ArrowRight, Video, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { MetricCard } from '@/components/dashboard/MetricCard';

// Mock data
const upcomingSessions = [
  {
    id: 1,
    menteeName: "Alex Johnson",
    menteeAvatar: "/avatars/alex.jpg",
    topic: "Career Transition to Product Management",
    date: "2024-01-20",
    time: "2:00 PM",
    duration: "60 min",
    status: "confirmed",
    notes: "Looking to transition from engineering to PM role",
    resumeUploaded: true,
    meetingLink: "https://meet.google.com/abc-def-ghi"
  },
  {
    id: 2,
    menteeName: "Maria Santos",
    menteeAvatar: "/avatars/maria.jpg",
    topic: "Technical Interview Preparation",
    date: "2024-01-22",
    time: "10:00 AM",
    duration: "45 min",
    status: "pending",
    notes: "Preparing for senior software engineer interviews",
    resumeUploaded: true,
    meetingLink: null
  },
  {
    id: 3,
    menteeName: "Jordan Kim",
    menteeAvatar: "/avatars/jordan.jpg",
    topic: "Startup Funding Strategy",
    date: "2024-01-25",
    time: "4:00 PM",
    duration: "60 min",
    status: "confirmed",
    notes: "Early-stage startup seeking Series A guidance",
    resumeUploaded: false,
    meetingLink: "https://meet.google.com/xyz-123-456"
  }
];

const recentMentees = [
  {
    id: 1,
    name: "Sarah Wilson",
    avatar: "/avatars/sarah-w.jpg",
    lastSession: "3 days ago",
    progress: "excellent",
    totalSessions: 8
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/avatars/michael.jpg",
    lastSession: "1 week ago",
    progress: "good",
    totalSessions: 5
  },
  {
    id: 3,
    name: "Lisa Thompson",
    avatar: "/avatars/lisa.jpg",
    lastSession: "2 weeks ago",
    progress: "needs_followup",
    totalSessions: 3
  }
];

export const MentorDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <WelcomeBanner 
        userName="Sarah"
        userRole="mentor"
        upcomingSessions={3}
        completedSessions={47}
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="This Week's Sessions"
          value={5}
          change={{ value: 25, type: 'increase' }}
          icon={Calendar}
          variant="gradient"
        />
        <MetricCard
          title="Total Mentees"
          value={23}
          change={{ value: 15, type: 'increase' }}
          icon={Users}
        />
        <MetricCard
          title="Average Rating"
          value="4.9"
          change={{ value: 2, type: 'increase' }}
          icon={Star}
          variant="success"
        />
        <MetricCard
          title="Hours This Month"
          value="18h"
          change={{ value: 20, type: 'increase' }}
          icon={Clock}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2">
          <Card className="dashboard-card-elevated">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">Upcoming Sessions</CardTitle>
              <Button variant="ghost" size="sm">
                Manage Calendar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="p-4 border border-border-subtle rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={session.menteeAvatar} alt={session.menteeName} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {session.menteeName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h4 className="font-medium text-foreground">{session.menteeName}</h4>
                        <p className="text-sm text-foreground-muted">{session.topic}</p>
                      </div>
                    </div>
                    
                    <Badge 
                      variant={session.status === 'confirmed' ? 'default' : 'secondary'}
                      className={session.status === 'confirmed' ? 'badge-success' : 'badge-pending'}
                    >
                      {session.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs text-foreground-muted mb-3">
                    <div>📅 {session.date} at {session.time}</div>
                    <div>⏰ {session.duration}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-md mb-3">
                    <p className="text-sm text-foreground-muted">{session.notes}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className={`h-4 w-4 ${session.resumeUploaded ? 'text-success' : 'text-foreground-muted'}`} />
                      <span className="text-xs text-foreground-muted">
                        {session.resumeUploaded ? 'Resume uploaded' : 'No resume'}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Add Notes
                      </Button>
                      {session.status === 'confirmed' && session.meetingLink && (
                        <Button size="sm" className="btn-primary">
                          <Video className="mr-1 h-3 w-3" />
                          Join
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full btn-primary" size="lg">
                <Clock className="mr-2 h-4 w-4" />
                Update Availability
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <FileText className="mr-2 h-4 w-4" />
                Session Templates
              </Button>
            </CardContent>
          </Card>

          {/* Recent Mentees */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Mentees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMentees.map((mentee) => (
                <div key={mentee.id} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={mentee.avatar} alt={mentee.name} />
                    <AvatarFallback className="bg-muted text-foreground text-xs">
                      {mentee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">{mentee.name}</h4>
                    <p className="text-xs text-foreground-muted">{mentee.lastSession}</p>
                  </div>
                  
                  <div className="text-right">
                    <Badge 
                      variant="secondary"
                      className={
                        mentee.progress === 'excellent' ? 'badge-success' :
                        mentee.progress === 'good' ? 'bg-primary/10 text-primary' :
                        'badge-warning'
                      }
                    >
                      {mentee.progress === 'needs_followup' ? 'Follow up' : mentee.progress}
                    </Badge>
                    <p className="text-xs text-foreground-muted mt-1">{mentee.totalSessions} sessions</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;