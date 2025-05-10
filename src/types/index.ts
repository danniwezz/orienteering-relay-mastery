// Enums for consistent string values
export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

export enum ExperienceLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Elite = 'Elite'
}

export enum RelayStatus {
  Upcoming = 'Upcoming',
  Active = 'Active',
  Completed = 'Completed'
}

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
  VeryHard = 'VeryHard'
}

export enum TimeOfDay {
  Morning = 'Morning',
  Afternoon = 'Afternoon',
  Evening = 'Evening',
  Night = 'Night'
}

export enum AssignmentStatus {
  Assigned = 'Assigned',
  Confirmed = 'Confirmed',
  Declined = 'Declined',
  Completed = 'Completed'
}

export enum UserRole {
  Admin = 'Admin',
  ClubAdmin = 'ClubAdmin',
  Runner = 'Runner'
}

export interface Runner {
  id: string;
  name: string;
  club: string;
  age?: number;
  gender?: Gender;
  contactEmail?: string;
  experience?: ExperienceLevel;
  preferenceTags?: string[];
  previousResults?: RelayResult[];
}

export interface Team {
  id: string;
  clubId: string;
  relayId: string;
  name: string;
  runners: {
    runnerId: string;
    legId: string;
  }[];
}

export interface Submission {
  id: string;
  relayId: string;
  runnerId: string;
  teamId: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
}

export interface RelayFile {
  id: string;
  relayId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Relay {
  id: string;
  name: string;
  date: string;
  location: string;
  status: 'Upcoming' | 'Active' | 'Completed';
  clubId: string;
  legs: {
    id: string;
    number: number;
    distance: number;
    climb: number;
    difficulty?: Difficulty;
    timeOfDay?: TimeOfDay;
    terrainType?: string[];
    assignedRunners?: RunnerAssignment[];
  }[];
  teams?: Team[];
  submissions?: Submission[];
  description?: string;
  files?: RelayFile[];
}

export interface Leg {
  id: string;
  relayId: string;
  legNumber: number;
  distance: number;
  difficulty: Difficulty;
  timeOfDay?: TimeOfDay;
  terrainType?: string[];
  assignedRunners?: RunnerAssignment[];
}

export interface RunnerAssignment {
  runnerId: string;
  runnerName: string;
  legId: string;
  teamNumber: number;
  status: AssignmentStatus;
}

export interface Club {
  id: string;
  name: string;
  location?: string;
  runners: Runner[];
  relays?: string[]; // IDs of relays this club participates in
}

export interface RelayResult {
  relayId: string;
  relayName: string;
  legId: string;
  legNumber: number;
  runnerId: string;
  time: string; // in format "HH:MM:SS"
  placement: number;
  startTime?: string;
  finishTime?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  clubIds: string[]; // clubs this user has access to
}

// Helper functions for translation
export const difficultyToTranslationKey = (difficulty?: Difficulty): string => {
  if (!difficulty) return 'medium'; // Default to medium if not specified
  if (difficulty === Difficulty.VeryHard) return 'veryhard';
  return difficulty.toLowerCase();
};
