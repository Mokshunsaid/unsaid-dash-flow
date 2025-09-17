import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Camera, Save, X, Plus, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock user data
const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  title: "Product Manager",
  company: "TechStart Inc.",
  joinDate: "January 2024",
  avatar: "/avatars/alex.jpg",
  bio: "Passionate product manager transitioning from engineering background. Interested in consumer products and marketplace platforms. Looking to learn from experienced PMs and grow into senior leadership roles.",
  skills: ["Product Strategy", "User Research", "Data Analysis", "A/B Testing", "Agile/Scrum"],
  interests: ["Product Management", "User Experience", "Growth Strategy", "Leadership"],
  goals: ["Transition to senior PM role", "Master data-driven decision making", "Build leadership skills"],
  cohorts: ["Product Management Bootcamp", "Leadership Track"],
  completedSessions: 15,
  averageRating: 4.8,
  totalHours: 24,
  mentorRating: 4.9
};

const skills = [
  "Product Strategy", "User Research", "Data Analysis", "A/B Testing", "Agile/Scrum",
  "UI/UX Design", "JavaScript", "Python", "SQL", "Project Management",
  "Leadership", "Communication", "Problem Solving", "Critical Thinking"
];

const interests = [
  "Product Management", "Software Engineering", "Data Science", "UX Design",
  "Marketing", "Sales", "Finance", "Operations", "Leadership", "Entrepreneurship"
];

export const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState(userData);
  const [newSkill, setNewSkill] = useState('');
  const [newGoal, setNewGoal] = useState('');

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
    console.log('Saving profile data:', formData);
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    });
  };

  const addGoal = () => {
    if (newGoal && !formData.goals.includes(newGoal)) {
      setFormData({
        ...formData,
        goals: [...formData.goals, newGoal]
      });
      setNewGoal('');
    }
  };

  const removeGoal = (goal: string) => {
    setFormData({
      ...formData,
      goals: formData.goals.filter(g => g !== goal)
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-foreground-muted">Manage your personal information and career goals</p>
        </div>
        
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="btn-primary">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="btn-primary">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Personal Details</TabsTrigger>
          <TabsTrigger value="skills">Skills & Goals</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        {/* Overview */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={formData.avatar} alt={formData.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                        {formData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="icon"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="text-center mt-4">
                    <h2 className="text-2xl font-bold text-foreground">{formData.name}</h2>
                    <p className="text-foreground-muted">{formData.title} at {formData.company}</p>
                    <p className="text-sm text-foreground-muted mt-1">Joined {formData.joinDate}</p>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">About</h3>
                    {isEditing ? (
                      <Textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={4}
                      />
                    ) : (
                      <p className="text-foreground-muted">{formData.bio}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-foreground-muted">
                      <Mail className="h-4 w-4" />
                      {formData.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground-muted">
                      <Phone className="h-4 w-4" />
                      {formData.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground-muted">
                      <MapPin className="h-4 w-4" />
                      {formData.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground-muted">
                      <Calendar className="h-4 w-4" />
                      Joined {formData.joinDate}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="dashboard-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{formData.completedSessions}</div>
                <div className="text-sm text-foreground-muted">Sessions Completed</div>
              </CardContent>
            </Card>
            <Card className="dashboard-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-success mb-1">{formData.totalHours}h</div>
                <div className="text-sm text-foreground-muted">Total Hours</div>
              </CardContent>
            </Card>
            <Card className="dashboard-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-warning mb-1 flex items-center justify-center gap-1">
                  <Star className="h-5 w-5 fill-current" />
                  {formData.averageRating}
                </div>
                <div className="text-sm text-foreground-muted">Average Rating</div>
              </CardContent>
            </Card>
            <Card className="dashboard-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">{formData.cohorts.length}</div>
                <div className="text-sm text-foreground-muted">Active Cohorts</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Personal Details */}
        <TabsContent value="details" className="space-y-6 mt-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={formData.name.split(' ')[0]}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        name: `${e.target.value} ${formData.name.split(' ')[1] || ''}` 
                      })}
                    />
                  ) : (
                    <div className="p-2 text-foreground">{formData.name.split(' ')[0]}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={formData.name.split(' ')[1] || ''}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        name: `${formData.name.split(' ')[0]} ${e.target.value}` 
                      })}
                    />
                  ) : (
                    <div className="p-2 text-foreground">{formData.name.split(' ')[1] || ''}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  ) : (
                    <div className="p-2 text-foreground">{formData.email}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  ) : (
                    <div className="p-2 text-foreground">{formData.phone}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  ) : (
                    <div className="p-2 text-foreground">{formData.location}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  {isEditing ? (
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  ) : (
                    <div className="p-2 text-foreground">{formData.title}</div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="company">Company</Label>
                  {isEditing ? (
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  ) : (
                    <div className="p-2 text-foreground">{formData.company}</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills & Goals */}
        <TabsContent value="skills" className="space-y-6 mt-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="relative group">
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              
              {isEditing && (
                <div className="flex gap-2">
                  <Select value={newSkill} onValueChange={setNewSkill}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Add a skill" />
                    </SelectTrigger>
                    <SelectContent>
                      {skills.filter(skill => !formData.skills.includes(skill)).map(skill => (
                        <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={addSkill} disabled={!newSkill}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {formData.interests.map((interest) => (
                  <Badge key={interest} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Career Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {formData.goals.map((goal, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="flex-1">{goal}</span>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeGoal(goal)}
                        className="h-6 w-6"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
              
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a career goal"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                  />
                  <Button onClick={addGoal} disabled={!newGoal}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity */}
        <TabsContent value="activity" className="space-y-6 mt-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Active Cohorts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {formData.cohorts.map((cohort) => (
                  <div key={cohort} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                    <span className="font-medium">{cohort}</span>
                    <Badge className="badge-success">Active</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-sm font-medium">Completed session with Sarah Chen</h4>
                    <p className="text-xs text-foreground-muted">Product Strategy session - 2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-sm font-medium">Updated profile skills</h4>
                    <p className="text-xs text-foreground-muted">Added A/B Testing skill - 1 day ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-sm font-medium">Joined Product Management Bootcamp</h4>
                    <p className="text-xs text-foreground-muted">Enrolled in new cohort - 3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;