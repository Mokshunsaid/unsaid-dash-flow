import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home,
  Calendar,
  Users,
  Search,
  BookOpen,
  BarChart3,
  Settings,
  UserCheck,
  Clock,
  Star,
  TrendingUp,
  CheckSquare,
  UserPlus,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  userRole: 'mentee' | 'mentor' | 'admin' | 'super-admin';
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const roleNavigation: Record<string, NavItem[]> = {
  mentee: [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Find Mentors', href: '/find-mentors', icon: Search },
    { name: 'My Sessions', href: '/my-sessions', icon: Calendar },
    { name: 'Learning Path', href: '/learning-path', icon: BookOpen },
    { name: 'Profile', href: '/profile', icon: Settings },
  ],
  mentor: [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'My Sessions', href: '/my-sessions', icon: Calendar, badge: 3 },
    { name: 'My Mentees', href: '/my-mentees', icon: Users },
    { name: 'Availability', href: '/availability', icon: Clock },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Profile', href: '/profile', icon: Settings },
  ],
  admin: [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Approvals', href: '/approvals', icon: CheckSquare, badge: 12 },
    { name: 'Sessions', href: '/sessions', icon: Calendar },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp },
    { name: 'Settings', href: '/settings', icon: Settings },
  ],
  'super-admin': [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Approvals', href: '/approvals', icon: CheckSquare, badge: 12 },
    { name: 'All Sessions', href: '/sessions', icon: Calendar },
    { name: 'User Management', href: '/users', icon: UserPlus },
    { name: 'Platform Analytics', href: '/analytics', icon: TrendingUp },
    { name: 'System Settings', href: '/settings', icon: Settings },
  ],
};

export const Sidebar: React.FC<SidebarProps> = ({
  userRole,
  isCollapsed,
  isMobileOpen,
  onMobileClose
}) => {
  const location = useLocation();
  const navigation = roleNavigation[userRole] || [];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg text-gradient-primary">UnsaidTalks</h1>
              <p className="text-xs text-foreground-muted">Mentorship Platform</p>
            </div>
          )}
        </div>
        
        {/* Mobile Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMobileClose}
          className="md:hidden"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  onClick={onMobileClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group",
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground-muted hover:text-foreground hover:bg-muted",
                    isCollapsed && "justify-center"
                  )}
                >
                  <Icon className={cn(
                    "flex-shrink-0 transition-transform group-hover:scale-110",
                    isCollapsed ? "h-5 w-5" : "h-4 w-4"
                  )} />
                  
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Role Badge */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="bg-gradient-subtle p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium capitalize">
                {userRole.replace('-', ' ')}
              </span>
            </div>
            <p className="text-xs text-foreground-muted mt-1">
              Access Level
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "bg-surface border-r border-border transition-all duration-300 flex-shrink-0 z-50",
        // Desktop
        "hidden md:flex flex-col",
        isCollapsed ? "w-16" : "w-64",
        // Mobile
        "md:relative md:translate-x-0",
        isMobileOpen 
          ? "fixed inset-y-0 left-0 w-64 translate-x-0" 
          : "md:static fixed -translate-x-full"
      )}>
        {sidebarContent}
      </aside>
    </>
  );
};