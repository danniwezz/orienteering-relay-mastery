
export interface Runner {
  id: string;
  name: string;
  club: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  contactEmail?: string;
  experience?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';
  preferenceTags?: string[];
  previousResults?: RelayResult[];
}

export interface Relay {
  id: string;
  name: string;
  date: string;
  location: string;
  description?: string;
  legs: Leg[];
  status: 'Upcoming' | 'Active' | 'Completed';
  resultsLink?: string;
  importedData?: boolean;
}

export interface Leg {
  id: string;
  relayId: string;
  legNumber: number;
  distance: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard';
  timeOfDay?: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  terrainType?: string[];
  assignedRunners?: RunnerAssignment[];
}

export interface RunnerAssignment {
  runnerId: string;
  runnerName: string;
  legId: string;
  teamNumber: number;
  status: 'Assigned' | 'Confirmed' | 'Declined' | 'Completed';
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
  role: 'Admin' | 'ClubAdmin' | 'Runner';
  clubIds: string[]; // clubs this user has access to
}
