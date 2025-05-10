import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { UserRole } from '@/types';
import { RelayHeader } from '@/pages/index/components/RelayHeader';
import { RelayFilters } from '@/pages/index/components/RelayFilters';
import { RelayTable } from '@/pages/index/components/RelayTable';

const Index = () => {
  const { relays, currentUser } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'date',
    direction: 'asc'
  });

  // Show all relays regardless of user role
  // Filter based on search and status only
  const filteredRelays = relays.filter(relay => {
    const matchesSearch = relay.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      relay.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || relay.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort relays
  const sortedRelays = [...filteredRelays].sort((a, b) => {
    if (sortConfig.key === 'date') {
      return sortConfig.direction === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <RelayHeader currentUser={currentUser} />
      <RelayFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      <RelayTable
        relays={sortedRelays}
        currentUser={currentUser}
        onSort={handleSort}
        sortConfig={sortConfig}
      />
    </div>
  );
};

export default Index;
