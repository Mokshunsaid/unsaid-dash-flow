import React, { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  CreditCard, 
  Globe, 
  Lock, 
  Mail, 
  Moon, 
  Shield, 
  Sun, 
  User, 
  Smartphone,
  Volume2,
  Eye,
  Download,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

// Mock settings data
const initialSettings = {
  notifications: {
    email: true,
    push: true,
    sms: false,
    sessionReminders: true,
    weeklyDigest: true,
    mentorUpdates: true,
    systemUpdates: false
  },
  privacy: {
    profileVisibility: "cohort",
    showEmail: false,
    showPhone: false,
    allowDirectMessages: true,
    dataCollection: true
  },
  calendar: {
    timezone: "America/Los_Angeles",
    workingHours: {
      start: "09:00",
      end: "17:00"
    },
    availableDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    bufferTime: 15
  },
  appearance: {
    theme: "system",
    language: "en",
    currency: "USD"
  },
  account: {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false
  }
};

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState('notifications');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const updateNestedSetting = (category: string, nested: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [nested]: {
          ...(prev[category as keyof typeof prev] as any)[nested],
          [key]: value
        }
      }
    }));
    setHasUnsavedChanges(true);
  };

  const saveSettings = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings);
    setHasUnsavedChanges(false);
  };

  const resetSettings = () => {
    setSettings(initialSettings);
    setHasUnsavedChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-foreground-muted">Manage your account preferences and privacy settings</p>
        </div>
        
        {hasUnsavedChanges && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetSettings}>
              Reset
            </Button>
            <Button onClick={saveSettings} className="btn-primary">
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Delivery Methods</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-foreground-muted" />
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-foreground-muted">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => updateSetting('notifications', 'email', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-4 w-4 text-foreground-muted" />
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-foreground-muted">Receive push notifications on your devices</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => updateSetting('notifications', 'push', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Volume2 className="h-4 w-4 text-foreground-muted" />
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-foreground-muted">Receive important alerts via SMS</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications.sms}
                    onCheckedChange={(checked) => updateSetting('notifications', 'sms', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Content Preferences</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Session Reminders</Label>
                    <p className="text-sm text-foreground-muted">Reminders about upcoming sessions</p>
                  </div>
                  <Switch
                    checked={settings.notifications.sessionReminders}
                    onCheckedChange={(checked) => updateSetting('notifications', 'sessionReminders', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Digest</Label>
                    <p className="text-sm text-foreground-muted">Summary of your weekly activity</p>
                  </div>
                  <Switch
                    checked={settings.notifications.weeklyDigest}
                    onCheckedChange={(checked) => updateSetting('notifications', 'weeklyDigest', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Mentor Updates</Label>
                    <p className="text-sm text-foreground-muted">Updates from your mentors</p>
                  </div>
                  <Switch
                    checked={settings.notifications.mentorUpdates}
                    onCheckedChange={(checked) => updateSetting('notifications', 'mentorUpdates', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>System Updates</Label>
                    <p className="text-sm text-foreground-muted">Platform updates and announcements</p>
                  </div>
                  <Switch
                    checked={settings.notifications.systemUpdates}
                    onCheckedChange={(checked) => updateSetting('notifications', 'systemUpdates', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy */}
        <TabsContent value="privacy" className="space-y-6 mt-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Profile Visibility</Label>
                  <p className="text-sm text-foreground-muted mb-2">Who can see your profile information</p>
                  <Select
                    value={settings.privacy.profileVisibility}
                    onValueChange={(value) => updateSetting('privacy', 'profileVisibility', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Everyone</SelectItem>
                      <SelectItem value="cohort">My Cohorts Only</SelectItem>
                      <SelectItem value="mentors">Mentors Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Contact Information</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Email Address</Label>
                      <p className="text-sm text-foreground-muted">Allow others to see your email</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showEmail}
                      onCheckedChange={(checked) => updateSetting('privacy', 'showEmail', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Phone Number</Label>
                      <p className="text-sm text-foreground-muted">Allow others to see your phone number</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showPhone}
                      onCheckedChange={(checked) => updateSetting('privacy', 'showPhone', checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Communication</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Direct Messages</Label>
                      <p className="text-sm text-foreground-muted">Let other users send you direct messages</p>
                    </div>
                    <Switch
                      checked={settings.privacy.allowDirectMessages}
                      onCheckedChange={(checked) => updateSetting('privacy', 'allowDirectMessages', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Collection</Label>
                      <p className="text-sm text-foreground-muted">Allow analytics to improve your experience</p>
                    </div>
                    <Switch
                      checked={settings.privacy.dataCollection}
                      onCheckedChange={(checked) => updateSetting('privacy', 'dataCollection', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Download My Data
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      Delete Account
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar */}
        <TabsContent value="calendar" className="space-y-6 mt-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Calendar Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Timezone</Label>
                <Select
                  value={settings.calendar.timezone}
                  onValueChange={(value) => updateSetting('calendar', 'timezone', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Work Start Time</Label>
                  <Input
                    type="time"
                    value={settings.calendar.workingHours.start}
                    onChange={(e) => updateNestedSetting('calendar', 'workingHours', 'start', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Work End Time</Label>
                  <Input
                    type="time"
                    value={settings.calendar.workingHours.end}
                    onChange={(e) => updateNestedSetting('calendar', 'workingHours', 'end', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label>Buffer Time Between Sessions</Label>
                <Select
                  value={settings.calendar.bufferTime.toString()}
                  onValueChange={(value) => updateSetting('calendar', 'bufferTime', parseInt(value))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No Buffer</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6 mt-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Appearance & Language
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Theme</Label>
                <Select
                  value={settings.appearance.theme}
                  onValueChange={(value) => updateSetting('appearance', 'theme', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        System
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Language</Label>
                <Select
                  value={settings.appearance.language}
                  onValueChange={(value) => updateSetting('appearance', 'language', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Currency</Label>
                <Select
                  value={settings.appearance.currency}
                  onValueChange={(value) => updateSetting('appearance', 'currency', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="CAD">CAD (C$)</SelectItem>
                    <SelectItem value="AUD">AUD (A$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account */}
        <TabsContent value="account" className="space-y-6 mt-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Change Password</h3>
                
                <div>
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    value={settings.account.currentPassword}
                    onChange={(e) => updateSetting('account', 'currentPassword', e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    value={settings.account.newPassword}
                    onChange={(e) => updateSetting('account', 'newPassword', e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label>Confirm New Password</Label>
                  <Input
                    type="password"
                    value={settings.account.confirmPassword}
                    onChange={(e) => updateSetting('account', 'confirmPassword', e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <Button className="btn-primary">
                  Update Password
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-foreground-muted">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  checked={settings.account.twoFactorEnabled}
                  onCheckedChange={(checked) => updateSetting('account', 'twoFactorEnabled', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing & Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-md">
                <div>
                  <h4 className="font-medium">Premium Plan</h4>
                  <p className="text-sm text-foreground-muted">$29/month • Next billing: Feb 15, 2024</p>
                </div>
                <Badge className="badge-success">Active</Badge>
              </div>
              
              <Button variant="outline" className="w-full">
                Manage Subscription
              </Button>
              
              <Button variant="outline" className="w-full">
                Download Invoices
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;