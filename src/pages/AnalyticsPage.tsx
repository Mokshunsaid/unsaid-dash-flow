import React, { useState } from 'react';
import { 
  TrendingUp, DollarSign, Users, Clock, Calendar, 
  Star, BarChart3, PieChart, Target, Award, 
  ArrowUpRight, ArrowDownRight, Eye, Download,
  Filter, Calendar as CalendarIcon, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock analytics data
const monthlyRevenue = [
  { month: 'Jan', revenue: 4500, sessions: 15 },
  { month: 'Feb', revenue: 5200, sessions: 18 },
  { month: 'Mar', revenue: 4800, sessions: 16 },
  { month: 'Apr', revenue: 6100, sessions: 22 },
  { month: 'May', revenue: 7200, sessions: 25 },
  { month: 'Jun', revenue: 8100, sessions: 28 }
];

const sessionTypes = [
  { type: 'Career Guidance', sessions: 45, revenue: 13500, color: 'bg-blue-500' },
  { type: 'Technical Interview', sessions: 32, revenue: 9600, color: 'bg-green-500' },
  { type: 'Business Strategy', sessions: 28, revenue: 11200, color: 'bg-purple-500' },
  { type: 'Resume Review', sessions: 18, revenue: 3600, color: 'bg-orange-500' },
  { type: 'Skill Development', sessions: 15, revenue: 4500, color: 'bg-pink-500' }
];

const topMentees = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/api/placeholder/32/32",
    sessions: 12,
    totalSpent: 3600,
    avgRating: 4.9,
    lastSession: "2024-01-15"
  },
  {
    id: 2,
    name: "Maria Santos",
    avatar: "/api/placeholder/32/32",
    sessions: 10,
    totalSpent: 3000,
    avgRating: 4.8,
    lastSession: "2024-01-12"
  },
  {
    id: 3,
    name: "David Chen",
    avatar: "/api/placeholder/32/32",
    sessions: 8,
    totalSpent: 2400,
    avgRating: 5.0,
    lastSession: "2024-01-10"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    avatar: "/api/placeholder/32/32",
    sessions: 7,
    totalSpent: 2100,
    avgRating: 4.7,
    lastSession: "2024-01-08"
  }
];

const recentFeedback = [
  {
    id: 1,
    mentee: "Alex Johnson",
    rating: 5,
    comment: "Exceptional guidance on career transition. Very insightful and practical advice.",
    date: "2024-01-15",
    sessionType: "Career Guidance"
  },
  {
    id: 2,
    mentee: "Maria Santos",
    rating: 5,
    comment: "Great technical interview preparation. Helped me land my dream job!",
    date: "2024-01-12",
    sessionType: "Technical Interview"
  },
  {
    id: 3,
    mentee: "David Chen",
    rating: 4,
    comment: "Solid business strategy insights. Would recommend to others.",
    date: "2024-01-10",
    sessionType: "Business Strategy"
  }
];

const goals = [
  {
    id: 1,
    title: "Monthly Revenue",
    target: 10000,
    current: 8100,
    unit: "$",
    period: "This Month"
  },
  {
    id: 2,
    title: "Sessions Completed",
    target: 35,
    current: 28,
    unit: "",
    period: "This Month"
  },
  {
    id: 3,
    title: "Average Rating",
    target: 4.8,
    current: 4.6,
    unit: "★",
    period: "Last 30 days"
  },
  {
    id: 4,
    title: "New Mentees",
    target: 10,
    current: 7,
    unit: "",
    period: "This Month"
  }
];

export const AnalyticsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const totalRevenue = monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0);
  const totalSessions = monthlyRevenue.reduce((sum, month) => sum + month.sessions, 0);
  const avgSessionValue = totalRevenue / totalSessions;

  const getChangePercentage = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return { value: Math.abs(change), isPositive: change >= 0 };
  };

  const currentMonthRevenue = monthlyRevenue[monthlyRevenue.length - 1]?.revenue || 0;
  const previousMonthRevenue = monthlyRevenue[monthlyRevenue.length - 2]?.revenue || 0;
  const revenueChange = getChangePercentage(currentMonthRevenue, previousMonthRevenue);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-3 w-3 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-foreground-muted">Track your mentoring performance and growth</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  {revenueChange.isPositive ? (
                    <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span className={`text-xs ${revenueChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {revenueChange.value.toFixed(1)}%
                  </span>
                  <span className="text-xs text-foreground-muted ml-1">vs last month</span>
                </div>
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
                <p className="text-2xl font-bold">{totalSessions}</p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">12.5%</span>
                  <span className="text-xs text-foreground-muted ml-1">vs last month</span>
                </div>
              </div>
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Avg Session Value</p>
                <p className="text-2xl font-bold">${avgSessionValue.toFixed(0)}</p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">8.2%</span>
                  <span className="text-xs text-foreground-muted ml-1">vs last month</span>
                </div>
              </div>
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Average Rating</p>
                <p className="text-2xl font-bold">4.6</p>
                <div className="flex items-center mt-1">
                  {renderStars(4.6)}
                  <span className="text-xs text-foreground-muted ml-2">({totalSessions} reviews)</span>
                </div>
              </div>
              <Star className="h-6 w-6 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyRevenue.map((month, index) => (
                    <div key={month.month} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium">{month.month}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">${month.revenue.toLocaleString()}</span>
                          <span className="text-xs text-foreground-muted">{month.sessions} sessions</span>
                        </div>
                        <Progress 
                          value={(month.revenue / Math.max(...monthlyRevenue.map(m => m.revenue))) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Session Types */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Session Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sessionTypes.map((type, index) => {
                    const percentage = (type.sessions / sessionTypes.reduce((sum, t) => sum + t.sessions, 0)) * 100;
                    return (
                      <div key={type.type} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{type.type}</span>
                            <span className="text-xs text-foreground-muted">{percentage.toFixed(1)}%</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-foreground-muted">
                            <span>{type.sessions} sessions</span>
                            <span>${type.revenue.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Mentees */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Top Mentees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topMentees.map((mentee, index) => (
                  <div key={mentee.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-sm font-bold text-foreground-muted">#{index + 1}</div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={mentee.avatar} />
                        <AvatarFallback>{mentee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{mentee.name}</h4>
                        <p className="text-xs text-foreground-muted">Last session: {mentee.lastSession}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm font-bold">{mentee.sessions}</p>
                        <p className="text-xs text-foreground-muted">Sessions</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold">${mentee.totalSpent.toLocaleString()}</p>
                        <p className="text-xs text-foreground-muted">Spent</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-bold">{mentee.avgRating}</span>
                        </div>
                        <p className="text-xs text-foreground-muted">Rating</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Analysis */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="dashboard-card lg:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {monthlyRevenue.map((month, index) => {
                    const prevMonth = index > 0 ? monthlyRevenue[index - 1] : null;
                    const growth = prevMonth ? ((month.revenue - prevMonth.revenue) / prevMonth.revenue) * 100 : 0;
                    
                    return (
                      <div key={month.month} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{month.month} 2024</h4>
                          <div className="flex items-center gap-2">
                            {growth !== 0 && (
                              <div className="flex items-center">
                                {growth > 0 ? (
                                  <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                                )}
                                <span className={`text-xs ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {Math.abs(growth).toFixed(1)}%
                                </span>
                              </div>
                            )}
                            <span className="font-bold">${month.revenue.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-foreground-muted">
                          <div>Sessions: {month.sessions}</div>
                          <div>Avg/Session: ${(month.revenue / month.sessions).toFixed(0)}</div>
                          <div>Rate: ${(month.revenue / month.sessions).toFixed(0)}/hr</div>
                        </div>
                        <Progress 
                          value={(month.revenue / Math.max(...monthlyRevenue.map(m => m.revenue))) * 100} 
                          className="mt-2 h-2"
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Revenue by Session Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessionTypes.map(type => {
                    const avgPrice = type.revenue / type.sessions;
                    return (
                      <div key={type.type} className="border-b pb-3 last:border-b-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{type.type}</span>
                          <span className="font-bold">${type.revenue.toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-foreground-muted grid grid-cols-2 gap-2">
                          <span>{type.sessions} sessions</span>
                          <span>Avg: ${avgPrice.toFixed(0)}</span>
                        </div>
                        <Progress 
                          value={(type.revenue / sessionTypes.reduce((sum, t) => sum + t.revenue, 0)) * 100} 
                          className="mt-2 h-1"
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sessions Analysis */}
        <TabsContent value="sessions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Session Volume Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyRevenue.map((month, index) => {
                    const prevMonth = index > 0 ? monthlyRevenue[index - 1] : null;
                    const growth = prevMonth ? ((month.sessions - prevMonth.sessions) / prevMonth.sessions) * 100 : 0;
                    
                    return (
                      <div key={month.month} className="flex items-center gap-4">
                        <div className="w-12 text-sm font-medium">{month.month}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-bold">{month.sessions} sessions</span>
                            {growth !== 0 && (
                              <div className="flex items-center">
                                {growth > 0 ? (
                                  <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                                )}
                                <span className={`text-xs ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {Math.abs(growth).toFixed(1)}%
                                </span>
                              </div>
                            )}
                          </div>
                          <Progress 
                            value={(month.sessions / Math.max(...monthlyRevenue.map(m => m.sessions))) * 100} 
                            className="h-2"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Session Type Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessionTypes.sort((a, b) => b.sessions - a.sessions).map((type, index) => (
                    <div key={type.type} className="flex items-center gap-3">
                      <div className="text-sm font-bold text-foreground-muted">#{index + 1}</div>
                      <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{type.type}</span>
                          <div className="text-right">
                            <div className="font-bold">{type.sessions}</div>
                            <div className="text-xs text-foreground-muted">sessions</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Feedback */}
        <TabsContent value="feedback" className="space-y-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Recent Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFeedback.map(feedback => (
                  <div key={feedback.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{feedback.mentee}</h4>
                        <p className="text-sm text-foreground-muted">{feedback.sessionType}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end mb-1">
                          {renderStars(feedback.rating)}
                        </div>
                        <p className="text-xs text-foreground-muted">{feedback.date}</p>
                      </div>
                    </div>
                    <p className="text-sm italic text-foreground-muted">"{feedback.comment}"</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals */}
        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map(goal => {
              const percentage = Math.min((goal.current / goal.target) * 100, 100);
              const isOnTrack = percentage >= 75;
              
              return (
                <Card key={goal.id} className="dashboard-card">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <Badge variant={isOnTrack ? "default" : "secondary"}>
                        {isOnTrack ? "On Track" : "Behind"}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground-muted">{goal.period}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">
                          {goal.unit === "$" && "$"}{goal.current}{goal.unit !== "$" && goal.unit}
                        </span>
                        <span className="text-sm text-foreground-muted">
                          / {goal.unit === "$" && "$"}{goal.target}{goal.unit !== "$" && goal.unit}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className={percentage >= 100 ? "text-green-600" : "text-foreground-muted"}>
                          {percentage.toFixed(1)}% complete
                        </span>
                        <span className="text-foreground-muted">
                          {goal.target - goal.current > 0 ? `${goal.target - goal.current} to go` : "Goal exceeded!"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;