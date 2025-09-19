import React, { useState } from 'react';
import { 
  Calendar, Clock, Plus, Settings, Save, RefreshCw, Bell, 
  ChevronLeft, ChevronRight, CalendarDays, Video, MapPin,
  Edit3, Trash2, Copy, Globe, Smartphone, Monitor, Check, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Mock data for availability
const timeSlots = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM', '9:00 PM'
];

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const initialSchedule = {
  Monday: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'],
  Tuesday: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'],
  Wednesday: ['10:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'],
  Thursday: ['9:00 AM', '11:00 AM', '2:00 PM', '5:00 PM'],
  Friday: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'],
  Saturday: ['10:00 AM', '2:00 PM'],
  Sunday: []
};

const upcomingBookings = [
  {
    id: 1,
    mentee: "Alex Johnson",
    date: "2025-09-22",
    time: "2:00 PM",
    duration: "60 min",
    type: "Career Guidance",
    status: "confirmed",
    platform: "Google Meet"
  },
  {
    id: 2,
    mentee: "Maria Santos",
    date: "2025-09-23",
    time: "10:00 AM",
    duration: "45 min",
    type: "Technical Interview",
    status: "pending",
    platform: "Zoom"
  },
  {
    id: 3,
    mentee: "David Chen",
    date: "2025-09-25",
    time: "4:00 PM",
    duration: "60 min",
    type: "Business Strategy",
    status: "confirmed",
    platform: "Google Meet"
  }
];

const bookedSlots = [
  { day: 'Monday', time: '2:00 PM', mentee: 'Alex Johnson' },
  { day: 'Tuesday', time: '11:00 AM', mentee: 'Maria Santos' },
  { day: 'Wednesday', time: '4:00 PM', mentee: 'David Chen' }
];

export const AvailabilityPage: React.FC = () => {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [isEditMode, setIsEditMode] = useState(false);
  const [settings, setSettings] = useState({
    defaultDuration: '60',
    bufferTime: '15',
    maxAdvanceBooking: '30',
    timeZone: 'PST',
    autoAcceptBookings: true,
    emailNotifications: true,
    smsNotifications: false,
    calendarSync: true
  });
  const [newSlotTime, setNewSlotTime] = useState('');
  const [showAddSlotDialog, setShowAddSlotDialog] = useState(false);

  const addTimeSlot = (day: string, time: string) => {
    if (time && !schedule[day].includes(time)) {
      setSchedule(prev => ({
        ...prev,
        [day]: [...prev[day], time].sort((a, b) => {
          const timeA = new Date(`1970/01/01 ${a}`);
          const timeB = new Date(`1970/01/01 ${b}`);
          return timeA.getTime() - timeB.getTime();
        })
      }));
    }
  };

  const removeTimeSlot = (day: string, time: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day].filter(slot => slot !== time)
    }));
  };

  const copySchedule = (fromDay: string, toDay: string) => {
    setSchedule(prev => ({
      ...prev,
      [toDay]: [...prev[fromDay]]
    }));
  };

  const clearSchedule = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: []
    }));
  };

  const isSlotBooked = (day: string, time: string) => {
    return bookedSlots.some(slot => slot.day === day && slot.time === time);
  };

  const getBookedMentee = (day: string, time: string) => {
    const slot = bookedSlots.find(slot => slot.day === day && slot.time === time);
    return slot?.mentee;
  };

  const getTotalWeeklyHours = () => {
    const totalSlots = Object.values(schedule).reduce((sum, slots) => sum + slots.length, 0);
    return totalSlots; // Assuming each slot is 1 hour
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Availability Management</h1>
          <p className="text-foreground-muted">Manage your schedule and booking preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsEditMode(!isEditMode)}>
            <Edit3 className="mr-2 h-4 w-4" />
            {isEditMode ? 'View Mode' : 'Edit Mode'}
          </Button>
          <Button className="btn-primary">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Weekly Hours</p>
                <p className="text-2xl font-bold">{getTotalWeeklyHours()}h</p>
              </div>
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">This Week Booked</p>
                <p className="text-2xl font-bold text-green-600">{bookedSlots.length}</p>
              </div>
              <CalendarDays className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Available Slots</p>
                <p className="text-2xl font-bold text-blue-600">{getTotalWeeklyHours() - bookedSlots.length}</p>
              </div>
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Utilization Rate</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round((bookedSlots.length / getTotalWeeklyHours()) * 100)}%
                </p>
              </div>
              <RefreshCw className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="bookings">Upcoming Bookings</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Schedule Management */}
        <TabsContent value="schedule" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Day Selection */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-lg">Days</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {weekDays.map(day => (
                  <Button
                    key={day}
                    variant={selectedDay === day ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedDay(day)}
                  >
                    <span className="flex-1">{day}</span>
                    <Badge variant="secondary" className="ml-2">
                      {schedule[day]?.length || 0}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Selected Day Schedule */}
            <Card className="dashboard-card lg:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">{selectedDay} Schedule</CardTitle>
                <div className="flex gap-2">
                  {isEditMode && (
                    <>
                      <Dialog open={showAddSlotDialog} onOpenChange={setShowAddSlotDialog}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Slot
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Time Slot</DialogTitle>
                            <DialogDescription>
                              Add a new available time slot for {selectedDay}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Select Time</Label>
                              <Select value={newSlotTime} onValueChange={setNewSlotTime}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeSlots.filter(time => !schedule[selectedDay]?.includes(time)).map(time => (
                                    <SelectItem key={time} value={time}>{time}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                onClick={() => {
                                  if (newSlotTime) {
                                    addTimeSlot(selectedDay, newSlotTime);
                                    setNewSlotTime('');
                                    setShowAddSlotDialog(false);
                                  }
                                }}
                                className="flex-1"
                              >
                                Add Slot
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={() => setShowAddSlotDialog(false)}
                                className="flex-1"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="outline" onClick={() => clearSchedule(selectedDay)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {schedule[selectedDay]?.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {schedule[selectedDay].map(time => {
                      const isBooked = isSlotBooked(selectedDay, time);
                      const bookedMentee = getBookedMentee(selectedDay, time);
                      
                      return (
                        <div
                          key={time}
                          className={`p-3 rounded-lg border transition-all ${
                            isBooked 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{time}</span>
                            {isEditMode && !isBooked && (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6"
                                onClick={() => removeTimeSlot(selectedDay, time)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                          {isBooked ? (
                            <div>
                              <Badge className="text-xs bg-green-100 text-green-800">
                                Booked
                              </Badge>
                              <p className="text-xs text-foreground-muted mt-1">{bookedMentee}</p>
                            </div>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              Available
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-foreground-muted mx-auto mb-4" />
                    <h3 className="font-medium text-foreground mb-2">No availability set</h3>
                    <p className="text-foreground-muted mb-4">Add time slots for {selectedDay}</p>
                    {isEditMode && (
                      <Button onClick={() => setShowAddSlotDialog(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Time Slot
                      </Button>
                    )}
                  </div>
                )}

                {isEditMode && schedule[selectedDay]?.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Quick Actions:</p>
                    <div className="flex flex-wrap gap-2">
                      {weekDays.filter(day => day !== selectedDay).map(day => (
                        <Button
                          key={day}
                          size="sm"
                          variant="outline"
                          onClick={() => copySchedule(selectedDay, day)}
                        >
                          <Copy className="mr-1 h-3 w-3" />
                          Copy to {day}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Upcoming Bookings */}
        <TabsContent value="bookings" className="space-y-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingBookings.map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{booking.mentee}</h4>
                          <p className="text-sm text-foreground-muted">{booking.type}</p>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-foreground-muted">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(booking.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {booking.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <RefreshCw className="h-3 w-3" />
                          {booking.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Video className="h-3 w-3" />
                          {booking.platform}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Edit3 className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      {booking.status === 'confirmed' && (
                        <Button size="sm" className="btn-primary">
                          <Video className="h-3 w-3 mr-1" />
                          Join
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Session Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Default Session Duration</Label>
                  <Select value={settings.defaultDuration} onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, defaultDuration: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Buffer Time Between Sessions</Label>
                  <Select value={settings.bufferTime} onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, bufferTime: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No buffer</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Maximum Advance Booking</Label>
                  <Select value={settings.maxAdvanceBooking} onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, maxAdvanceBooking: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">1 week</SelectItem>
                      <SelectItem value="14">2 weeks</SelectItem>
                      <SelectItem value="30">1 month</SelectItem>
                      <SelectItem value="60">2 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Time Zone</Label>
                  <Select value={settings.timeZone} onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, timeZone: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PST">Pacific (PST)</SelectItem>
                      <SelectItem value="MST">Mountain (MST)</SelectItem>
                      <SelectItem value="CST">Central (CST)</SelectItem>
                      <SelectItem value="EST">Eastern (EST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Booking & Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Auto-accept bookings</Label>
                    <p className="text-sm text-foreground-muted">Automatically confirm new session requests</p>
                  </div>
                  <Switch 
                    checked={settings.autoAcceptBookings}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, autoAcceptBookings: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Email notifications</Label>
                    <p className="text-sm text-foreground-muted">Receive booking confirmations via email</p>
                  </div>
                  <Switch 
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">SMS notifications</Label>
                    <p className="text-sm text-foreground-muted">Receive booking alerts via SMS</p>
                  </div>
                  <Switch 
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, smsNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Calendar sync</Label>
                    <p className="text-sm text-foreground-muted">Sync with Google Calendar</p>
                  </div>
                  <Switch 
                    checked={settings.calendarSync}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, calendarSync: checked }))
                    }
                  />
                </div>

                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full">
                    <Globe className="mr-2 h-4 w-4" />
                    Connect Google Calendar
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Setup SMS Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AvailabilityPage;