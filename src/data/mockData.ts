
import { Relay, Runner, Club } from "../types";

// Mock runners
export const mockRunners: Runner[] = [
  {
    id: "r1",
    name: "Jonas Andersson",
    club: "IFK Göteborg",
    age: 28,
    gender: "Male",
    experience: "Elite",
    preferenceTags: ["Long distance", "Forest", "Night"],
  },
  {
    id: "r2",
    name: "Sofia Ekberg",
    club: "OK Linnea",
    age: 24,
    gender: "Female",
    experience: "Advanced",
    preferenceTags: ["Middle distance", "Technical"],
  },
  {
    id: "r3",
    name: "Erik Larsson",
    club: "IFK Göteborg",
    age: 35,
    gender: "Male",
    experience: "Elite",
    preferenceTags: ["Sprint", "Urban"],
  },
  {
    id: "r4",
    name: "Linnea Jonsson",
    club: "OK Linnea",
    age: 22,
    gender: "Female",
    experience: "Intermediate",
    preferenceTags: ["Long distance", "Hilly"],
  },
  {
    id: "r5",
    name: "Markus Svensson",
    club: "Järfälla OK",
    age: 30,
    gender: "Male",
    experience: "Advanced",
    preferenceTags: ["Long distance", "Technical", "Night"],
  },
];

// Mock relays
export const mockRelays: Relay[] = [
  {
    id: "relay1",
    name: "Tiomila 2025",
    date: "2025-05-10",
    location: "Stockholm, Sweden",
    description: "One of the world's largest relay competitions with men's, women's and youth classes.",
    status: "Upcoming",
    legs: [
      {
        id: "leg1-1",
        relayId: "relay1",
        legNumber: 1,
        distance: 6.2,
        difficulty: "Medium",
        timeOfDay: "Morning",
        terrainType: ["Forest", "Hilly"],
        assignedRunners: [
          {
            runnerId: "r3",
            runnerName: "Erik Larsson",
            legId: "leg1-1",
            teamNumber: 1,
            status: "Confirmed",
          }
        ]
      },
      {
        id: "leg1-2",
        relayId: "relay1",
        legNumber: 2,
        distance: 8.5,
        difficulty: "Hard",
        timeOfDay: "Afternoon",
        terrainType: ["Forest", "Technical", "Rocky"],
        assignedRunners: [
          {
            runnerId: "r1",
            runnerName: "Jonas Andersson",
            legId: "leg1-2",
            teamNumber: 1,
            status: "Confirmed",
          }
        ]
      },
      {
        id: "leg1-3",
        relayId: "relay1",
        legNumber: 3,
        distance: 5.8,
        difficulty: "Medium",
        timeOfDay: "Evening",
        terrainType: ["Forest", "Flat"],
        assignedRunners: []
      },
      {
        id: "leg1-4",
        relayId: "relay1",
        legNumber: 4,
        distance: 12.3,
        difficulty: "Very Hard",
        timeOfDay: "Night",
        terrainType: ["Forest", "Hilly", "Technical"],
        assignedRunners: []
      },
      {
        id: "leg1-5",
        relayId: "relay1",
        legNumber: 5,
        distance: 7.1,
        difficulty: "Hard",
        timeOfDay: "Morning",
        terrainType: ["Forest", "Flat"],
        assignedRunners: []
      }
    ]
  },
  {
    id: "relay2",
    name: "Jukola 2025",
    date: "2025-06-15",
    location: "Tampere, Finland",
    description: "Traditional Finnish overnight orienteering relay in challenging terrain.",
    status: "Upcoming",
    legs: [
      {
        id: "leg2-1",
        relayId: "relay2",
        legNumber: 1,
        distance: 7.8,
        difficulty: "Hard",
        timeOfDay: "Evening",
        terrainType: ["Forest", "Very Technical", "Swampy"],
        assignedRunners: []
      },
      {
        id: "leg2-2",
        relayId: "relay2",
        legNumber: 2,
        distance: 9.2,
        difficulty: "Very Hard",
        timeOfDay: "Night",
        terrainType: ["Forest", "Technical", "Rocky", "Swampy"],
        assignedRunners: []
      },
      {
        id: "leg2-3",
        relayId: "relay2",
        legNumber: 3,
        distance: 10.5,
        difficulty: "Very Hard",
        timeOfDay: "Night",
        terrainType: ["Forest", "Hilly", "Technical"],
        assignedRunners: []
      },
      {
        id: "leg2-4",
        relayId: "relay2",
        legNumber: 4,
        distance: 8.3,
        difficulty: "Hard",
        timeOfDay: "Night",
        terrainType: ["Forest", "Technical"],
        assignedRunners: []
      }
    ]
  },
  {
    id: "relay3",
    name: "25-manna 2025",
    date: "2025-10-05",
    location: "Uppsala, Sweden",
    description: "Traditional Swedish relay with 25 legs of varying difficulty.",
    status: "Upcoming",
    legs: [
      {
        id: "leg3-1",
        relayId: "relay3",
        legNumber: 1,
        distance: 5.2,
        difficulty: "Medium",
        timeOfDay: "Morning",
        terrainType: ["Forest", "Flat"],
        assignedRunners: []
      },
      {
        id: "leg3-2",
        relayId: "relay3",
        legNumber: 2,
        distance: 4.8,
        difficulty: "Medium",
        timeOfDay: "Morning",
        terrainType: ["Forest", "Flat"],
        assignedRunners: []
      }
      // More legs would be defined here
    ]
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
