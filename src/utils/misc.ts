import { randomBytes } from 'crypto';

export function generateUniqueId(): string {
  return randomBytes(3).toString('hex').slice(0, 5);
}
export function getDeviceType(source:string) {
  if (/mobile/i.test(source)) {
      return "Mobile";
  } else if (/tablet|ipad|playbook|silk/i.test(source)) {
      return "Tablet";
  } else {
      return "Desktop";
  }
}