import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface SecurityMeterProps {
  score: number; // 0-100
  className?: string;
}

export const SecurityMeter = ({ score, className }: SecurityMeterProps) => {
  const { label, colorClass, glowClass } = useMemo(() => {
    if (score >= 80) return { 
      label: 'SECURE', 
      colorClass: 'bg-success', 
      glowClass: 'shadow-[0_0_20px_hsl(140_70%_45%/0.5)]' 
    };
    if (score >= 60) return { 
      label: 'MODERATE', 
      colorClass: 'bg-primary', 
      glowClass: 'box-glow' 
    };
    if (score >= 40) return { 
      label: 'WEAK', 
      colorClass: 'bg-warning', 
      glowClass: 'box-glow-warning' 
    };
    return { 
      label: 'CRITICAL', 
      colorClass: 'bg-destructive', 
      glowClass: 'box-glow-danger' 
    };
  }, [score]);

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          Security Level
        </span>
        <span className={cn(
          'font-display text-sm font-bold tracking-wider',
          score >= 80 && 'text-success',
          score >= 60 && score < 80 && 'text-primary',
          score >= 40 && score < 60 && 'text-warning',
          score < 40 && 'text-destructive'
        )}>
          {label}
        </span>
      </div>
      
      <div className="relative h-4 bg-muted rounded-full overflow-hidden cyber-border">
        <div 
          className={cn(
            'absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out',
            colorClass,
            glowClass
          )}
          style={{ width: `${score}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-background mix-blend-difference">
            {score}%
          </span>
        </div>
      </div>

      <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-wider">
        <span>Vulnerable</span>
        <span>Protected</span>
      </div>
    </div>
  );
};
