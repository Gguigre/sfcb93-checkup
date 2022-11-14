export type Review = {
  type: 'date' | 'check';
  location: string;
  name?: string;
} | PresenceReview

type PresenceReview = {
  type: 'presence';
  location: string;
  items: string[]
}
