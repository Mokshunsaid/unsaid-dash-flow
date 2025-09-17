import React from 'react';
import { 
  CheckSquare, 
  Calendar, 
  Users, 
  TrendingUp, 
  Clock, 
  Star,
  ArrowRight,
  Eye,
  Check,
  X,
  AlertCircle,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { MetricCard } from '@/components/dashboard/MetricCard';

// Mock data
const pendingApprovals = [
  {
    id: 1,
    type: 'session_booking',
    menteeName: "Alex Johnson",
    mentorName: "Sarah Chen",
    menteeAvatar: "/avatars/alex.jpg",
    mentorAvatar: "/avatars/sarah.jpg",
    topic: "Career Transition to Product Management",
    date: "2024-01-20",
    time: "2:00 PM",
    duration: "60 min",
    priority: "high",
    submittedAt: "2 hours ago",
    paymentStatus: "completed"
  },
  {
    id: 2,
    type: 'mentor_verification',
    mentorName: "David Kumar",
    mentorAvatar: "/avatars/david.jpg",
    expertise: "Software Engineering",
    experience: "8 years at Google, Meta",
    priority: "medium",
    submittedAt: "5 hours ago",
    documentsUploaded: true
  },
  {
    id: 3,
    type: 'session_booking',
    menteeName: "Maria Santos",
    mentorName: "Emily Rodriguez",
    menteeAvatar: "/avatars/maria.jpg",
    mentorAvatar: "/avatars/emily.jpg",
    topic: "UX Portfolio Review",
    date: "2024-01-22",
    time: "10:00 AM",
    duration: "45 min",
    priority: "low",
    submittedAt: "1 day ago",
    paymentStatus: "pending"
  }
];

const recentActivity = [
  {
    id: 1,
    type: "approval",
    description: "Session approved: Alex Thompson ↔ Sarah Chen",
    timestamp: "15 minutes ago",
    user: "Admin"
  },
  {
    id: 2,
    type: "new_user",
    description: "New mentor registered: Michael Rodriguez",
    timestamp: "1 hour ago",
    user: "System"
  },
  {
    id: 3,
    type: "session_completed",
    description: "Session completed: Jordan Kim ↔ David Kumar",
    timestamp: "2 hours ago",
    user: "System"
  },
  {
    id: 4,
    type: "payment",
    description: "Payment processed: $150 for premium session",
    timestamp: "3 hours ago",
    user: "System"
  }
];

export const AdminDashboard: React.FC = () => {
  const handleApprove = (id: number) => {
    console.log('Approving:', id);
    // Handle approval logic
  };

  const handleReject = (id: number) => {
    console.log('Rejecting:', id);
    // Handle rejection logic
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <WelcomeBanner 
        userName="Admin"
        userRole="admin"
        upcomingSessions={12}
        completedSessions={25}
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Pending Approvals"
          value={12}
          change={{ value: 20, type: 'increase' }}
          icon={CheckSquare}
          variant="warning"
          onClick={() => console.log('Navigate to approvals')}
        />
        <MetricCard
          title="Active Sessions Today"
          value={25}
          change={{ value: 15, type: 'increase' }}
          icon={Calendar}
          variant="gradient"
        />
        <MetricCard
          title="Total Users"
          value="1,247"
          change={{ value: 8, type: 'increase' }}
          icon={Users}
        />
        <MetricCard
          title="Platform Rating"
          value="4.8"
          change={{ value: 3, type: 'increase' }}
          icon={Star}
          variant="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <div className="lg:col-span-2">
          <Card className="dashboard-card-elevated">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-warning" />
                Pending Approvals
                <Badge className="badge-warning">
                  {pendingApprovals.length}
                </Badge>
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="p-4 border border-border-subtle rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {item.type === 'session_booking' ? (
                          <div className="flex -space-x-2">
                            <Avatar className="h-8 w-8 border-2 border-background">
                              <AvatarImage src={item.menteeAvatar} alt={item.menteeName} />
                              <AvatarFallback className="text-xs">
                                {item.menteeName?.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <Avatar className="h-8 w-8 border-2 border-background">
                              <AvatarImage src={item.mentorAvatar} alt={item.mentorName} />
                              <AvatarFallback className="text-xs">
                                {item.mentorName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        ) : (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={item.mentorAvatar} alt={item.mentorName} />
                            <AvatarFallback className="text-xs">
                              {item.mentorName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground">
                            {item.type === 'session_booking' 
                            ? `Session: ${item.menteeName} ↔ ${item.mentorName}`
                              : `Mentor Verification: ${item.mentorName}`
                            }
                          </h4>
                          <Badge 
                            variant="secondary"
                            className={
                              item.priority === 'high' ? 'badge-warning' :
                              item.priority === 'medium' ? 'bg-primary/10 text-primary' :
                              'badge-pending'
                            }
                          >
                            {item.priority}
                          </Badge>
                        </div>
                        
                        {item.type === 'session_booking' ? (
                          <p className="text-sm text-foreground-muted">{item.topic}</p>
                        ) : (
                          <p className="text-sm text-foreground-muted">{item.expertise} • {item.experience}</p>
                        )}
                        
                        <div className="flex items-center gap-4 mt-1 text-xs text-foreground-muted">
                          <span>⏰ {item.submittedAt}</span>
                          {item.type === 'session_booking' && (
                            <>
                              <span>📅 {item.date} at {item.time}</span>
                              <span className={`px-2 py-1 rounded-full ${
                                item.paymentStatus === 'completed' 
                                  ? 'bg-success/10 text-success' 
                                  : 'bg-warning/10 text-warning'
                              }`}>
                                Payment: {item.paymentStatus}
                              </span>
                            </>
                          )}
                          {item.type === 'mentor_verification' && item.documentsUploaded && (
                            <span className="bg-success/10 text-success px-2 py-1 rounded-full">
                              Documents uploaded
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm">
                      <Eye className="mr-1 h-3 w-3" />
                      View Details
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReject(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="mr-1 h-3 w-3" />
                        Reject
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleApprove(item.id)}
                        className="btn-primary"
                      >
                        <Check className="mr-1 h-3 w-3" />
                        Approve
                      </Button>
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
                <UserCheck className="mr-2 h-4 w-4" />
                Bulk Approve
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-warning" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-md">
                <p className="text-sm font-medium text-warning">High approval queue</p>
                <p className="text-xs text-foreground-muted">12 items pending for &gt;24h</p>
              </div>
              <div className="p-3 bg-success/10 border border-success/20 rounded-md">
                <p className="text-sm font-medium text-success">System healthy</p>
                <p className="text-xs text-foreground-muted">All services operational</p>
              </div>
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
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === 'approval' ? 'bg-success' :
                    activity.type === 'new_user' ? 'bg-primary' :
                    activity.type === 'payment' ? 'bg-secondary' :
                    'bg-foreground-muted'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-foreground-muted">{activity.timestamp}</span>
                      <span className="text-xs text-foreground-muted">•</span>
                      <span className="text-xs text-foreground-muted">{activity.user}</span>
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

export default AdminDashboard;