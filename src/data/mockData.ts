import {
  Relay,
  Runner,
  Club,
  Gender,
  ExperienceLevel,
  RelayStatus,
  Difficulty,
  TimeOfDay,
  AssignmentStatus,
  Team,
  Submission,
  Leg
} from "../types";

// Mock runners
export const mockRunners: Runner[] = [
  {
    id: "r1",
    name: "Jonas Andersson",
    club: "IFK Göteborg",
    age: 28,
    gender: Gender.Male,
    experience: ExperienceLevel.Elite,
    preferenceTags: ["Long distance", "Forest", "Night"],
  },
  {
    id: "r2",
    name: "Sofia Ekberg",
    club: "OK Linnea",
    age: 24,
    gender: Gender.Female,
    experience: ExperienceLevel.Advanced,
    preferenceTags: ["Middle distance", "Technical"],
  },
  {
    id: "r3",
    name: "Erik Larsson",
    club: "IFK Göteborg",
    age: 35,
    gender: Gender.Male,
    experience: ExperienceLevel.Elite,
    preferenceTags: ["Sprint", "Urban"],
  },
  {
    id: "r4",
    name: "Linnea Jonsson",
    club: "OK Linnea",
    age: 22,
    gender: Gender.Female,
    experience: ExperienceLevel.Intermediate,
    preferenceTags: ["Long distance", "Hilly"],
  },
  {
    id: "r5",
    name: "Markus Svensson",
    club: "Järfälla OK",
    age: 30,
    gender: Gender.Male,
    experience: ExperienceLevel.Advanced,
    preferenceTags: ["Long distance", "Technical", "Night"],
  },
  {
    id: "r6",
    name: "Anna Bergström",
    club: "IFK Göteborg",
    age: 26,
    gender: Gender.Female,
    experience: ExperienceLevel.Advanced,
    preferenceTags: ["Middle distance", "Forest", "Technical"],
  },
];

// Teams for each relay
const mockTeams: Team[] = [
  {
    id: "team1",
    clubId: "club1",
    relayId: "relay1",
    name: "IFK Göteborg Team A",
    runners: [
      {
        runnerId: "r1",
        legId: "leg1-1"
      },
      {
        runnerId: "r3",
        legId: "leg1-2"
      }
    ]
  },
  {
    id: "team2",
    clubId: "club2",
    relayId: "relay1",
    name: "OK Linnea Team A",
    runners: [
      {
        runnerId: "r2",
        legId: "leg1-1"
      },
      {
        runnerId: "r4",
        legId: "leg1-3"
      }
    ]
  },
  {
    id: "team3",
    clubId: "club3",
    relayId: "relay2",
    name: "Järfälla OK Team A",
    runners: [
      {
        runnerId: "r5",
        legId: "leg2-1"
      }
    ]
  }
];

// Submissions from runners
const mockSubmissions: Submission[] = [
  {
    id: "sub1",
    relayId: "relay1",
    runnerId: "r1",
    teamId: "team1",
    status: "Approved",
    submittedAt: "2023-09-15T14:30:00Z"
  },
  {
    id: "sub2",
    relayId: "relay1",
    runnerId: "r2",
    teamId: "team2",
    status: "Pending",
    submittedAt: "2023-09-16T10:15:00Z"
  },
  {
    id: "sub3",
    relayId: "relay2",
    runnerId: "r5",
    teamId: "team3",
    status: "Approved",
    submittedAt: "2023-09-14T09:45:00Z"
  }
];

// Update mockRelays to include teams and submissions
export const mockRelays: Relay[] = [
  {
    id: "relay1",
    name: "Tiomila 2025",
    date: "2025-05-10",
    location: "Stockholm, Sweden",
    status: RelayStatus.Upcoming,
    clubId: "", // Not owned by any specific club
    legs: [
      {
        id: "leg1-1",
        number: 1,
        distance: 6.2,
        climb: 120,
        difficulty: Difficulty.Medium,
        terrainType: ["Forest", "Hilly"],
        timeOfDay: TimeOfDay.Morning
      },
      {
        id: "leg1-2",
        number: 2,
        distance: 8.5,
        climb: 180,
        difficulty: Difficulty.Hard,
        terrainType: ["Technical", "Rocky"],
        timeOfDay: TimeOfDay.Afternoon
      },
      {
        id: "leg1-3",
        number: 3,
        distance: 5.8,
        climb: 100,
        difficulty: Difficulty.Easy,
        terrainType: ["Open", "Flat"],
        timeOfDay: TimeOfDay.Afternoon
      },
      {
        id: "leg1-4",
        number: 4,
        distance: 12.3,
        climb: 250,
        difficulty: Difficulty.VeryHard,
        terrainType: ["Night", "Technical", "Forest"],
        timeOfDay: TimeOfDay.Night
      },
      {
        id: "leg1-5",
        number: 5,
        distance: 7.1,
        climb: 150,
        difficulty: Difficulty.Medium,
        terrainType: ["Mixed", "Urban"],
        timeOfDay: TimeOfDay.Evening
      }
    ],
    teams: mockTeams.filter(team => team.relayId === "relay1"),
    submissions: mockSubmissions.filter(sub => sub.relayId === "relay1")
  },
  {
    id: "relay2",
    name: "Jukola 2025",
    date: "2025-06-15",
    location: "Tampere, Finland",
    status: RelayStatus.Upcoming,
    clubId: "", // Not owned by any specific club
    legs: [
      {
        id: "leg2-1",
        number: 1,
        distance: 7.8,
        climb: 220,
        difficulty: Difficulty.Medium
      },
      {
        id: "leg2-2",
        number: 2,
        distance: 9.2,
        climb: 280,
        difficulty: Difficulty.Hard
      },
      {
        id: "leg2-3",
        number: 3,
        distance: 10.5,
        climb: 310,
        difficulty: Difficulty.VeryHard
      },
      {
        id: "leg2-4",
        number: 4,
        distance: 8.3,
        climb: 240,
        difficulty: Difficulty.Hard
      }
    ],
    teams: mockTeams.filter(team => team.relayId === "relay2"),
    submissions: mockSubmissions.filter(sub => sub.relayId === "relay2")
  },
  {
    id: "relay3",
    name: "25-manna 2025",
    date: "2025-10-05",
    location: "Uppsala, Sweden",
    status: RelayStatus.Upcoming,
    clubId: "", // Not owned by any specific club
    legs: [
      {
        id: "leg3-1",
        number: 1,
        distance: 5.2,
        climb: 90,
        difficulty: Difficulty.Easy
      },
      {
        id: "leg3-2",
        number: 2,
        distance: 4.8,
        climb: 85,
        difficulty: Difficulty.Medium
      }
      // More legs would be defined here
    ],
    teams: mockTeams.filter(team => team.relayId === "relay3"),
    submissions: mockSubmissions.filter(sub => sub.relayId === "relay3")
  }
];

// Mock clubs
export const mockClubs: Club[] = [
  {
    id: "club1",
    name: "IFK Göteborg",
    location: "Göteborg, Sweden",
    runners: mockRunners.filter(runner => runner.club === "IFK Göteborg"),
    relays: ["relay1", "relay3"]
  },
  {
    id: "club2",
    name: "OK Linnea",
    location: "Stockholm, Sweden",
    runners: mockRunners.filter(runner => runner.club === "OK Linnea"),
    relays: ["relay1", "relay2"]
  },
  {
    id: "club3",
    name: "Järfälla OK",
    location: "Järfälla, Sweden",
    runners: mockRunners.filter(runner => runner.club === "Järfälla OK"),
    relays: ["relay2"]
  }
];
