export enum Category {
  Environment = 'Environment',
  Education = 'Education',
  Health = 'Health',
  AnimalWelfare = 'Animal Welfare',
  Community = 'Community',
  Arts = 'Arts & Culture',
  CrisisRelief = 'Crisis Relief'
}

export enum Availability {
  Weekdays = 'Weekdays',
  Weekends = 'Weekends',
  Evenings = 'Evenings',
  Flexible = 'Flexible'
}

export interface Organization {
  id: string;
  name: string;
  avatar: string; // URL
  description: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: Organization;
  category: Category;
  location: string;
  date: string;
  availability: Availability;
  description: string;
  skills: string[];
  imageUrl: string;
  spotsTotal: number;
  spotsFilled: number;
}

export interface UserProfile {
  name: string;
  interests: Category[];
  availability: Availability[];
  skills: string[];
  bio: string;
}

export interface AIMatchResult {
  opportunityId: string;
  score: number; // 0-100
  reason: string;
}