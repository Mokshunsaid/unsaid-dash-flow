import React, { useState } from 'react';
import { 
  Calendar, Users, BarChart3, Clock, Star, ArrowRight, Video, FileText, 
  DollarSign, TrendingUp, MessageSquare, Plus, Filter, Search, 
  Edit3, Phone, Mail, Eye, CheckCircle, AlertCircle, Settings,
  Download, Upload, Bell, BookOpen, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { 
  useDashboardStats, 
  useUpcomingSessions, 
  useRecentMentees, 
  useRevenueAnalytics,
  useAvailability,
  useSessionTemplates 
} from '@/hooks/useApi';

export const MentorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [newNote, setNewNote] = useState("");

  // API hooks
  const { data: dashboardStats, loading: statsLoading, error: statsError } = useDashboardStats();
  const { sessions: upcomingSessions, loading: sessionsLoading, error: sessionsError } = useUpcomingSessions();
  const { mentees: recentMentees, loading: menteesLoading, error: menteesError } = useRecentMentees();
  const { data: revenueData, loading: revenueLoading, error: revenueError } = useRevenueAnalytics();
  const { availability: availabilityData, loading: availabilityLoading, error: availabilityError } = useAvailability();
  const { templates: templatesData, loading: templatesLoading, error: templatesError } = useSessionTemplates();

  const [selectedMentee, setSelectedMentee] = useState<typeof recentMentees[0] | null>(null);

  const filteredMentees = recentMentees?.filter(mentee =>
    mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentee.goals.some(goal => goal.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const handleAddNote = (menteeId: string) => {
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

  // Loading component
  const LoadingCard = () => (
    <Card className="dashboard-card">
      <CardContent className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </CardContent>
    </Card>
  );

  // Error component
  const ErrorAlert = ({ error }: { error: string }) => (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      {statsError ? (
        <ErrorAlert error={statsError} />
      ) : (
        <WelcomeBanner 
          userName="Sarah"
          userRole="mentor"
          upcomingSessions={dashboardStats?.upcomingMeetings || 0}
          completedSessions={dashboardStats?.completedSessions || 0}
        />
      )}

      {/* Enhanced Key Metrics */}
      {statsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => <LoadingCard key={i} />)}
        </div>
      ) : statsError ? (
        <ErrorAlert error={statsError} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <MetricCard
            title="This Week's Sessions"
            value={dashboardStats?.activeSessions || 0}
            change={{ value: 25, type: 'increase' }}
            icon={Calendar}
            variant="gradient"
          />
          <MetricCard
            title="Total Mentees"
            value={dashboardStats?.totalMentees || 0}
            change={{ value: 15, type: 'increase' }}
            icon={Users}
          />
          <MetricCard
            title="Average Rating"
            value={dashboardStats?.averageRating || "0"}
            change={{ value: 2, type: 'increase' }}
            icon={Star}
            variant="success"
          />
          <MetricCard
            title="This Month Earnings"
            value={`$${dashboardStats?.monthlyEarnings?.toLocaleString() || 0}`}
            change={{ value: 12, type: 'increase' }}
            icon={DollarSign}
          />
          <MetricCard
            title="Hours This Month"
            value={`${dashboardStats?.totalHours || 0}h`}
            change={{ value: 20, type: 'increase' }}
            icon={Clock}
          />
        </div>
      )}

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
                  {sessionsLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : sessionsError ? (
                    <ErrorAlert error={sessionsError} />
                  ) : upcomingSessions && upcomingSessions.length > 0 ? (
                    upcomingSessions.map((session) => (
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
                    ))
                  ) : (
                    <div className="text-center p-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No upcoming sessions</p>
                    </div>
                  )}
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
            {menteesLoading ? (
              <div className="col-span-full flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : menteesError ? (
              <div className="col-span-full">
                <ErrorAlert error={menteesError} />
              </div>
            ) : filteredMentees.length > 0 ? (
              filteredMentees.map((mentee) => (
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
              ))
            ) : (
              <div className="col-span-full text-center p-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No mentees found</p>
              </div>
            )}
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
          {revenueLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => <LoadingCard key={i} />)}
            </div>
          ) : revenueError ? (
            <ErrorAlert error={revenueError} />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="dashboard-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-foreground-muted">This Month</p>
                        <p className="text-2xl font-bold text-foreground">${revenueData?.thisMonth?.toLocaleString() || 0}</p>
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
                        <p className="text-2xl font-bold text-foreground">${revenueData?.thisWeek || 0}</p>
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
                        <p className="text-2xl font-bold text-foreground">${revenueData?.pendingPayments || 0}</p>
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
                        <p className="text-2xl font-bold text-foreground">${revenueData?.averageSessionRate || 0}</p>
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
                      <span className="font-bold text-xl">${revenueData?.yearToDate?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Hours</span>
                      <span className="font-medium">{revenueData?.totalHours || 0}h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Best Month</span>
                      <span className="font-medium">{revenueData?.topEarningMonth || 'N/A'}</span>
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
            </>
          )}
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
                  {availabilityLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : availabilityError ? (
                    <ErrorAlert error={availabilityError} />
                  ) : availabilityData && availabilityData.length > 0 ? (
                    availabilityData.map((day) => (
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
                    ))
                  ) : (
                    <div className="text-center p-8">
                      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No availability data</p>
                    </div>
                  )}
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
            {templatesLoading ? (
              <div className="col-span-full flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : templatesError ? (
              <div className="col-span-full">
                <ErrorAlert error={templatesError} />
              </div>
            ) : templatesData && templatesData.length > 0 ? (
              templatesData.map((template) => (
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
              ))
            ) : (
              <div className="col-span-full text-center p-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No templates available</p>
              </div>
            )}
          </div>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Template Usage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templatesLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : templatesData && templatesData.length > 0 ? (
                  templatesData.map((template) => (
                    <div key={template.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{template.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={template.usageCount ? (template.usageCount / 25) * 100 : 0} className="h-2 flex-1 max-w-[200px]" />
                          <span className="text-sm text-foreground-muted">
                            {template.usageCount || 0} uses
                          </span>
                        </div>
                      </div>
                      <span className="font-medium text-green-600">
                        ${template.totalEarnings || 0} earned
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">No template data available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorDashboard;