import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon: LucideIcon;
  variant?: 'default' | 'gradient' | 'success' | 'warning';
  className?: string;
  onClick?: () => void;
}

const variantStyles = {
  default: "bg-card text-card-foreground border border-border",
  gradient: "bg-gradient-primary text-primary-foreground border-0 shadow-glow",
  success: "bg-success/10 text-success border border-success/20",
  warning: "bg-warning/10 text-warning border border-warning/20",
};

const changeStyles = {
  increase: "text-success",
  decrease: "text-destructive",
  neutral: "text-foreground-muted",
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  variant = 'default',
  className,
  onClick
}) => {
  return (
    <div
      className={cn(
        "p-6 rounded-lg transition-all duration-300 hover:scale-[1.02]",
        variantStyles[variant],
        onClick && "cursor-pointer hover:shadow-md",
        "fade-in",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={cn(
            "text-sm font-medium",
            variant === 'gradient' ? "text-primary-foreground/80" : "text-foreground-muted"
          )}>
            {title}
          </p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          {change && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "text-xs font-medium",
                variant === 'gradient' ? "text-primary-foreground/90" : changeStyles[change.type]
              )}>
                {change.type === 'increase' && '+'}
                {change.value}%
              </span>
              <span className={cn(
                "text-xs ml-1",
                variant === 'gradient' ? "text-primary-foreground/70" : "text-foreground-muted"
              )}>
                vs last month
              </span>
            </div>
          )}
        </div>
        
        <div className={cn(
          "p-3 rounded-lg transition-transform group-hover:scale-110",
          variant === 'gradient' 
            ? "bg-white/20" 
            : variant === 'success'
            ? "bg-success/20"
            : variant === 'warning'
            ? "bg-warning/20"
            : "bg-muted"
        )}>
          <Icon className={cn(
            "h-6 w-6",
            variant === 'gradient' 
              ? "text-primary-foreground" 
              : variant === 'success'
              ? "text-success"
              : variant === 'warning'
              ? "text-warning"
              : "text-foreground-muted"
          )} />
        </div>
      </div>
    </div>
  );
};