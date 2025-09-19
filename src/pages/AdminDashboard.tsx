import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  UserCheck,
  BarChart3,
  Settings,
  UserPlus,
  Shield,
  Activity,
  DollarSign,
  Filter,
  Search,
  Download,
  Edit,
  Trash2,
  Ban,
  Play,
  Pause,
  MoreHorizontal,
  FileText,
  Mail,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { MetricCard } from '@/components/dashboard/MetricCard';

// Mock data for admin sections
const pendingApprovals = [
  {
    id: 1,
    type: 'session_booking',
    menteeName: "Alex Johnson",
    mentorName: "Sarah Chen",
    menteeAvatar: "/avatars/alex.jpg",
    mentorAvatar: "/avatars/sarah.jpg",
    topic: "Career Transition to Product Management",
    date: "2025-09-25",
    time: "2:00 PM",
    duration: "60 min",
    priority: "high",
    submittedAt: "2 hours ago",
    paymentStatus: "completed",
    amount: 150
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
    documentsUploaded: true,
    linkedinProfile: "linkedin.com/in/davidkumar",
    email: "david.kumar@email.com"
  },
  {
    id: 3,
    type: 'refund_request',
    menteeName: "John Smith",
    mentorName: "Lisa Wang",
    reason: "Session cancelled by mentor",
    amount: 200,
    submittedAt: "3 hours ago",
    priority: "high",
    sessionDate: "2025-09-22"
  }
];

const allSessions = [
  {
    id: 1,
    mentee: "Alex Johnson",
    mentor: "Sarah Chen",
    topic: "Career Transition",
    date: "2025-09-20",
    time: "2:00 PM",
    duration: "60 min",
    status: "completed",
    rating: 5,
    amount: 150,
    platform: "Google Meet"
  },
  {
    id: 2,
    mentee: "Maria Santos",
    mentor: "David Kumar",
    topic: "Technical Interview Prep",
    date: "2025-09-21",
    time: "10:00 AM",
    duration: "45 min",
    status: "completed",
    rating: 4,
    amount: 120,
    platform: "Zoom"
  },
  {
    id: 3,
    mentee: "John Smith",
    mentor: "Emily Rodriguez",
    topic: "Product Strategy",
    date: "2025-09-25",
    time: "3:00 PM",
    duration: "60 min",
    status: "scheduled",
    amount: 180,
    platform: "Google Meet"
  }
];

const allUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    role: "mentor",
    status: "active",
    joinDate: "2025-06-15",
    avatar: "/avatars/sarah.jpg",
    totalSessions: 45,
    totalEarnings: 6750,
    rating: 4.9,
    verificationStatus: "verified",
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    role: "mentee",
    status: "active",
    joinDate: "2025-07-20",
    avatar: "/avatars/alex.jpg",
    totalSessions: 12,
    totalSpent: 1800,
    lastActive: "1 day ago"
  },
  {
    id: 3,
    name: "David Kumar",
    email: "david.kumar@email.com",
    role: "mentor",
    status: "pending",
    joinDate: "2025-09-18",
    avatar: "/avatars/david.jpg",
    totalSessions: 0,
    totalEarnings: 0,
    verificationStatus: "pending",
    lastActive: "5 hours ago"
  }
];

const analyticsData = {
  revenue: {
    total: 45600,
    thisMonth: 8700,
    growth: 15.3,
    chartData: [
      { month: 'Apr', amount: 7200 },
      { month: 'May', amount: 8100 },
      { month: 'Jun', amount: 8700 },
      { month: 'Jul', amount: 9200 },
      { month: 'Aug', amount: 8900 },
      { month: 'Sep', amount: 9500 }
    ]
  },
  sessions: {
    total: 1247,
    thisMonth: 189,
    growth: 12.8,
    completionRate: 92.5
  },
  users: {
    total: 856,
    mentors: 124,
    mentees: 731,
    admins: 1,
    growth: 8.7
  },
  satisfaction: {
    average: 4.7,
    totalReviews: 892,
    distribution: {
      5: 65,
      4: 25,
      3: 8,
      2: 1,
      1: 1
    }
  }
};

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
  }
];

export const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedUser, setSelectedUser] = useState<typeof allUsers[0] | null>(null);
  const [selectedSession, setSelectedSession] = useState<typeof allSessions[0] | null>(null);

  // Set active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/approvals') setActiveTab('approvals');
    else if (path === '/sessions') setActiveTab('sessions');
    else if (path === '/users') setActiveTab('users');
    else if (path === '/analytics') setActiveTab('analytics');
    else setActiveTab('overview');
  }, [location.pathname]);

  const handleApprove = (id: number) => {
    console.log('Approving:', id);
  };

  const handleReject = (id: number) => {
    console.log('Rejecting:', id);
  };

  const handleUserAction = (userId: number, action: string) => {
    console.log(`${action} user:`, userId);
  };

  const handleSessionAction = (sessionId: number, action: string) => {
    console.log(`${action} session:`, sessionId);
  };

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'mentor': return 'bg-purple-100 text-purple-800';
      case 'mentee': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-foreground-muted">Manage platform operations and user activities</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
          <Button className="btn-primary">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Pending Approvals"
              value={pendingApprovals.length}
              change={{ value: 20, type: 'increase' }}
              icon={CheckSquare}
              variant="warning"
              onClick={() => setActiveTab('approvals')}
            />
            <MetricCard
              title="Active Sessions Today"
              value={allSessions.filter(s => s.status === 'scheduled').length}
              change={{ value: 15, type: 'increase' }}
              icon={Calendar}
              variant="gradient"
            />
            <MetricCard
              title="Total Users"
              value={allUsers.length.toLocaleString()}
              change={{ value: 8, type: 'increase' }}
              icon={Users}
              onClick={() => setActiveTab('users')}
            />
            <MetricCard
              title="Platform Rating"
              value={analyticsData.satisfaction.average.toString()}
              change={{ value: 3, type: 'increase' }}
              icon={Star}
              variant="success"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Approvals */}
            <div className="lg:col-span-2">
              <Card className="dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <CheckSquare className="h-5 w-5 text-warning" />
                    Recent Approvals
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {pendingApprovals.length}
                    </Badge>
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('approvals')}>
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingApprovals.slice(0, 3).map((item) => (
                    <div key={item.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            {item.type === 'session_booking' ? (
                              <>
                                <Avatar className="h-8 w-8 border-2 border-background">
                                  <AvatarImage src={item.menteeAvatar} />
                                  <AvatarFallback>{item.menteeName?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <Avatar className="h-8 w-8 border-2 border-background">
                                  <AvatarImage src={item.mentorAvatar} />
                                  <AvatarFallback>{item.mentorName.charAt(0)}</AvatarFallback>
                                </Avatar>
                              </>
                            ) : (
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={item.mentorAvatar} />
                                <AvatarFallback>{item.mentorName?.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">
                              {item.type === 'session_booking' 
                                ? `${item.menteeName} ↔ ${item.mentorName}`
                                : item.mentorName
                              }
                            </h4>
                            <p className="text-sm text-foreground-muted">{item.submittedAt}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleReject(item.id)}>
                            <X className="h-3 w-3" />
                          </Button>
                          <Button size="sm" onClick={() => handleApprove(item.id)}>
                            <Check className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* System Status */}
            <div className="space-y-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Activity className="h-4 w-4 text-success" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Platform Health</span>
                    <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Users</span>
                    <span className="text-sm font-medium">{allUsers.filter(u => u.status === 'active').length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Server Load</span>
                    <span className="text-sm font-medium">32%</span>
                  </div>
                  <Progress value={32} className="h-2" />
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.slice(0, 4).map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        activity.type === 'approval' ? 'bg-success' :
                        activity.type === 'new_user' ? 'bg-primary' :
                        activity.type === 'payment' ? 'bg-secondary' :
                        'bg-foreground-muted'
                      }`}></div>
                      <div>
                        <p className="text-sm text-foreground">{activity.description}</p>
                        <p className="text-xs text-foreground-muted">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Approvals Tab */}
        <TabsContent value="approvals" className="space-y-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5" />
                Pending Approvals ({pendingApprovals.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="p-4 border border-border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {item.type === 'session_booking' ? (
                        <div className="flex -space-x-2">
                          <Avatar className="h-10 w-10 border-2 border-background">
                            <AvatarImage src={item.menteeAvatar} />
                            <AvatarFallback>{item.menteeName?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <Avatar className="h-10 w-10 border-2 border-background">
                            <AvatarImage src={item.mentorAvatar} />
                            <AvatarFallback>{item.mentorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                      ) : (
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={item.mentorAvatar} />
                          <AvatarFallback>{item.mentorName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">
                            {item.type === 'session_booking' && `Session: ${item.menteeName} ↔ ${item.mentorName}`}
                            {item.type === 'mentor_verification' && `Mentor Verification: ${item.mentorName}`}
                            {item.type === 'refund_request' && `Refund Request: ${item.menteeName}`}
                          </h4>
                          <Badge className={
                            item.priority === 'high' ? 'bg-red-100 text-red-800' :
                            item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }>
                            {item.priority}
                          </Badge>
                        </div>
                        {item.type === 'session_booking' && (
                          <p className="text-sm text-foreground-muted">
                            {item.topic} • {item.date} at {item.time} • ${item.amount}
                          </p>
                        )}
                        {item.type === 'mentor_verification' && (
                          <p className="text-sm text-foreground-muted">
                            {item.expertise} • {item.experience}
                          </p>
                        )}
                        {item.type === 'refund_request' && (
                          <p className="text-sm text-foreground-muted">
                            {item.reason} • ${item.amount}
                          </p>
                        )}
                        <p className="text-xs text-foreground-muted">{item.submittedAt}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleReject(item.id)}>
                        <X className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                      <Button size="sm" onClick={() => handleApprove(item.id)}>
                        <Check className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sessions Tab */}
        <TabsContent value="sessions" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">All Sessions</h2>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <Card className="dashboard-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="p-4">Session</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Duration</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allSessions.map((session) => (
                      <tr key={session.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div>
                            <h4 className="font-medium">{session.mentee} ↔ {session.mentor}</h4>
                            <p className="text-sm text-foreground-muted">{session.topic}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{session.date}</p>
                            <p className="text-sm text-foreground-muted">{session.time}</p>
                          </div>
                        </td>
                        <td className="p-4">{session.duration}</td>
                        <td className="p-4">${session.amount}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(session.status)}>
                            {session.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          {session.rating ? (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{session.rating}</span>
                            </div>
                          ) : (
                            <span className="text-foreground-muted">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedSession(session)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Generate Report
                              </DropdownMenuItem>
                              {session.status === 'scheduled' && (
                                <DropdownMenuItem onClick={() => handleSessionAction(session.id, 'cancel')}>
                                  <X className="mr-2 h-4 w-4" />
                                  Cancel Session
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">User Management</h2>
            <Button className="btn-primary">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>

          {/* Filters */}
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="mentor">Mentors</SelectItem>
                    <SelectItem value="mentee">Mentees</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="dashboard-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-foreground-muted">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUserAction(user.id, 'edit')}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUserAction(user.id, 'message')}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                        {user.status === 'active' ? (
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, 'suspend')}>
                            <Ban className="mr-2 h-4 w-4" />
                            Suspend User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, 'activate')}>
                            <Play className="mr-2 h-4 w-4" />
                            Activate User
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Joined:</span>
                      <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Active:</span>
                      <span>{user.lastActive}</span>
                    </div>
                    {user.role === 'mentor' && (
                      <>
                        <div className="flex justify-between">
                          <span>Sessions:</span>
                          <span>{user.totalSessions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Earnings:</span>
                          <span>${user.totalEarnings?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rating:</span>
                          <span>⭐ {user.rating}</span>
                        </div>
                      </>
                    )}
                    {user.role === 'mentee' && (
                      <>
                        <div className="flex justify-between">
                          <span>Sessions:</span>
                          <span>{user.totalSessions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Spent:</span>
                          <span>${user.totalSpent?.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Platform Analytics</h2>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Revenue & Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="dashboard-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground-muted">Total Revenue</p>
                    <p className="text-2xl font-bold">${analyticsData.revenue.total.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+{analyticsData.revenue.growth}% this month</p>
                  </div>
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground-muted">Total Sessions</p>
                    <p className="text-2xl font-bold">{analyticsData.sessions.total.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+{analyticsData.sessions.growth}% this month</p>
                  </div>
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground-muted">Total Users</p>
                    <p className="text-2xl font-bold">{analyticsData.users.total.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+{analyticsData.users.growth}% this month</p>
                  </div>
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground-muted">Satisfaction</p>
                    <p className="text-2xl font-bold">{analyticsData.satisfaction.average}</p>
                    <p className="text-xs text-foreground-muted">{analyticsData.satisfaction.totalReviews} reviews</p>
                  </div>
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.revenue.chartData.map((item, index) => (
                    <div key={item.month} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium">{item.month}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">${item.amount.toLocaleString()}</span>
                        </div>
                        <Progress 
                          value={(item.amount / Math.max(...analyticsData.revenue.chartData.map(d => d.amount))) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Distribution */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span>Mentors</span>
                  </div>
                  <span className="font-medium">{analyticsData.users.mentors}</span>
                </div>
                <Progress value={(analyticsData.users.mentors / analyticsData.users.total) * 100} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Mentees</span>
                  </div>
                  <span className="font-medium">{analyticsData.users.mentees}</span>
                </div>
                <Progress value={(analyticsData.users.mentees / analyticsData.users.total) * 100} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span>Admins</span>
                  </div>
                  <span className="font-medium">{analyticsData.users.admins}</span>
                </div>
                <Progress value={(analyticsData.users.admins / analyticsData.users.total) * 100} className="h-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* User Detail Modal */}
      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback>{selectedUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3>{selectedUser.name}</h3>
                  <p className="text-sm text-foreground-muted">{selectedUser.email}</p>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge className={getRoleColor(selectedUser.role)}>
                  {selectedUser.role}
                </Badge>
                <Badge className={getStatusColor(selectedUser.status)}>
                  {selectedUser.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Join Date:</strong> {new Date(selectedUser.joinDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>Last Active:</strong> {selectedUser.lastActive}
                </div>
                {selectedUser.role === 'mentor' && (
                  <>
                    <div>
                      <strong>Total Sessions:</strong> {selectedUser.totalSessions}
                    </div>
                    <div>
                      <strong>Total Earnings:</strong> ${selectedUser.totalEarnings?.toLocaleString()}
                    </div>
                    <div>
                      <strong>Average Rating:</strong> ⭐ {selectedUser.rating}
                    </div>
                    <div>
                      <strong>Verification:</strong> {selectedUser.verificationStatus}
                    </div>
                  </>
                )}
                {selectedUser.role === 'mentee' && (
                  <>
                    <div>
                      <strong>Total Sessions:</strong> {selectedUser.totalSessions}
                    </div>
                    <div>
                      <strong>Total Spent:</strong> ${selectedUser.totalSpent?.toLocaleString()}
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleUserAction(selectedUser.id, 'edit')}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit User
                </Button>
                <Button variant="outline" onClick={() => handleUserAction(selectedUser.id, 'message')}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                {selectedUser.status === 'active' ? (
                  <Button variant="outline" onClick={() => handleUserAction(selectedUser.id, 'suspend')}>
                    <Ban className="mr-2 h-4 w-4" />
                    Suspend
                  </Button>
                ) : (
                  <Button onClick={() => handleUserAction(selectedUser.id, 'activate')}>
                    <Play className="mr-2 h-4 w-4" />
                    Activate
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Session Detail Modal */}
      {selectedSession && (
        <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Session Details</DialogTitle>
              <DialogDescription>
                {selectedSession.mentee} ↔ {selectedSession.mentor}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Topic:</strong> {selectedSession.topic}</div>
                <div><strong>Date:</strong> {selectedSession.date}</div>
                <div><strong>Time:</strong> {selectedSession.time}</div>
                <div><strong>Duration:</strong> {selectedSession.duration}</div>
                <div><strong>Amount:</strong> ${selectedSession.amount}</div>
                <div><strong>Platform:</strong> {selectedSession.platform}</div>
                <div>
                  <strong>Status:</strong> 
                  <Badge className={`ml-2 ${getStatusColor(selectedSession.status)}`}>
                    {selectedSession.status}
                  </Badge>
                </div>
                {selectedSession.rating && (
                  <div>
                    <strong>Rating:</strong> ⭐ {selectedSession.rating}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                {selectedSession.status === 'scheduled' && (
                  <Button variant="outline" onClick={() => handleSessionAction(selectedSession.id, 'cancel')}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel Session
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminDashboard;