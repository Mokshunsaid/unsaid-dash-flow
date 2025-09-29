import React from 'react';
import { Calendar, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WelcomeBannerProps {
  userName: string;
  userRole: 'mentee' | 'mentor' | 'admin' | 'super-admin';
  upcomingSessions?: number;
  completedSessions?: number;
  className?: string;
}

const roleMessages = {
  mentee: {
    greeting: "Ready to learn and grow?",
    subtitle: "Your next breakthrough is just one session away",
    cta: "Find a Mentor",
    ctaIcon: ArrowRight,
  },
  mentor: {
    greeting: "Ready to make an impact?",
    subtitle: "Your guidance shapes the next generation of leaders",
    cta: "View Sessions",
    ctaIcon: Calendar,
  },
  admin: {
    greeting: "Platform insights at your fingertips",
    subtitle: "Monitor, manage, and optimize the mentorship experience",
    cta: "View Approvals",
    ctaIcon: ArrowRight,
  },
  'super-admin': {
    greeting: "Command center is ready",
    subtitle: "Full platform control and analytics at your disposal",
    cta: "System Overview",
    ctaIcon: ArrowRight,
  },
};

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  userName,
  userRole,
  upcomingSessions = 0,
  completedSessions = 0,
  className
}) => {
  const roleConfig = roleMessages[userRole];
  const CtaIcon = roleConfig.ctaIcon;

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl bg-gradient-hero p-8 text-white",
      "slide-up",
      className
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/30 rounded-full"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-white/40 rounded-full"></div>
        <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-white/40 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {userName}! 👋
            </h1>
            <p className="text-xl mb-2 text-white/90">
              {roleConfig.greeting}
            </p>
            <p className="text-white/80 mb-6 max-w-2xl">
              {roleConfig.subtitle}
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 mb-6">
              {userRole === 'mentee' && (
                <>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-white/80" />
                    <span className="text-white/90">
                      <span className="font-semibold">{upcomingSessions}</span> upcoming sessions
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-white/80" />
                    <span className="text-white/90">
                      <span className="font-semibold">{completedSessions}</span> sessions completed
                    </span>
                  </div>
                </>
              )}
              
              {userRole === 'mentor' && (
                <>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-white/80" />
                    <span className="text-white/90">
                      <span className="font-semibold">{upcomingSessions}</span> sessions this week
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-white/80" />
                    <span className="text-white/90">
                      <span className="font-semibold">{completedSessions}</span> total sessions
                    </span>
                  </div>
                </>
              )}

              {(userRole === 'admin' || userRole === 'super-admin') && (
                <>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-white/80" />
                    <span className="text-white/90">
                      <span className="font-semibold">{upcomingSessions}</span> pending approvals
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-white/80" />
                    <span className="text-white/90">
                      <span className="font-semibold">{completedSessions}</span> sessions today
                    </span>
                  </div>
                </>
              )}
            </div>

            <Button 
              className="bg-primary hover:bg-primary-dark text-primary-foreground border border-primary/30 hover:border-primary/50 transition-all duration-200"
              size="lg"
            >
              {roleConfig.cta}
              <CtaIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Illustration placeholder - could be replaced with actual illustration */}
          <div className="hidden lg:block lg:w-80">
            <div className="relative h-48 w-full">
              <div className="absolute inset-0 bg-white/30 rounded-lg backdrop-blur-sm border border-white/40">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/40 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-white/90 text-sm">Your journey continues...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};