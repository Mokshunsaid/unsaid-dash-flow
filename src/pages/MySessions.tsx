import React, { useState } from 'react';
import { Calendar, Clock, Video, FileText, Star, MoreHorizontal, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock session data
const sessions = [
  {
    id: 1,
    mentorName: "Sarah Chen",
    mentorAvatar: "/avatars/sarah.jpg",
    mentorTitle: "Senior Product Manager at Google",
    topic: "Product Management Career Transition",
    date: "2024-01-20",
    time: "2:00 PM",
    duration: 60,
    status: "upcoming",
    type: "career-guidance",
    meetingLink: "https://meet.google.com/abc-def-ghi",
    notes: "Discussing transition from engineering to product management",
    rating: null,
    price: 150,
    sessionNotes: null
  },
  {
    id: 2,
    mentorName: "David Kumar",
    mentorAvatar: "/avatars/david.jpg",
    mentorTitle: "Staff Software Engineer at Meta",
    topic: "System Design Interview Preparation",
    date: "2024-01-22",
    time: "10:00 AM",
    duration: 45,
    status: "upcoming",
    type: "technical-review",
    meetingLink: "https://meet.google.com/xyz-123-456",
    notes: "Focus on distributed systems and scalability",
    rating: null,
    price: 120,
    sessionNotes: null
  },
  {
    id: 3,
    mentorName: "Emily Rodriguez",
    mentorAvatar: "/avatars/emily.jpg",
    mentorTitle: "UX Design Director at Airbnb",
    topic: "Portfolio Review and Career Growth",
    date: "2024-01-15",
    time: "4:00 PM",
    duration: 60,
    status: "completed",
    type: "portfolio-review",
    meetingLink: null,
    notes: "Review design portfolio and discuss senior role opportunities",
    rating: 5,
    price: 180,
    sessionNotes: "Great session! Emily provided excellent feedback on my portfolio structure and highlighted areas for improvement. Key takeaways: focus more on process documentation and impact metrics."
  },
  {
    id: 4,
    mentorName: "Michael Thompson",
    mentorAvatar: "/avatars/michael.jpg",
    mentorTitle: "Data Science Manager at Netflix",
    topic: "Machine Learning Project Review",
    date: "2024-01-10",
    time: "1:00 PM",
    duration: 45,
    status: "completed",
    type: "technical-review",
    meetingLink: null,
    notes: "Review ML model architecture and deployment strategy",
    rating: 4,
    price: 140,
    sessionNotes: "Michael helped me understand the production ML pipeline better. Suggested improvements to model monitoring and A/B testing framework."
  },
  {
    id: 5,
    mentorName: "Alex Johnson",
    mentorAvatar: "/avatars/alex.jpg",
    mentorTitle: "Engineering Manager at Stripe",
    topic: "Leadership Transition Coaching",
    date: "2024-01-08",
    time: "3:00 PM",
    duration: 60,
    status: "cancelled",
    type: "career-guidance",
    meetingLink: null,
    notes: "Discuss transition from IC to management role",
    rating: null,
    price: 160,
    sessionNotes: null
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'upcoming': return 'badge-success';
    case 'completed': return 'bg-success/10 text-success';
    case 'cancelled': return 'badge-warning';
    default: return 'badge-pending';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'career-guidance': return '🎯';
    case 'technical-review': return '💻';
    case 'portfolio-review': return '📁';
    default: return '💬';
  }
};

export const MySessions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filterSessions = (status?: string) => {
    if (!status || status === 'all') return sessions;
    return sessions.filter(session => session.status === status);
  };

  const SessionCard = ({ session }: { session: typeof sessions[0] }) => (
    <Card className="dashboard-card hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={session.mentorAvatar} alt={session.mentorName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {session.mentorName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground">{session.mentorName}</h3>
                <p className="text-sm text-foreground-muted">{session.mentorTitle}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(session.status)}>
                  {session.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {session.status === 'upcoming' && (
                      <>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                      </>
                    )}
                    {session.status === 'completed' && !session.rating && (
                      <DropdownMenuItem>Rate Session</DropdownMenuItem>
                    )}
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="mb-3">
              <h4 className="font-medium text-foreground mb-1 flex items-center gap-2">
                <span>{getTypeIcon(session.type)}</span>
                {session.topic}
              </h4>
              <p className="text-sm text-foreground-muted">{session.notes}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-foreground-muted mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {session.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {session.time} ({session.duration}min)
              </div>
              <div className="font-medium text-foreground">
                ${session.price}
              </div>
              {session.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-warning text-warning" />
                  <span>{session.rating}/5</span>
                </div>
              )}
            </div>
            
            {session.sessionNotes && (
              <div className="bg-muted/50 p-3 rounded-md mb-4">
                <h5 className="text-sm font-medium text-foreground mb-1">Session Notes</h5>
                <p className="text-sm text-foreground-muted">{session.sessionNotes}</p>
              </div>
            )}
            
            <div className="flex gap-2">
              {session.status === 'upcoming' && session.meetingLink && (
                <Button className="btn-primary">
                  <Video className="mr-2 h-4 w-4" />
                  Join Meeting
                </Button>
              )}
              {session.status === 'completed' && !session.rating && (
                <Button variant="outline">
                  <Star className="mr-2 h-4 w-4" />
                  Rate Session
                </Button>
              )}
              {session.status === 'completed' && (
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  View Summary
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Sessions</h1>
          <p className="text-foreground-muted">Track and manage all your mentorship sessions</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="btn-primary">
            <Plus className="mr-2 h-4 w-4" />
            Book New Session
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dashboard-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {sessions.filter(s => s.status === 'upcoming').length}
            </div>
            <div className="text-sm text-foreground-muted">Upcoming</div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {sessions.filter(s => s.status === 'completed').length}
            </div>
            <div className="text-sm text-foreground-muted">Completed</div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {sessions.reduce((total, s) => total + s.duration, 0)}min
            </div>
            <div className="text-sm text-foreground-muted">Total Time</div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {sessions.filter(s => s.rating).reduce((sum, s) => sum + (s.rating || 0), 0) / sessions.filter(s => s.rating).length || 0}
            </div>
            <div className="text-sm text-foreground-muted">Avg Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Sessions List */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Sessions</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-6">
          {filterSessions().map(session => (
            <SessionCard key={session.id} session={session} />
          ))}
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {filterSessions('upcoming').map(session => (
            <SessionCard key={session.id} session={session} />
          ))}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 mt-6">
          {filterSessions('completed').map(session => (
            <SessionCard key={session.id} session={session} />
          ))}
        </TabsContent>
        
        <TabsContent value="cancelled" className="space-y-4 mt-6">
          {filterSessions('cancelled').map(session => (
            <SessionCard key={session.id} session={session} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MySessions;