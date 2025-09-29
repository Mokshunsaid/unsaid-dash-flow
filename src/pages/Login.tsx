import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, EyeOff, Lock, Mail, User, Users, Shield, 
  BookOpen, Briefcase, Settings, ArrowRight, AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

type UserRole = 'mentee' | 'mentor' | 'admin' | 'super-admin';

interface LoginFormData {
  email: string;
  password: string;
  role: UserRole;
}

interface RoleOption {
  value: UserRole;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  features: string[];
  color: string;
  bgColor: string;
}

const roleOptions: RoleOption[] = [
  {
    value: 'mentee',
    label: 'Mentee',
    icon: BookOpen,
    description: 'Learn from industry experts and accelerate your career growth',
    features: ['Find mentors', 'Book sessions', 'Track progress', 'Join cohorts'],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200'
  },
  {
    value: 'mentor',
    label: 'Mentor',
    icon: Briefcase,
    description: 'Share your expertise and help others achieve their goals',
    features: ['Manage mentees', 'Set availability', 'Earn income', 'Track analytics'],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200'
  },
  {
    value: 'admin',
    label: 'Admin',
    icon: Users,
    description: 'Manage platform operations and moderate user activities',
    features: ['User management', 'Session oversight', 'Platform analytics', 'Support tools'],
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200'
  },
  {
    value: 'super-admin',
    label: 'Super Admin',
    icon: Shield,
    description: 'Full system access and platform administration',
    features: ['System settings', 'User roles', 'Financial controls', 'Security management'],
    color: 'text-red-600',
    bgColor: 'bg-red-50 border-red-200'
  }
];

// Mock users for demo purposes
const mockUsers = {
  mentee: {
    email: 'alex@example.com',
    password: 'password123',
    name: 'Alex Johnson',
    avatar: '/avatars/alex.jpg'
  },
  mentor: {
    email: 'sarah@example.com',
    password: 'password123',
    name: 'Sarah Chen',
    avatar: '/avatars/sarah.jpg'
  },
  admin: {
    email: 'admin@example.com',
    password: 'password123',
    name: 'Michael Admin',
    avatar: '/avatars/admin.jpg'
  },
  'super-admin': {
    email: 'superadmin@example.com',
    password: 'password123',
    name: 'Super Admin',
    avatar: '/avatars/superadmin.jpg'
  }
};

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('mentee');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: '',
    role: 'mentee'
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'mentee' as UserRole
  });

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setLoginData(prev => ({ ...prev, role }));
    setRegisterData(prev => ({ ...prev, role }));
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser = mockUsers[loginData.role];
      
      if (loginData.email === mockUser.email && loginData.password === mockUser.password) {
        const user = {
          ...mockUser,
          role: loginData.role,
          id: Math.random().toString(36).substr(2, 9)
        };
        
        await login(user);
        navigate('/');
      } else {
        setError('Invalid email or password for the selected role');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (registerData.password !== registerData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (registerData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: registerData.name,
        email: registerData.email,
        role: registerData.role,
        avatar: '/avatars/default.jpg'
      };
      
      await login(user);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (role: UserRole) => {
    const mockUser = mockUsers[role];
    setLoginData({
      email: mockUser.email,
      password: mockUser.password,
      role: role
    });
    setSelectedRole(role);
    setError(null);
  };

  const currentRoleOption = roleOptions.find(option => option.value === selectedRole)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding & Role Selection */}
        <div className="space-y-8">
          {/* Logo & Welcome */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <img 
                src="/unsaidtalks-logo-new.png" 
                alt="UnsaidTalks - Unfold Success From Untold Experiences" 
                className="h-16 w-auto"
              />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back!</h2>
            <p className="text-foreground-muted">Choose your role to access your personalized dashboard</p>
          </div>

          {/* Role Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Select Your Role:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roleOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedRole === option.value;
                
                return (
                  <Card 
                    key={option.value}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isSelected ? `ring-2 ring-primary ${option.bgColor}` : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleRoleSelect(option.value)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Icon className={`h-6 w-6 ${option.color} flex-shrink-0 mt-1`} />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground">{option.label}</h4>
                          <p className="text-xs text-foreground-muted mb-2 line-clamp-2">
                            {option.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {option.features.slice(0, 2).map((feature) => (
                              <Badge key={feature} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {option.features.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{option.features.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-3">Demo Credentials:</h4>
            <div className="grid grid-cols-2 gap-2">
              {roleOptions.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials(option.value)}
                  className="text-xs justify-start"
                >
                  <option.icon className="h-3 w-3 mr-1" />
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login/Register Forms */}
        <div className="w-full max-w-md mx-auto">
          <Card className="dashboard-card-elevated">
            <CardHeader className="space-y-4">
              <div className="text-center">
                <CardTitle className="text-xl">
                  {activeTab === 'login' ? 'Sign In' : 'Create Account'}
                </CardTitle>
                <CardDescription>
                  {activeTab === 'login' 
                    ? `Sign in to your ${currentRoleOption.label.toLowerCase()} account`
                    : `Create a new ${currentRoleOption.label.toLowerCase()} account`
                  }
                </CardDescription>
              </div>
              
              {/* Selected Role Display */}
              <div className={`p-3 rounded-lg border ${currentRoleOption.bgColor}`}>
                <div className="flex items-center gap-2">
                  <currentRoleOption.icon className={`h-4 w-4 ${currentRoleOption.color}`} />
                  <span className="font-medium text-sm">
                    Signing in as {currentRoleOption.label}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                {error && (
                  <Alert className="mb-4" variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Login Form */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-muted h-4 w-4" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={loginData.email}
                          onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-muted h-4 w-4" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full btn-primary" 
                      disabled={isLoading}
                      size="lg"
                    >
                      {isLoading ? 'Signing In...' : 'Sign In'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <div className="text-center">
                      <Button 
                        type="button"
                        variant="link" 
                        onClick={() => navigate('/forgot-password')}
                        className="text-sm text-primary hover:text-primary-dark"
                      >
                        Forgot Password?
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                {/* Register Form */}
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-muted h-4 w-4" />
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          value={registerData.name}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-muted h-4 w-4" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={registerData.email}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-muted h-4 w-4" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={registerData.password}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                          className="pl-10"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-muted h-4 w-4" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full btn-primary" 
                      disabled={isLoading}
                      size="lg"
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;