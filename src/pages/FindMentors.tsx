import React, { useState } from 'react';
import { Search, Filter, Star, Calendar, MapPin, Users, Video, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock mentor data
const mentors = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Product Manager",
    company: "Google",
    avatar: "/avatars/sarah.jpg",
    rating: 4.9,
    reviewCount: 127,
    expertise: ["Product Management", "Strategy", "Leadership"],
    cohorts: ["Product Management Bootcamp", "Tech Leadership"],
    location: "San Francisco, CA",
    hourlyRate: 150,
    totalSessions: 312,
    bio: "10+ years in product management at top tech companies. Specialized in B2B SaaS and marketplace products.",
    availability: "Available this week",
    languages: ["English", "Mandarin"],
    menteeCount: 45
  },
  {
    id: 2,
    name: "David Kumar",
    title: "Staff Software Engineer",
    company: "Meta",
    avatar: "/avatars/david.jpg",
    rating: 4.8,
    reviewCount: 89,
    expertise: ["Software Engineering", "System Design", "Career Growth"],
    cohorts: ["Full Stack Development", "System Design Mastery"],
    location: "Seattle, WA",
    hourlyRate: 120,
    totalSessions: 198,
    bio: "Passionate about mentoring engineers to reach their next level. Expert in distributed systems and scalability.",
    availability: "Available in 3 days",
    languages: ["English", "Hindi"],
    menteeCount: 32
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "UX Design Director",
    company: "Airbnb",
    avatar: "/avatars/emily.jpg",
    rating: 5.0,
    reviewCount: 156,
    expertise: ["UX Design", "Design Strategy", "Team Management"],
    cohorts: ["UX Design Fundamentals", "Design Leadership"],
    location: "Austin, TX",
    hourlyRate: 180,
    totalSessions: 267,
    bio: "Leading design teams for 8+ years. Helps designers grow from IC to leadership roles.",
    availability: "Available today",
    languages: ["English", "Spanish"],
    menteeCount: 58
  },
  {
    id: 4,
    name: "Michael Thompson",
    title: "Data Science Manager",
    company: "Netflix",
    avatar: "/avatars/michael.jpg",
    rating: 4.7,
    reviewCount: 73,
    expertise: ["Data Science", "Machine Learning", "Analytics"],
    cohorts: ["Data Science Bootcamp", "ML Engineering"],
    location: "Los Angeles, CA",
    hourlyRate: 140,
    totalSessions: 145,
    bio: "Transforming businesses through data-driven insights. Expert in ML infrastructure and team scaling.",
    availability: "Available next week",
    languages: ["English"],
    menteeCount: 28
  },
  {
    id: 5,
    name: "Priya Singh",
    title: "AI Research Scientist",
    company: "OpenAI",
    avatar: "/avatars/priya.jpg",
    rating: 4.95,
    reviewCount: 102,
    expertise: ["Artificial Intelligence", "Machine Learning", "Research"],
    cohorts: ["AI Bootcamp", "ML Engineering"],
    location: "Bangalore, India",
    hourlyRate: 160,
    totalSessions: 210,
    bio: "Researching and building state-of-the-art AI models. Loves mentoring students and professionals in AI.",
    availability: "Available today",
    languages: ["English", "Hindi"],
    menteeCount: 40
  }
];

const cohorts = ["All Cohorts", "Product Management Bootcamp", "Full Stack Development", "UX Design Fundamentals", "Data Science Bootcamp"];
const expertiseAreas = ["All Expertise", "Product Management", "Software Engineering", "UX Design", "Data Science", "Leadership"];

export const FindMentors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCohort, setSelectedCohort] = useState('All Cohorts');
  const [selectedExpertise, setSelectedExpertise] = useState('All Expertise');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCohort = selectedCohort === 'All Cohorts' || mentor.cohorts.includes(selectedCohort);
    const matchesExpertise = selectedExpertise === 'All Expertise' || mentor.expertise.includes(selectedExpertise);

    return matchesSearch && matchesCohort && matchesExpertise;
  });

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Find Mentors</h1>
          <p className="text-gray-600">Connect with industry experts to accelerate your growth</p>
        </div>
        <div className="flex items-center gap-2">
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

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search mentors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCohort} onValueChange={setSelectedCohort}>
              <SelectTrigger>
                <SelectValue placeholder="Select cohort" />
              </SelectTrigger>
              <SelectContent>
                {cohorts.map(cohort => (
                  <SelectItem key={cohort} value={cohort}>{cohort}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
              <SelectTrigger>
                <SelectValue placeholder="Select expertise" />
              </SelectTrigger>
              <SelectContent>
                {expertiseAreas.map(area => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredMentors.length} of {mentors.length} mentors
        </p>
      </div>

      {/* Mentors Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'}>
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <Card
              key={mentor.id}
              className="hover:shadow-lg border rounded-lg bg-white transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={mentor.avatar}
                      alt={mentor.name}
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64'; }}
                    />
                    <AvatarFallback className="bg-primary text-white text-lg">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors">
                          {mentor.name}
                        </h3>
                        <p className="text-gray-600">{mentor.title} at {mentor.company}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-sm">{mentor.rating}</span>
                        <span className="text-xs text-gray-500">({mentor.reviewCount})</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{mentor.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.expertise.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {mentor.expertise.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{mentor.expertise.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {mentor.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {mentor.menteeCount} mentees
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {mentor.availability}
                      </div>
                      <div className="font-medium text-gray-900">
                        ${mentor.hourlyRate}/hour
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Video className="mr-2 h-4 w-4" />
                        Book Session
                      </Button>
                      <Button variant="outline" size="icon">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No mentors found</p>
        )}
      </div>
    </div>
  );
};

export default FindMentors;
