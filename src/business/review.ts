export type Review = CheckReview | DateReview | PresenceReview

export type PresenceReview = {
  type: 'presence';
  location: string;
  items: string[]
}

export type CheckReview = {
  type: 'check';
  location: string;
  name: string;
}

export type DateReview = {
  type: 'date';
  location: string;
  name: string;
  mandatory?: boolean;
}
