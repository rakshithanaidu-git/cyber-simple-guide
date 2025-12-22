import { Vulnerability } from '@/components/VulnerabilityList';

const commonPasswords = [
  'password', '123456', '12345678', 'qwerty', 'abc123', 'monkey', 'letmein',
  'dragon', 'master', 'login', 'admin', 'welcome', 'shadow', 'sunshine',
  'princess', 'football', 'baseball', 'iloveyou', 'trustno1', 'password1'
];

const commonPatterns = [
  /^(.)\1+$/, // Repeated characters
  /^(012|123|234|345|456|567|678|789|890)+$/, // Sequential numbers
  /^(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)+$/i, // Sequential letters
  /^(qwerty|asdf|zxcv|qazwsx)+$/i, // Keyboard patterns
];

export interface AnalysisResult {
  score: number;
  vulnerabilities: Vulnerability[];
  entropy: number;
  crackTime: string;
}

function calculateEntropy(password: string): number {
  const charsetSize = [
    /[a-z]/.test(password) ? 26 : 0,
    /[A-Z]/.test(password) ? 26 : 0,
    /[0-9]/.test(password) ? 10 : 0,
    /[^a-zA-Z0-9]/.test(password) ? 32 : 0,
  ].reduce((a, b) => a + b, 0);

  return password.length * Math.log2(charsetSize || 1);
}

function estimateCrackTime(entropy: number): string {
  const guessesPerSecond = 10_000_000_000; // 10 billion guesses/second
  const combinations = Math.pow(2, entropy);
  const seconds = combinations / guessesPerSecond / 2; // Average case

  if (seconds < 1) return 'Instantly';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000 * 100) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 31536000 * 1000000) return `${Math.round(seconds / 31536000 / 1000)} thousand years`;
  return 'Millions of years';
}

export function analyzePassword(password: string): AnalysisResult {
  const vulnerabilities: Vulnerability[] = [];
  let score = 100;

  if (!password) {
    return { score: 0, vulnerabilities: [], entropy: 0, crackTime: 'N/A' };
  }

  // Length checks
  if (password.length < 8) {
    vulnerabilities.push({
      id: 'length-critical',
      type: 'critical',
      message: `Password is too short (${password.length} chars). Minimum 8 required.`,
    });
    score -= 30;
  } else if (password.length < 12) {
    vulnerabilities.push({
      id: 'length-warning',
      type: 'warning',
      message: `Password could be longer (${password.length} chars). 12+ recommended.`,
    });
    score -= 10;
  } else {
    vulnerabilities.push({
      id: 'length-success',
      type: 'success',
      message: `Good password length (${password.length} characters).`,
    });
  }

  // Character type checks
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  if (!hasLower) {
    vulnerabilities.push({
      id: 'no-lower',
      type: 'warning',
      message: 'Missing lowercase letters (a-z).',
    });
    score -= 10;
  }

  if (!hasUpper) {
    vulnerabilities.push({
      id: 'no-upper',
      type: 'warning',
      message: 'Missing uppercase letters (A-Z).',
    });
    score -= 10;
  }

  if (!hasNumber) {
    vulnerabilities.push({
      id: 'no-number',
      type: 'warning',
      message: 'Missing numeric digits (0-9).',
    });
    score -= 10;
  }

  if (!hasSpecial) {
    vulnerabilities.push({
      id: 'no-special',
      type: 'info',
      message: 'No special characters (!@#$%^&*).',
    });
    score -= 5;
  }

  if (hasLower && hasUpper && hasNumber && hasSpecial) {
    vulnerabilities.push({
      id: 'char-diversity',
      type: 'success',
      message: 'Excellent character diversity.',
    });
  }

  // Common password check
  if (commonPasswords.includes(password.toLowerCase())) {
    vulnerabilities.push({
      id: 'common-password',
      type: 'critical',
      message: 'This is a commonly used password. Easily crackable!',
    });
    score -= 40;
  }

  // Pattern checks
  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      vulnerabilities.push({
        id: 'pattern-detected',
        type: 'critical',
        message: 'Predictable pattern detected. Avoid sequences.',
      });
      score -= 25;
      break;
    }
  }

  // Repeated characters
  const repeatedChars = /(.)\1{2,}/.test(password);
  if (repeatedChars) {
    vulnerabilities.push({
      id: 'repeated-chars',
      type: 'warning',
      message: 'Contains repeated characters (e.g., "aaa").',
    });
    score -= 10;
  }

  const entropy = calculateEntropy(password);
  const crackTime = estimateCrackTime(entropy);

  vulnerabilities.push({
    id: 'crack-time',
    type: entropy > 50 ? 'success' : entropy > 30 ? 'info' : 'warning',
    message: `Estimated crack time: ${crackTime}`,
  });

  return {
    score: Math.max(0, Math.min(100, score)),
    vulnerabilities,
    entropy,
    crackTime,
  };
}
