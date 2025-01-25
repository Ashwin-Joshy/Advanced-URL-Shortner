import { randomBytes } from 'crypto';

export function generateUniqueId(): string {
  return randomBytes(3).toString('hex').slice(0, 5);
}