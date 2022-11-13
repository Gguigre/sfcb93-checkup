export type Verification = {
  type: 'date' | 'check';
  location: string;
  name?: string;
} | PresenceVerification

type PresenceVerification = {
  type: 'presence';
  location: string;
  items: string[]
}
