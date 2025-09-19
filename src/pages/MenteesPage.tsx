import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Mail, Phone, Video, MessageSquare, Star, 
  Calendar, TrendingUp, Clock, MapPin, User, Edit3, Eye, MoreHorizontal,
  CheckCircle, AlertCircle, XCircle, Send, FileText, Download, Layers,
  FolderPlus, UserPlus, Settings, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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

// Mock data for cohorts
const cohorts = [
  {
    id: 1,
    name: "Product Management Bootcamp 2025",
    description: "Intensive 12-week program for transitioning to PM roles",
    startDate: "2025-06-01",
    endDate: "2025-08-24",
    status: "active",
    totalMentees: 8,
    completionRate: 75,
    color: "bg-blue-500"
  },
  {
    id: 2,
    name: "Senior Engineer Prep",
    description: "Advanced technical interview and leadership preparation",
    startDate: "2025-07-15",
    endDate: "2025-10-15",
    status: "active",
    totalMentees: 6,
    completionRate: 83,
    color: "bg-green-500"
  },
  {
    id: 3,
    name: "Startup Founders Circle",
    description: "Entrepreneurship and business strategy for aspiring founders",
    startDate: "2025-08-01",
    endDate: "2025-11-30",
    status: "active",
    totalMentees: 4,
    completionRate: 50,
    color: "bg-purple-500"
  },
  {
    id: 4,
    name: "Career Transition Q1 2025",
    description: "General career guidance and transition support",
    startDate: "2025-01-15",
    endDate: "2025-04-15",
    status: "completed",
    totalMentees: 12,
    completionRate: 92,
    color: "bg-gray-500"
  }
];

// Mock data for mentees
const mentees = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "/avatars/alex.jpg",
    joinDate: "2025-06-15",
    location: "San Francisco, CA",
    timezone: "PST",
    cohortId: 1,
    totalSessions: 12,
    completedSessions: 10,
    upcomingSessions: 2,
    totalSpent: 1800,
    averageRating: 4.8,
    lastSession: "2025-09-15",
    nextSession: "2025-09-22",
    status: "active",
    progress: 85,
    goals: ["Career Transition", "Leadership Skills", "Product Management"],
    skills: ["JavaScript", "React", "Node.js", "Project Management"],
    currentRole: "Senior Software Engineer",
    targetRole: "Product Manager",
    company: "TechCorp Inc.",
    experience: "5 years",
    notes: "Very motivated mentee looking to transition to PM role. Great technical background.",
    sessionHistory: [
      { date: "2025-09-15", topic: "Product Strategy", rating: 5, duration: "60 min" },
      { date: "2025-09-08", topic: "Career Planning", rating: 5, duration: "45 min" },
      { date: "2025-09-01", topic: "Leadership Skills", rating: 4, duration: "60 min" },
    ],
    communicationPreference: "email",
    availability: ["Weekdays 6-8 PM", "Saturday mornings"],
    progressNotes: [
      { date: "2025-09-15", note: "Great progress on product thinking. Starting to see the bigger picture." },
      { date: "2025-09-08", note: "Completed career assessment. Clear about next steps." }
    ]
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "+1 (555) 987-6543",
    avatar: "/avatars/maria.jpg",
    joinDate: "2025-07-20",
    location: "Austin, TX",
    timezone: "CST",
    cohortId: 2,
    totalSessions: 8,
    completedSessions: 6,
    upcomingSessions: 1,
    totalSpent: 960,
    averageRating: 4.9,
    lastSession: "2025-09-12",
    nextSession: "2025-09-25",
    status: "active",
    progress: 75,
    goals: ["Technical Interviews", "System Design", "Senior Engineer Role"],
    skills: ["Python", "AWS", "Docker", "System Architecture"],
    currentRole: "Software Engineer",
    targetRole: "Senior Software Engineer",
    company: "StartupXYZ",
    experience: "3 years",
    notes: "Preparing for senior engineer interviews. Strong technical skills but needs confidence.",
    sessionHistory: [
      { date: "2025-09-12", topic: "System Design", rating: 5, duration: "60 min" },
      { date: "2025-09-05", topic: "Mock Interview", rating: 5, duration: "45 min" },
      { date: "2025-08-29", topic: "Technical Challenges", rating: 4, duration: "60 min" },
    ],
    communicationPreference: "video",
    availability: ["Tuesday/Thursday evenings", "Sunday afternoons"],
    progressNotes: [
      { date: "2025-09-12", note: "Excellent system design session. Ready for real interviews." },
      { date: "2025-09-05", note: "Mock interview went well. Boosted confidence significantly." }
    ]
  },
  {
    id: 3,
    name: "David Chen",
    email: "david.chen@email.com",
    phone: "+1 (555) 456-7890",
    avatar: "/avatars/david.jpg",
    joinDate: "2025-08-10",
    location: "Seattle, WA",
    timezone: "PST",
    cohortId: 3,
    totalSessions: 5,
    completedSessions: 4,
    upcomingSessions: 0,
    totalSpent: 600,
    averageRating: 4.5,
    lastSession: "2025-09-10",
    nextSession: null,
    status: "needs_followup",
    progress: 40,
    goals: ["Entrepreneurship", "Business Strategy", "Startup Funding"],
    skills: ["Business Development", "Sales", "Marketing"],
    currentRole: "Business Analyst",
    targetRole: "Startup Founder",
    company: "Corporate Solutions",
    experience: "2 years",
    notes: "Interested in starting own business. Needs guidance on business strategy and funding.",
    sessionHistory: [
      { date: "2025-09-10", topic: "Business Model", rating: 4, duration: "60 min" },
      { date: "2025-09-03", topic: "Market Research", rating: 5, duration: "45 min" },
      { date: "2025-08-27", topic: "Startup Basics", rating: 4, duration: "60 min" },
    ],
    communicationPreference: "phone",
    availability: ["Flexible weekends", "Late evenings"],
    progressNotes: [
      { date: "2025-09-10", note: "Good business model discussion but seems overwhelmed." },
      { date: "2025-09-03", note: "Completed market research. Needs to focus on one idea." }
    ]
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1 (555) 234-5678",
    avatar: "/avatars/sarah.jpg",
    joinDate: "2025-06-20",
    location: "New York, NY",
    timezone: "EST",
    cohortId: 1,
    totalSessions: 15,
    completedSessions: 13,
    upcomingSessions: 1,
    totalSpent: 2250,
    averageRating: 4.9,
    lastSession: "2025-09-16",
    nextSession: "2025-09-23",
    status: "active",
    progress: 90,
    goals: ["Product Leadership", "Team Management", "Strategic Thinking"],
    skills: ["Product Strategy", "Data Analysis", "Team Leadership"],
    currentRole: "Senior Business Analyst",
    targetRole: "VP of Product",
    company: "FinTech Solutions",
    experience: "6 years",
    notes: "Exceptional progress in product leadership. Ready for senior PM role.",
    sessionHistory: [
      { date: "2025-09-16", topic: "Product Strategy", rating: 5, duration: "60 min" },
      { date: "2025-09-09", topic: "Team Leadership", rating: 5, duration: "45 min" },
      { date: "2025-09-02", topic: "Stakeholder Management", rating: 5, duration: "60 min" },
    ],
    communicationPreference: "email",
    availability: ["Monday/Wednesday evenings", "Saturday mornings"],
    progressNotes: [
      { date: "2025-09-16", note: "Outstanding strategic thinking in product planning session." },
      { date: "2025-09-09", note: "Leadership skills developing rapidly. Great mentoring potential." }
    ]
  },
  {
    id: 5,
    name: "James Rodriguez",
    email: "james.rodriguez@email.com",
    phone: "+1 (555) 345-6789",
    avatar: "/avatars/james.jpg",
    joinDate: "2025-07-25",
    location: "Denver, CO",
    timezone: "MST",
    cohortId: 2,
    totalSessions: 10,
    completedSessions: 8,
    upcomingSessions: 1,
    totalSpent: 1200,
    averageRating: 4.7,
    lastSession: "2025-09-14",
    nextSession: "2025-09-21",
    status: "active",
    progress: 80,
    goals: ["System Architecture", "Technical Leadership", "Senior Engineer"],
    skills: ["Java", "Microservices", "Kubernetes", "System Design"],
    currentRole: "Software Engineer",
    targetRole: "Principal Engineer",
    company: "Cloud Systems Inc",
    experience: "4 years",
    notes: "Strong technical skills, working on leadership and system design.",
    sessionHistory: [
      { date: "2025-09-14", topic: "Microservices Architecture", rating: 5, duration: "60 min" },
      { date: "2025-09-07", topic: "Technical Leadership", rating: 4, duration: "45 min" },
      { date: "2025-08-31", topic: "System Scalability", rating: 5, duration: "60 min" },
    ],
    communicationPreference: "video",
    availability: ["Tuesday/Thursday evenings", "Weekend mornings"],
    progressNotes: [
      { date: "2025-09-14", note: "Excellent grasp of microservices patterns. Ready for architecture role." },
      { date: "2025-09-07", note: "Leadership skills improving. Needs more confidence in decision making." }
    ]
  },
  {
    id: 6,
    name: "Emily Zhang",
    email: "emily.zhang@email.com",
    phone: "+1 (555) 456-7891",
    avatar: "/avatars/emily.jpg",
    joinDate: "2025-08-05",
    location: "Portland, OR",
    timezone: "PST",
    cohortId: 3,
    totalSessions: 7,
    completedSessions: 5,
    upcomingSessions: 1,
    totalSpent: 840,
    averageRating: 4.6,
    lastSession: "2025-09-11",
    nextSession: "2025-09-24",
    status: "active",
    progress: 60,
    goals: ["Startup Validation", "Product-Market Fit", "Fundraising"],
    skills: ["Product Development", "Market Research", "Pitch Development"],
    currentRole: "Product Manager",
    targetRole: "Startup Co-founder",
    company: "Tech Innovations",
    experience: "3 years",
    notes: "Passionate about starting her own SaaS company. Needs guidance on validation.",
    sessionHistory: [
      { date: "2025-09-11", topic: "Market Validation", rating: 5, duration: "60 min" },
      { date: "2025-09-04", topic: "Business Planning", rating: 4, duration: "45 min" },
      { date: "2025-08-28", topic: "Competitive Analysis", rating: 5, duration: "60 min" },
    ],
    communicationPreference: "video",
    availability: ["Weekday evenings", "Sunday afternoons"],
    progressNotes: [
      { date: "2025-09-11", note: "Great progress on market validation methodology." },
      { date: "2025-09-04", note: "Business plan taking shape. Needs to focus on MVP features." }
    ]
  }
];

export const MenteesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCohort, setFilterCohort] = useState("all");
  const [selectedMentee, setSelectedMentee] = useState<typeof mentees[0] | null>(null);
  const [selectedCohort, setSelectedCohort] = useState<typeof cohorts[0] | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('individual');
  const [newNote, setNewNote] = useState("");
  const [showCreateCohort, setShowCreateCohort] = useState(false);
  const [newCohortName, setNewCohortName] = useState("");
  const [newCohortDescription, setNewCohortDescription] = useState("");

  const filteredMentees = mentees.filter(mentee => {
    const matchesSearch = mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentee.goals.some(goal => goal.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || mentee.status === filterStatus;
    const matchesCohort = filterCohort === 'all' || mentee.cohortId.toString() === filterCohort;
    
    return matchesSearch && matchesStatus && matchesCohort;
  });

  const getCohortName = (cohortId: number) => {
    return cohorts.find(c => c.id === cohortId)?.name || 'No Cohort';
  };

  const getCohortColor = (cohortId: number) => {
    return cohorts.find(c => c.id === cohortId)?.color || 'bg-gray-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'needs_followup': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleAddNote = () => {
    if (newNote.trim() && selectedMentee) {
      // In real app, this would save to backend
      console.log(`Adding note for ${selectedMentee.name}: ${newNote}`);
      setNewNote("");
    }
  };

  const stats = {
    total: mentees.length,
    active: mentees.filter(m => m.status === 'active').length,
    needsFollowup: mentees.filter(m => m.status === 'needs_followup').length,
    totalRevenue: mentees.reduce((sum, m) => sum + m.totalSpent, 0),
    avgRating: mentees.reduce((sum, m) => sum + m.averageRating, 0) / mentees.length
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Mentees</h1>
          <p className="text-foreground-muted">Manage and track your mentee relationships</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button className="btn-primary" onClick={() => setShowCreateCohort(true)}>
            <FolderPlus className="mr-2 h-4 w-4" />
            Create Cohort
          </Button>
          <Button className="btn-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Mentee
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Individual Mentees
          </TabsTrigger>
          <TabsTrigger value="cohorts" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Cohorts
          </TabsTrigger>
        </TabsList>

        {/* Individual Mentees Tab */}
        <TabsContent value="individual" className="space-y-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Total Mentees</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <User className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Need Follow-up</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.needsFollowup}</p>
              </div>
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Avg Rating</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.avgRating.toFixed(1)}</p>
              </div>
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="dashboard-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search mentees by name, email, or goals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="needs_followup">Needs Follow-up</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCohort} onValueChange={setFilterCohort}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by cohort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cohorts</SelectItem>
                {cohorts.map(cohort => (
                  <SelectItem key={cohort.id} value={cohort.id.toString()}>
                    {cohort.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mentees Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredMentees.map((mentee) => (
          <Card key={mentee.id} className="dashboard-card hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={mentee.avatar} alt={mentee.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {mentee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground truncate">{mentee.name}</h3>
                      <p className="text-sm text-foreground-muted">{mentee.currentRole} at {mentee.company}</p>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedMentee(mentee)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Session
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-muted">Progress</span>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Layers className="h-3 w-3 mr-1" />
                          {getCohortName(mentee.cohortId)}
                        </Badge>
                        <Badge className={getStatusColor(mentee.status)}>
                          {mentee.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Goal Progress</span>
                        <span>{mentee.progress}%</span>
                      </div>
                      <Progress value={mentee.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-foreground-muted">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {mentee.totalSessions} sessions
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {mentee.averageRating} rating
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Last: {new Date(mentee.lastSession).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {mentee.location}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-foreground mb-1">Goals:</p>
                      <div className="flex flex-wrap gap-1">
                        {mentee.goals.slice(0, 2).map((goal, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {goal}
                          </Badge>
                        ))}
                        {mentee.goals.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{mentee.goals.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageSquare className="mr-1 h-3 w-3" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Video className="mr-1 h-3 w-3" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
        </TabsContent>

        {/* Cohorts Tab */}
        <TabsContent value="cohorts" className="space-y-6">
          {/* Cohorts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cohorts.map((cohort) => {
              const cohortMentees = mentees.filter(m => m.cohortId === cohort.id);
              const activePercentage = cohortMentees.filter(m => m.status === 'active').length / cohortMentees.length * 100;
              
              return (
                <Card key={cohort.id} className="dashboard-card hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedCohort(cohort)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${cohort.color}`}></div>
                        <div>
                          <CardTitle className="text-lg">{cohort.name}</CardTitle>
                          <Badge variant={cohort.status === 'active' ? 'default' : 'secondary'}>
                            {cohort.status}
                          </Badge>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedCohort(cohort)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit3 className="mr-2 h-4 w-4" />
                            Edit Cohort
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add Mentees
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-foreground-muted">{cohort.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Duration:</span>
                        <span className="text-foreground-muted">
                          {new Date(cohort.startDate).toLocaleDateString()} - {new Date(cohort.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>Mentees:</span>
                        <span className="font-medium">{cohortMentees.length}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Completion Rate:</span>
                          <span className="font-medium">{cohort.completionRate}%</span>
                        </div>
                        <Progress value={cohort.completionRate} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Active Mentees:</span>
                          <span className="font-medium">{activePercentage.toFixed(0)}%</span>
                        </div>
                        <Progress value={activePercentage} className="h-2" />
                      </div>
                    </div>

                    <div className="flex -space-x-2">
                      {cohortMentees.slice(0, 4).map((mentee) => (
                        <Avatar key={mentee.id} className="h-8 w-8 border-2 border-white">
                          <AvatarImage src={mentee.avatar} alt={mentee.name} />
                          <AvatarFallback className="text-xs">
                            {mentee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {cohortMentees.length > 4 && (
                        <div className="h-8 w-8 rounded-full bg-muted border-2 border-white flex items-center justify-center">
                          <span className="text-xs text-foreground-muted">+{cohortMentees.length - 4}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {/* Create New Cohort Card */}
            <Card className="dashboard-card border-dashed border-2 hover:border-primary transition-colors cursor-pointer"
                  onClick={() => setShowCreateCohort(true)}>
              <CardContent className="flex flex-col items-center justify-center h-full py-12">
                <FolderPlus className="h-12 w-12 text-foreground-muted mb-4" />
                <h3 className="font-medium text-foreground mb-2">Create New Cohort</h3>
                <p className="text-sm text-foreground-muted text-center">
                  Group mentees together for structured learning programs
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Cohort Modal */}
      {showCreateCohort && (
        <Dialog open={showCreateCohort} onOpenChange={setShowCreateCohort}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Cohort</DialogTitle>
              <DialogDescription>
                Create a structured learning program for a group of mentees
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cohort-name">Cohort Name</Label>
                <Input
                  id="cohort-name"
                  placeholder="e.g., Product Management Bootcamp 2025"
                  value={newCohortName}
                  onChange={(e) => setNewCohortName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cohort-description">Description</Label>
                <Textarea
                  id="cohort-description"
                  placeholder="Describe the goals and structure of this cohort..."
                  value={newCohortDescription}
                  onChange={(e) => setNewCohortDescription(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setShowCreateCohort(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    // Add cohort creation logic here
                    setShowCreateCohort(false);
                    setNewCohortName("");
                    setNewCohortDescription("");
                  }}
                  className="flex-1"
                  disabled={!newCohortName.trim()}
                >
                  Create Cohort
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Cohort Detail Modal */}
      {selectedCohort && (
        <Dialog open={!!selectedCohort} onOpenChange={() => setSelectedCohort(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${selectedCohort.color}`}></div>
                {selectedCohort.name}
                <Badge variant={selectedCohort.status === 'active' ? 'default' : 'secondary'}>
                  {selectedCohort.status}
                </Badge>
              </DialogTitle>
              <DialogDescription>{selectedCohort.description}</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold">{mentees.filter(m => m.cohortId === selectedCohort.id).length}</p>
                    <p className="text-sm text-foreground-muted">Total Mentees</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold">{selectedCohort.completionRate}%</p>
                    <p className="text-sm text-foreground-muted">Completion Rate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <p className="text-2xl font-bold">
                      {Math.ceil((new Date(selectedCohort.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                    </p>
                    <p className="text-sm text-foreground-muted">Days Remaining</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Cohort Members</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mentees.filter(m => m.cohortId === selectedCohort.id).map((mentee) => (
                    <Card key={mentee.id} className="p-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={mentee.avatar} alt={mentee.name} />
                          <AvatarFallback>{mentee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium">{mentee.name}</h4>
                          <p className="text-sm text-foreground-muted">{mentee.currentRole}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(mentee.status)}>
                            {mentee.status.replace('_', ' ')}
                          </Badge>
                          <p className="text-sm text-foreground-muted mt-1">
                            {mentee.progress}% complete
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Mentee Detail Modal */}
      {selectedMentee && (
        <Dialog open={!!selectedMentee} onOpenChange={() => setSelectedMentee(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedMentee.avatar} alt={selectedMentee.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {selectedMentee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedMentee.name}</h3>
                  <p className="text-sm text-foreground-muted">{selectedMentee.email}</p>
                </div>
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Personal Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">Email:</span>
                        <span>{selectedMentee.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">Phone:</span>
                        <span>{selectedMentee.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">Location:</span>
                        <span>{selectedMentee.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">Joined:</span>
                        <span>{new Date(selectedMentee.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Career Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">Current Role:</span>
                        <span>{selectedMentee.currentRole}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">Target Role:</span>
                        <span>{selectedMentee.targetRole}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">Company:</span>
                        <span>{selectedMentee.company}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">Experience:</span>
                        <span>{selectedMentee.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Goals & Skills</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Goals:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedMentee.goals.map((goal, index) => (
                          <Badge key={index} variant="secondary">{goal}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedMentee.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sessions" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600">{selectedMentee.totalSessions}</p>
                      <p className="text-sm text-foreground-muted">Total Sessions</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">{selectedMentee.completedSessions}</p>
                      <p className="text-sm text-foreground-muted">Completed</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-yellow-600">{selectedMentee.upcomingSessions}</p>
                      <p className="text-sm text-foreground-muted">Upcoming</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Session History</h4>
                  {selectedMentee.sessionHistory.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                      <div>
                        <p className="font-medium">{session.topic}</p>
                        <p className="text-sm text-foreground-muted">
                          {new Date(session.date).toLocaleDateString()} • {session.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{session.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="progress" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Overall Progress</h4>
                      <span className="text-lg font-bold">{selectedMentee.progress}%</span>
                    </div>
                    <Progress value={selectedMentee.progress} className="h-3" />
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Progress Notes</h4>
                    {selectedMentee.progressNotes.map((note, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-md">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-medium">{new Date(note.date).toLocaleDateString()}</p>
                        </div>
                        <p className="text-sm text-foreground-muted">{note.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notes" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Current Notes</h4>
                    <div className="p-3 bg-muted/50 rounded-md">
                      <p className="text-sm">{selectedMentee.notes}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Add New Note</h4>
                    <Textarea
                      placeholder="Add a note about this mentee..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="mb-2"
                    />
                    <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                      <Send className="mr-2 h-4 w-4" />
                      Add Note
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MenteesPage;