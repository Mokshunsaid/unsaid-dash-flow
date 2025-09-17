import React from 'react';
import { Calendar, Users, BookOpen, Clock, Star, ArrowRight, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { MetricCard } from '@/components/dashboard/MetricCard';

// Mock data - would come from API
const upcomingSessions = [
  {
    id: 1,
    mentorName: "Sarah Chen",
    mentorAvatar: "/avatars/sarah.jpg",
    expertise: "Product Management",
    date: "2024-01-20",
    time: "2:00 PM",
    duration: "60 min",
    type: "Career Guidance",
    status: "confirmed",
    meetingLink: "https://meet.google.com/abc-def-ghi"
  },
  {
    id: 2,
    mentorName: "David Kumar",
    mentorAvatar: "/avatars/david.jpg",
    expertise: "Software Engineering",
    date: "2024-01-22",
    time: "10:00 AM",
    duration: "45 min",
    type: "Technical Review",
    status: "pending",
    meetingLink: null
  },
  {
    id: 3,
    mentorName: "Emily Rodriguez",
    mentorAvatar: "/avatars/emily.jpg",
    expertise: "UX Design",
    date: "2024-01-25",
    time: "4:00 PM",
    duration: "60 min",
    type: "Portfolio Review",
    status: "confirmed",
    meetingLink: "https://meet.google.com/xyz-123-456"
  }
];

const recentActivity = [
  {
    id: 1,
    type: "session_completed",
    title: "Session with Alex Thompson completed",
    description: "Data Science Career Path discussion",
    timestamp: "2 hours ago",
    rating: 5
  },
  {
    id: 2,
    type: "booking_confirmed",
    title: "New session booked with Sarah Chen",
    description: "Product Management - Career Guidance",
    timestamp: "1 day ago"
  },
  {
    id: 3,
    type: "profile_updated",
    title: "Profile updated",
    description: "Added new skills and updated resume",
    timestamp: "3 days ago"
  }
];

export const MenteeDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <WelcomeBanner 
        userName="Alex"
        userRole="mentee"
        upcomingSessions={3}
        completedSessions={12}
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Upcoming Sessions"
          value={3}
          change={{ value: 50, type: 'increase' }}
          icon={Calendar}
          variant="gradient"
        />
        <MetricCard
          title="Total Sessions"
          value={15}
          change={{ value: 25, type: 'increase' }}
          icon={BookOpen}
        />
        <MetricCard
          title="Hours Learned"
          value="24h"
          change={{ value: 20, type: 'increase' }}
          icon={Clock}
        />
        <MetricCard
          title="Average Rating"
          value="4.8"
          change={{ value: 5, type: 'increase' }}
          icon={Star}
          variant="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2">
          <Card className="dashboard-card-elevated">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">Upcoming Sessions</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border border-border-subtle rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={session.mentorAvatar} alt={session.mentorName} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {session.mentorName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h4 className="font-medium text-foreground">{session.mentorName}</h4>
                      <p className="text-sm text-foreground-muted">{session.expertise}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-foreground-muted">
                          {session.date} at {session.time}
                        </span>
                        <span className="text-xs text-foreground-muted">•</span>
                        <span className="text-xs text-foreground-muted">{session.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={session.status === 'confirmed' ? 'default' : 'secondary'}
                      className={session.status === 'confirmed' ? 'badge-success' : 'badge-pending'}
                    >
                      {session.status}
                    </Badge>
                    
                    {session.status === 'confirmed' && session.meetingLink && (
                      <Button size="sm" className="btn-primary">
                        <Video className="mr-2 h-4 w-4" />
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              {upcomingSessions.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-foreground-muted mx-auto mb-4" />
                  <h3 className="font-medium text-foreground mb-2">No upcoming sessions</h3>
                  <p className="text-foreground-muted mb-4">Book a session with a mentor to get started</p>
                  <Button className="btn-primary">
                    Find Mentors
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full btn-primary" size="lg">
                <Users className="mr-2 h-4 w-4" />
                Find Mentors
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Cohorts
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <Star className="mr-2 h-4 w-4" />
                Rate Last Session
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">{activity.title}</h4>
                    <p className="text-xs text-foreground-muted">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-foreground-muted">{activity.timestamp}</span>
                      {activity.rating && (
                        <>
                          <span className="text-xs text-foreground-muted">•</span>
                          <div className="flex items-center gap-1">
                            {[...Array(activity.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-warning text-warning" />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
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

export default MenteeDashboard;