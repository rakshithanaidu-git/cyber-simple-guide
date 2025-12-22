import { Lock, Key, RefreshCw, Fingerprint, Database, AlertOctagon } from 'lucide-react';
import { cn } from '@/lib/utils';

const tips = [
  {
    icon: Lock,
    title: 'Use 12+ Characters',
    description: 'Longer passwords exponentially increase security against brute force attacks.',
  },
  {
    icon: Key,
    title: 'Mix Character Types',
    description: 'Combine uppercase, lowercase, numbers, and special symbols.',
  },
  {
    icon: RefreshCw,
    title: 'Avoid Patterns',
    description: 'Sequential numbers or keyboard patterns are easily guessable.',
  },
  {
    icon: Fingerprint,
    title: 'Unique Passwords',
    description: 'Never reuse passwords across different accounts.',
  },
  {
    icon: Database,
    title: 'Use a Password Manager',
    description: 'Securely store and generate complex passwords automatically.',
  },
  {
    icon: AlertOctagon,
    title: 'Enable 2FA',
    description: 'Add an extra layer of security with two-factor authentication.',
  },
];

interface SecurityTipsProps {
  className?: string;
}

export const SecurityTips = ({ className }: SecurityTipsProps) => {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <h2 className="font-display text-lg text-primary text-glow tracking-wider">
          SECURITY PROTOCOLS
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tips.map((tip, index) => (
          <div
            key={tip.title}
            className={cn(
              'group p-4 rounded-lg bg-card/50 border border-border/50',
              'hover:border-primary/50 hover:bg-card transition-all duration-300',
              'cyber-border'
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:box-glow transition-all">
                <tip.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-sm text-foreground mb-1">
                  {tip.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
