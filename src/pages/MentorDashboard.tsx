import React, { useState } from 'react';
import { 
  Calendar, Users, BarChart3, Clock, Star, ArrowRight, Video, FileText, 
  DollarSign, TrendingUp, MessageSquare, Plus, Filter, Search, 
  Edit3, Phone, Mail, Eye, CheckCircle, AlertCircle, Settings,
  Download, Upload, Bell, BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { MetricCard } from '@/components/dashboard/MetricCard';

// Mock data - Enhanced with more comprehensive information
const upcomingSessions = [
  {
    id: 1,
    menteeName: "Alex Johnson",
    menteeAvatar: "/avatars/alex.jpg",
    topic: "Career Transition to Product Management",
    date: "2025-09-20",
    time: "2:00 PM",
    duration: "60 min",
    status: "confirmed",
    notes: "Looking to transition from engineering to PM role. Has 5 years of software development experience.",
    resumeUploaded: true,
    meetingLink: "https://meet.google.com/abc-def-ghi",
    sessionType: "career_guidance",
    priority: "high",
    menteeLevel: "intermediate",
    preparationNeeded: ["Review resume", "Prepare PM transition roadmap"],
    price: 150
  },
  {
    id: 2,
    menteeName: "Maria Santos",
    menteeAvatar: "/avatars/maria.jpg",
    topic: "Technical Interview Preparation",
    date: "2025-09-22",
    time: "10:00 AM",
    duration: "45 min",
    status: "pending",
    notes: "Preparing for senior software engineer interviews at FAANG companies",
    resumeUploaded: true,
    meetingLink: null,
    sessionType: "interview_prep",
    priority: "medium",
    menteeLevel: "advanced",
    preparationNeeded: ["System design topics", "Coding problems"],
    price: 120
  },
  {
    id: 3,
    menteeName: "Jordan Kim",
    menteeAvatar: "/avatars/jordan.jpg",
    topic: "Startup Funding Strategy",
    date: "2025-09-25",
    time: "4:00 PM",
    duration: "60 min",
    status: "confirmed",
    notes: "Early-stage startup seeking Series A guidance. Built MVP with 10K users.",
    resumeUploaded: false,
    meetingLink: "https://meet.google.com/xyz-123-456",
    sessionType: "entrepreneurship",
    priority: "high",
    menteeLevel: "beginner",
    preparationNeeded: ["Review pitch deck", "Market analysis"],
    price: 200
  }
];

const recentMentees = [
  {
    id: 1,
    name: "Sarah Wilson",
    avatar: "/avatars/sarah-w.jpg",
    email: "sarah.wilson@email.com",
    phone: "+1 (555) 123-4567",
    lastSession: "3 days ago",
    progress: "excellent",
    totalSessions: 8,
    totalSpent: 1200,
    goals: ["Product Management Career", "Leadership Skills"],
    nextSession: "2025-09-21",
    completionRate: 95,
    rating: 5.0,
    notes: "Making excellent progress on PM transition. Very engaged and prepared."
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/avatars/michael.jpg",
    email: "m.chen@email.com",
    phone: "+1 (555) 987-6543",
    lastSession: "1 week ago",
    progress: "good",
    totalSessions: 5,
    totalSpent: 750,
    goals: ["System Design", "Technical Leadership"],
    nextSession: "2025-09-23",
    completionRate: 80,
    rating: 4.8,
    notes: "Good progress on system design concepts. Needs more practice with distributed systems."
  },
  {
    id: 3,
    name: "Lisa Thompson",
    avatar: "/avatars/lisa.jpg",
    email: "lisa.t@email.com",
    phone: "+1 (555) 456-7890",
    lastSession: "2 weeks ago",
    progress: "needs_followup",
    totalSessions: 3,
    totalSpent: 450,
    goals: ["Career Change", "Skill Development"],
    nextSession: null,
    completionRate: 60,
    rating: 4.5,
    notes: "Missed last session. Need to follow up and reschedule. Seems overwhelmed with career change."
  }
];

const revenueData = {
  thisMonth: 4250,
  lastMonth: 3800,
  thisWeek: 980,
  pendingPayments: 750,
  yearToDate: 38500,
  averageSessionRate: 165,
  totalHours: 284,
  topEarningMonth: "August 2025"
};

const availabilitySlots = [
  { day: "Monday", slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] },
  { day: "Tuesday", slots: ["10:00 AM", "1:00 PM", "3:00 PM"] },
  { day: "Wednesday", slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"] },
  { day: "Thursday", slots: ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"] },
  { day: "Friday", slots: ["9:00 AM", "11:00 AM", "2:00 PM"] },
  { day: "Saturday", slots: ["10:00 AM", "2:00 PM"] },
  { day: "Sunday", slots: [] }
];

const sessionTemplates = [
  {
    id: 1,
    name: "Career Transition Session",
    duration: "60 min",
    description: "Comprehensive career transition planning and roadmap creation",
    agenda: ["Current role assessment", "Target role analysis", "Skill gap identification", "Action plan creation"],
    price: 150
  },
  {
    id: 2,
    name: "Technical Interview Prep",
    duration: "45 min", 
    description: "System design and coding interview preparation",
    agenda: ["Mock interview", "Problem solving techniques", "Best practices review", "Feedback session"],
    price: 120
  },
  {
    id: 3,
    name: "Leadership Coaching",
    duration: "60 min",
    description: "Leadership skills development and team management strategies",
    agenda: ["Leadership assessment", "Communication strategies", "Team dynamics", "Growth planning"],
    price: 180
  }
];

export const MentorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMentee, setSelectedMentee] = useState<typeof recentMentees[0] | null>(null);
  const [newNote, setNewNote] = useState("");

  const filteredMentees = recentMentees.filter(mentee =>
    mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentee.goals.some(goal => goal.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddNote = (menteeId: number) => {
    if (newNote.trim()) {
      // In a real app, this would save to the backend
      console.log(`Adding note for mentee ${menteeId}: ${newNote}`);
      setNewNote("");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <WelcomeBanner 
        userName="Sarah"
        userRole="mentor"
        upcomingSessions={3}
        completedSessions={47}
      />

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
          title="This Month Earnings"
          value={`$${revenueData.thisMonth.toLocaleString()}`}
          change={{ value: 12, type: 'increase' }}
          icon={DollarSign}
        />
        <MetricCard
          title="Hours This Month"
          value="18h"
          change={{ value: 20, type: 'increase' }}
          icon={Clock}
        />
      </div>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="mentees">Mentees</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Sessions - Enhanced */}
            <div className="lg:col-span-2">
              <Card className="dashboard-card-elevated">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl font-semibold">Upcoming Sessions</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="ghost" size="sm">
                      Manage Calendar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="p-4 border border-border-subtle rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={session.menteeAvatar} alt={session.menteeName} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {session.menteeName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <h4 className="font-medium text-foreground">{session.menteeName}</h4>
                            <p className="text-sm text-foreground-muted">{session.topic}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className={`text-xs ${getPriorityColor(session.priority)}`}>
                                {session.priority} priority
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {session.menteeLevel}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <Badge 
                            variant={session.status === 'confirmed' ? 'default' : 'secondary'}
                            className={session.status === 'confirmed' ? 'badge-success' : 'badge-pending'}
                          >
                            {session.status}
                          </Badge>
                          <span className="text-sm font-medium text-green-600">${session.price}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs text-foreground-muted mb-3">
                        <div>📅 {session.date} at {session.time}</div>
                        <div>⏰ {session.duration}</div>
                      </div>
                      
                      <div className="bg-muted/50 p-3 rounded-md mb-3">
                        <p className="text-sm text-foreground-muted">{session.notes}</p>
                      </div>

                      {session.preparationNeeded.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-foreground mb-1">Preparation needed:</p>
                          <div className="flex flex-wrap gap-1">
                            {session.preparationNeeded.map((item, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className={`h-4 w-4 ${session.resumeUploaded ? 'text-success' : 'text-foreground-muted'}`} />
                          <span className="text-xs text-foreground-muted">
                            {session.resumeUploaded ? 'Resume uploaded' : 'No resume'}
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit3 className="mr-1 h-3 w-3" />
                            Notes
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

            {/* Enhanced Sidebar */}
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
                    <Plus className="mr-2 h-4 w-4" />
                    Create Session
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>

              {/* Today's Schedule */}
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded-md">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">9:00 AM - Completed</p>
                      <p className="text-xs text-foreground-muted">Alex Johnson</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-md">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">2:00 PM - Upcoming</p>
                      <p className="text-xs text-foreground-muted">Career Guidance</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-md">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">4:00 PM - Pending</p>
                      <p className="text-xs text-foreground-muted">Jordan Kim</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">This Week</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground-muted">Sessions completed</span>
                    <span className="font-medium">8/10</span>
                  </div>
                  <Progress value={80} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground-muted">Revenue goal</span>
                    <span className="font-medium">$980 / $1200</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Mentees Management Tab */}
        <TabsContent value="mentees" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Mentee Management</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search mentees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMentees.map((mentee) => (
              <Card key={mentee.id} className="dashboard-card hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => setSelectedMentee(mentee)}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={mentee.avatar} alt={mentee.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {mentee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{mentee.name}</h4>
                      <p className="text-sm text-foreground-muted">{mentee.email}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{mentee.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground-muted">Progress</span>
                      <Badge variant="secondary" className={
                        mentee.progress === 'excellent' ? 'badge-success' :
                        mentee.progress === 'good' ? 'bg-primary/10 text-primary' :
                        'badge-warning'
                      }>
                        {mentee.progress === 'needs_followup' ? 'Follow up' : mentee.progress}
                      </Badge>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Completion Rate</span>
                        <span>{mentee.completionRate}%</span>
                      </div>
                      <Progress value={mentee.completionRate} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs text-foreground-muted">
                      <div>Sessions: {mentee.totalSessions}</div>
                      <div>Spent: ${mentee.totalSpent}</div>
                      <div>Last: {mentee.lastSession}</div>
                      <div>Next: {mentee.nextSession || 'Not scheduled'}</div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-foreground mb-1">Goals:</p>
                      <div className="flex flex-wrap gap-1">
                        {mentee.goals.map((goal, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="mr-1 h-3 w-3" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Mail className="mr-1 h-3 w-3" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedMentee && (
            <Card className="dashboard-card-elevated">
              <CardHeader>
                <CardTitle>Session Notes for {selectedMentee.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-3 rounded-md">
                    <p className="text-sm">{selectedMentee.notes}</p>
                  </div>
                  <div>
                    <Textarea
                      placeholder="Add new note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="mb-2"
                    />
                    <Button onClick={() => handleAddNote(selectedMentee.id)} disabled={!newNote.trim()}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Note
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Revenue Analytics Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground-muted">This Month</p>
                    <p className="text-2xl font-bold text-foreground">${revenueData.thisMonth.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="badge-success">
                    +12% from last month
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground-muted">This Week</p>
                    <p className="text-2xl font-bold text-foreground">${revenueData.thisWeek}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-600">
                    5 sessions completed
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground-muted">Pending</p>
                    <p className="text-2xl font-bold text-foreground">${revenueData.pendingPayments}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="badge-warning">
                    3 payments pending
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground-muted">Avg Rate</p>
                    <p className="text-2xl font-bold text-foreground">${revenueData.averageSessionRate}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="bg-purple-50 text-purple-600">
                    per hour
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Year to Date Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Revenue</span>
                  <span className="font-bold text-xl">${revenueData.yearToDate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Hours</span>
                  <span className="font-medium">{revenueData.totalHours}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Best Month</span>
                  <span className="font-medium">{revenueData.topEarningMonth}</span>
                </div>
                <div className="pt-4">
                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Tax Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: "Sep 15, 2025", amount: 320, status: "completed", sessions: 2 },
                    { date: "Sep 10, 2025", amount: 450, status: "completed", sessions: 3 },
                    { date: "Sep 5, 2025", amount: 180, status: "pending", sessions: 1 },
                    { date: "Sep 1, 2025", amount: 270, status: "completed", sessions: 2 },
                  ].map((payment, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                      <div>
                        <p className="font-medium">${payment.amount}</p>
                        <p className="text-xs text-foreground-muted">{payment.sessions} sessions • {payment.date}</p>
                      </div>
                      <Badge variant={payment.status === 'completed' ? 'default' : 'secondary'}
                             className={payment.status === 'completed' ? 'badge-success' : 'badge-warning'}>
                        {payment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Availability Management Tab */}
        <TabsContent value="availability" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Manage Availability</h3>
            <Button className="btn-primary">
              <Plus className="mr-2 h-4 w-4" />
              Add Time Slot
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availabilitySlots.map((day) => (
                    <div key={day.day} className="border-b border-border-subtle pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{day.day}</span>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {day.slots.length > 0 ? (
                          day.slots.map((slot, index) => (
                            <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {slot}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-foreground-muted">No availability</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Booking Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Default Session Duration</label>
                  <div className="flex gap-2 mt-1">
                    {['30 min', '45 min', '60 min', '90 min'].map((duration) => (
                      <Badge key={duration} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                        {duration}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Advance Booking</label>
                  <p className="text-sm text-foreground-muted">Allow bookings up to 30 days in advance</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Buffer Time</label>
                  <p className="text-sm text-foreground-muted">15 minutes between sessions</p>
                </div>
                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Sync with Google Calendar
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Bell className="mr-2 h-4 w-4" />
                    Notification Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Session Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Session Templates</h3>
            <Button className="btn-primary">
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {sessionTemplates.map((template) => (
              <Card key={template.id} className="dashboard-card hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <p className="text-sm text-foreground-muted">{template.duration} • ${template.price}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground-muted mb-4">{template.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Agenda:</p>
                    <ul className="text-sm text-foreground-muted space-y-1">
                      {template.agenda.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Use Template
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Template Usage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessionTemplates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{template.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={Math.random() * 100} className="h-2 flex-1 max-w-[200px]" />
                        <span className="text-sm text-foreground-muted">
                          {Math.floor(Math.random() * 20)} uses
                        </span>
                      </div>
                    </div>
                    <span className="font-medium text-green-600">
                      ${(Math.random() * 1000 + 500).toFixed(0)} earned
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorDashboard;