import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { mockRelays, mockRunners, mockClubs } from '../data/mockData';
import { Relay, Runner, Club } from '../types';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

interface AppContextType {
  relays: Relay[];
  runners: Runner[];
  clubs: Club[];
  loading: boolean;
  error: string | null;
  selectedRelay: Relay | null;
  language: string;
  setLanguage: (lang: string) => void;
  setSelectedRelay: (relay: Relay | null) => void;
  addRelay: (relay: Relay) => void;
  updateRelay: (relay: Relay) => void;
  deleteRelay: (relayId: string) => void;
  addRunner: (runner: Runner) => void;
  updateRunner: (runner: Runner) => void;
  deleteRunner: (runnerId: string) => void;
  assignRunner: (runnerId: string, legId: string, teamNumber: number) => void;
  unassignRunner: (runnerId: string, legId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [relays, setRelays] = useState<Relay[]>(mockRelays);
  const [runners, setRunners] = useState<Runner[]>(mockRunners);
  const [clubs, setClubs] = useState<Club[]>(mockClubs);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRelay, setSelectedRelay] = useState<Relay | null>(null);
  const [language, setLanguage] = useState<string>(localStorage.getItem('language') || 'en');
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const addRelay = (relay: Relay) => {
    setRelays([...relays, relay]);
  };

  const updateRelay = (updatedRelay: Relay) => {
    setRelays(relays.map(relay =>
      relay.id === updatedRelay.id ? updatedRelay : relay
    ));

    if (selectedRelay?.id === updatedRelay.id) {
      setSelectedRelay(updatedRelay);
    }
  };

  const deleteRelay = (relayId: string) => {
    setRelays(relays.filter(relay => relay.id !== relayId));

    if (selectedRelay?.id === relayId) {
      setSelectedRelay(null);
    }
  };

  const addRunner = (runner: Runner) => {
    setRunners([...runners, runner]);

    // Update club runners if this runner belongs to an existing club
    const clubIndex = clubs.findIndex(club => club.name === runner.club);
    if (clubIndex !== -1) {
      const updatedClub = {
        ...clubs[clubIndex],
        runners: [...clubs[clubIndex].runners, runner]
      };
      const updatedClubs = [...clubs];
      updatedClubs[clubIndex] = updatedClub;
      setClubs(updatedClubs);
    }
    // Create a new club if it doesn't exist
    else {
      setClubs([...clubs, {
        id: `club-${clubs.length + 1}`,
        name: runner.club,
        location: '',
        runners: [runner],
        relays: []
      }]);
    }
  };

  const updateRunner = (updatedRunner: Runner) => {
    setRunners(runners.map(runner =>
      runner.id === updatedRunner.id ? updatedRunner : runner
    ));

    // Update club runners
    const updatedClubs = clubs.map(club => {
      if (club.runners.some(r => r.id === updatedRunner.id)) {
        return {
          ...club,
          runners: club.runners.map(r =>
            r.id === updatedRunner.id ? updatedRunner : r
          )
        };
      }
      return club;
    });
    setClubs(updatedClubs);
  };

  const deleteRunner = (runnerId: string) => {
    setRunners(runners.filter(runner => runner.id !== runnerId));

    // Update clubs
    const updatedClubs = clubs.map(club => ({
      ...club,
      runners: club.runners.filter(r => r.id !== runnerId)
    }));
    setClubs(updatedClubs);

    // Update relay assignments
    const updatedRelays = relays.map(relay => ({
      ...relay,
      legs: relay.legs.map(leg => ({
        ...leg,
        assignedRunners: leg.assignedRunners?.filter(
          assignment => assignment.runnerId !== runnerId
        ) || []
      }))
    }));
    setRelays(updatedRelays);
  };

  const assignRunner = (runnerId: string, legId: string, teamNumber: number) => {
    const runner = runners.find(r => r.id === runnerId);
    if (!runner) return;

    const updatedRelays = relays.map(relay => {
      const legIndex = relay.legs.findIndex(l => l.id === legId);
      if (legIndex === -1) return relay;

      const leg = relay.legs[legIndex];
      const updatedAssignments = [
        ...(leg.assignedRunners || []).filter(a =>
          !(a.teamNumber === teamNumber && a.legId === legId)
        ),
        {
          runnerId,
          runnerName: runner.name,
          legId,
          teamNumber,
          status: 'Assigned' as const
        }
      ];

      const updatedLegs = [...relay.legs];
      updatedLegs[legIndex] = {
        ...leg,
        assignedRunners: updatedAssignments
      };

      return {
        ...relay,
        legs: updatedLegs
      };
    });

    setRelays(updatedRelays);

    if (selectedRelay) {
      const updatedSelectedRelay = updatedRelays.find(r => r.id === selectedRelay.id);
      if (updatedSelectedRelay) {
        setSelectedRelay(updatedSelectedRelay);
      }
    }
  };

  const unassignRunner = (runnerId: string, legId: string) => {
    const updatedRelays = relays.map(relay => ({
      ...relay,
      legs: relay.legs.map(leg => {
        if (leg.id === legId) {
          return {
            ...leg,
            assignedRunners: leg.assignedRunners?.filter(
              assignment => assignment.runnerId !== runnerId
            ) || []
          };
        }
        return leg;
      })
    }));

    setRelays(updatedRelays);

    if (selectedRelay) {
      const updatedSelectedRelay = updatedRelays.find(r => r.id === selectedRelay.id);
      if (updatedSelectedRelay) {
        setSelectedRelay(updatedSelectedRelay);
      }
    }
  };

  const value = {
    relays,
    runners,
    clubs,
    loading,
    error,
    selectedRelay,
    language,
    setLanguage: handleLanguageChange,
    setSelectedRelay,
    addRelay,
    updateRelay,
    deleteRelay,
    addRunner,
    updateRunner,
    deleteRunner,
    assignRunner,
    unassignRunner,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
