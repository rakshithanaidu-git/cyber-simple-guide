import { useState, useMemo } from 'react';
import { TerminalHeader } from '@/components/TerminalHeader';
import { PasswordInput } from '@/components/PasswordInput';
import { SecurityMeter } from '@/components/SecurityMeter';
import { VulnerabilityList } from '@/components/VulnerabilityList';
import { SecurityTips } from '@/components/SecurityTips';
import { analyzePassword } from '@/lib/passwordAnalyzer';
import { Clock, Zap, Activity } from 'lucide-react';

const Index = () => {
  const [password, setPassword] = useState('');
  
  const analysis = useMemo(() => analyzePassword(password), [password]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <TerminalHeader />

        <main className="space-y-8">
          {/* Password Input Section */}
          <section className="p-6 rounded-xl bg-card/80 border border-border cyber-border backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                Input Analysis
              </span>
            </div>
            
            <PasswordInput 
              value={password} 
              onChange={setPassword}
              className="mb-6"
            />

            <SecurityMeter score={analysis.score} />

            {/* Stats Row */}
            {password && (
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-secondary/10 text-secondary">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Entropy</p>
                    <p className="font-mono text-sm text-foreground">
                      {analysis.entropy.toFixed(1)} bits
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-accent/10 text-accent">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Crack Time</p>
                    <p className="font-mono text-sm text-foreground">
                      {analysis.crackTime}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Vulnerabilities Section */}
          <section className="p-6 rounded-xl bg-card/80 border border-border cyber-border backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                Vulnerability Scan Results
              </span>
            </div>
            
            <VulnerabilityList vulnerabilities={analysis.vulnerabilities} />
          </section>

          {/* Security Tips */}
          <SecurityTips />

          {/* How It Works Section */}
          <section className="p-6 rounded-xl bg-card/80 border border-border cyber-border backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
              <h2 className="font-display text-lg text-secondary text-glow-cyan tracking-wider">
                HOW IT WORKS
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
            </div>

            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <h3 className="font-display text-foreground mb-2">1. Password Analysis</h3>
                <p>
                  The analyzer evaluates your password against multiple security criteria including 
                  length, character diversity, common patterns, and known weak passwords.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <h3 className="font-display text-foreground mb-2">2. Entropy Calculation</h3>
                <p>
                  Password entropy measures randomness in bits. Higher entropy means more 
                  possible combinations, making brute-force attacks exponentially harder.
                  Formula: <code className="text-primary">E = L × log₂(R)</code> where L is length and R is charset size.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <h3 className="font-display text-foreground mb-2">3. Crack Time Estimation</h3>
                <p>
                  Based on entropy, we estimate how long a sophisticated attacker (10 billion 
                  guesses/second) would need to crack your password through brute force.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <h3 className="font-display text-foreground mb-2">4. Vulnerability Detection</h3>
                <p>
                  We check for common security weaknesses: dictionary words, keyboard patterns 
                  (qwerty, 123456), repeated characters, and known compromised passwords.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h3 className="font-display text-primary text-sm mb-2">🔐 Privacy Note</h3>
              <p className="text-xs text-muted-foreground">
                All analysis happens locally in your browser. Your password is never sent 
                to any server or stored anywhere. This tool is 100% client-side.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-8 text-xs text-muted-foreground">
            <p>Password Security Analyzer • Educational Tool</p>
            <p className="mt-1">All processing happens locally in your browser</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
