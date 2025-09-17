import React, { useState } from 'react';
import { Target, Trophy, Clock, CheckCircle, Lock, Star, ArrowRight, BookOpen, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock learning path data
const learningPaths = [
  {
    id: 1,
    title: "Product Management Excellence",
    description: "Master the skills needed to excel as a product manager",
    progress: 65,
    totalModules: 8,
    completedModules: 5,
    estimatedTime: "12 weeks",
    difficulty: "Intermediate",
    enrolled: true,
    modules: [
      {
        id: 1,
        title: "Product Strategy Fundamentals",
        completed: true,
        locked: false,
        duration: "2 weeks",
        sessions: [
          { title: "Vision & Strategy Session with Sarah Chen", completed: true, type: "session" },
          { title: "Market Research Deep Dive", completed: true, type: "workshop" },
          { title: "Strategy Presentation Review", completed: true, type: "assignment" }
        ]
      },
      {
        id: 2,
        title: "User Research & Analytics",
        completed: true,
        locked: false,
        duration: "2 weeks",
        sessions: [
          { title: "User Interview Techniques", completed: true, type: "session" },
          { title: "Analytics Setup Workshop", completed: true, type: "workshop" }
        ]
      },
      {
        id: 3,
        title: "Product Roadmapping",
        completed: true,
        locked: false,
        duration: "1.5 weeks",
        sessions: [
          { title: "Roadmap Strategy Session", completed: true, type: "session" },
          { title: "Prioritization Framework", completed: true, type: "workshop" }
        ]
      },
      {
        id: 4,
        title: "Stakeholder Management",
        completed: true,
        locked: false,
        duration: "1 week",
        sessions: [
          { title: "Cross-functional Leadership", completed: true, type: "session" }
        ]
      },
      {
        id: 5,
        title: "Go-to-Market Strategy",
        completed: true,
        locked: false,
        duration: "2 weeks",
        sessions: [
          { title: "Launch Strategy Session", completed: true, type: "session" },
          { title: "GTM Plan Review", completed: false, type: "assignment" }
        ]
      },
      {
        id: 6,
        title: "Product Metrics & KPIs",
        completed: false,
        locked: false,
        duration: "1.5 weeks",
        sessions: [
          { title: "Metrics Framework Session", completed: false, type: "session" },
          { title: "Dashboard Creation Workshop", completed: false, type: "workshop" }
        ]
      },
      {
        id: 7,
        title: "Advanced Product Leadership",
        completed: false,
        locked: true,
        duration: "2 weeks",
        sessions: []
      },
      {
        id: 8,
        title: "Portfolio & Career Growth",
        completed: false,
        locked: true,
        duration: "1 week",
        sessions: []
      }
    ]
  },
  {
    id: 2,
    title: "Full Stack Engineering Mastery",
    description: "Comprehensive path from junior to senior engineer",
    progress: 30,
    totalModules: 10,
    completedModules: 3,
    estimatedTime: "16 weeks",
    difficulty: "Advanced",
    enrolled: true,
    modules: []
  },
  {
    id: 3,
    title: "UX Design Leadership Track",
    description: "Transition from IC designer to design leader",
    progress: 0,
    totalModules: 6,
    completedModules: 0,
    estimatedTime: "8 weeks",
    difficulty: "Intermediate",
    enrolled: false,
    modules: []
  }
];

const achievements = [
  {
    id: 1,
    title: "First Session Complete",
    description: "Completed your first mentorship session",
    icon: "🎯",
    earned: true,
    earnedDate: "2024-01-10"
  },
  {
    id: 2,
    title: "Module Master",
    description: "Completed an entire learning module",
    icon: "📚",
    earned: true,
    earnedDate: "2024-01-15"
  },
  {
    id: 3,
    title: "Consistency Champion",
    description: "5 weeks of consistent progress",
    icon: "⚡",
    earned: true,
    earnedDate: "2024-01-18"
  },
  {
    id: 4,
    title: "Feedback Master",
    description: "Received 5-star feedback on 10 sessions",
    icon: "⭐",
    earned: false
  },
  {
    id: 5,
    title: "Goal Crusher",
    description: "Complete a full learning path",
    icon: "🏆",
    earned: false
  }
];

export const LearningPath: React.FC = () => {
  const [activeTab, setActiveTab] = useState('paths');
  const [selectedPath, setSelectedPath] = useState(learningPaths[0]);

  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'session': return <Play className="h-4 w-4" />;
      case 'workshop': return <BookOpen className="h-4 w-4" />;
      case 'assignment': return <Target className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Learning Path</h1>
          <p className="text-foreground-muted">Structured programs to accelerate your career growth</p>
        </div>
        
        <Button className="btn-primary">
          <Target className="mr-2 h-4 w-4" />
          Explore New Paths
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        {/* Learning Paths Overview */}
        <TabsContent value="paths" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {learningPaths.map((path) => (
              <Card key={path.id} className={`dashboard-card cursor-pointer transition-all duration-200 ${
                path.enrolled ? 'ring-2 ring-primary/20' : ''
              } hover:shadow-lg`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{path.title}</CardTitle>
                      <p className="text-sm text-foreground-muted mt-1">{path.description}</p>
                    </div>
                    {path.enrolled && (
                      <Badge className="badge-success">Enrolled</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {path.enrolled && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-foreground-muted">Duration</div>
                      <div className="font-medium">{path.estimatedTime}</div>
                    </div>
                    <div>
                      <div className="text-foreground-muted">Difficulty</div>
                      <div className="font-medium">{path.difficulty}</div>
                    </div>
                    <div>
                      <div className="text-foreground-muted">Modules</div>
                      <div className="font-medium">{path.completedModules}/{path.totalModules}</div>
                    </div>
                  </div>
                  
                  <Button 
                    className={path.enrolled ? "w-full" : "w-full btn-primary"}
                    variant={path.enrolled ? "outline" : "default"}
                    onClick={() => path.enrolled && setSelectedPath(path)}
                  >
                    {path.enrolled ? 'Continue Learning' : 'Enroll Now'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Detailed Progress */}
        <TabsContent value="progress" className="space-y-6 mt-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                {selectedPath.title}
              </CardTitle>
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{selectedPath.progress}%</span>
              </div>
              <Progress value={selectedPath.progress} className="h-3" />
            </CardHeader>
          </Card>

          <div className="space-y-4">
            {selectedPath.modules.map((module, index) => (
              <Card key={module.id} className={`dashboard-card ${module.locked ? 'opacity-60' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      module.completed ? 'bg-success text-white' :
                      module.locked ? 'bg-muted text-foreground-muted' :
                      'bg-primary text-primary-foreground'
                    }`}>
                      {module.completed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : module.locked ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{module.title}</h3>
                          <p className="text-sm text-foreground-muted">Duration: {module.duration}</p>
                        </div>
                        {module.completed && (
                          <Badge className="badge-success">Completed</Badge>
                        )}
                      </div>
                      
                      {module.sessions.length > 0 && (
                        <div className="space-y-2 mt-4">
                          {module.sessions.map((session, sessionIndex) => (
                            <div key={sessionIndex} className="flex items-center gap-3 p-2 bg-muted/30 rounded-md">
                              <div className={`flex-shrink-0 ${session.completed ? 'text-success' : 'text-foreground-muted'}`}>
                                {session.completed ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  getSessionIcon(session.type)
                                )}
                              </div>
                              <span className={`text-sm ${session.completed ? 'text-foreground' : 'text-foreground-muted'}`}>
                                {session.title}
                              </span>
                              <Badge variant="outline" className="ml-auto text-xs">
                                {session.type}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {!module.locked && !module.completed && (
                        <Button className="mt-3 btn-primary" size="sm">
                          Start Module
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Achievements */}
        <TabsContent value="achievements" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`dashboard-card ${
                achievement.earned ? 'border-success/20 bg-success/5' : 'opacity-60'
              }`}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="font-semibold text-foreground mb-2">{achievement.title}</h3>
                  <p className="text-sm text-foreground-muted mb-4">{achievement.description}</p>
                  
                  {achievement.earned ? (
                    <div>
                      <Badge className="badge-success mb-2">Earned</Badge>
                      <p className="text-xs text-foreground-muted">Earned on {achievement.earnedDate}</p>
                    </div>
                  ) : (
                    <Badge variant="outline">In Progress</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-warning" />
                Achievement Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm mb-2">
                <span>Achievements Unlocked</span>
                <span>{achievements.filter(a => a.earned).length}/{achievements.length}</span>
              </div>
              <Progress 
                value={(achievements.filter(a => a.earned).length / achievements.length) * 100} 
                className="h-2"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningPath;