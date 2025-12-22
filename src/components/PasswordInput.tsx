import { useState } from 'react';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const PasswordInput = ({ value, onChange, className }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn('relative', className)}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
        <Shield className="w-5 h-5" />
      </div>
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter password to analyze..."
        className={cn(
          'w-full pl-12 pr-12 py-4 rounded-lg',
          'bg-input border border-border',
          'text-foreground placeholder:text-muted-foreground',
          'font-mono text-lg tracking-wider',
          'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
          'transition-all duration-300',
          value && 'box-glow'
        )}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
      >
        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
};
