import { Terminal, Shield, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TerminalHeaderProps {
  className?: string;
}

export const TerminalHeader = ({ className }: TerminalHeaderProps) => {
  return (
    <header className={cn('relative', className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <div className="w-3 h-3 rounded-full bg-warning" />
            <div className="w-3 h-3 rounded-full bg-success" />
          </div>
          <span className="text-xs text-muted-foreground font-mono ml-2">
            security_analyzer.exe
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3 text-success" />
            <span>SECURE</span>
          </div>
          <div className="flex items-center gap-1">
            <Terminal className="w-3 h-3" />
            <span>v2.0.4</span>
          </div>
        </div>
      </div>

      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-4 box-glow-strong">
          <Shield className="w-12 h-12 text-primary animate-pulse-glow" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary text-glow-strong tracking-wider mb-2">
          PASSWORD SECURITY
        </h1>
        <h2 className="font-display text-xl md:text-2xl text-secondary text-glow-cyan tracking-widest">
          ANALYZER
        </h2>
        <p className="text-muted-foreground text-sm mt-4 max-w-md mx-auto">
          Real-time vulnerability detection and security assessment
        </p>
      </div>
    </header>
  );
};
