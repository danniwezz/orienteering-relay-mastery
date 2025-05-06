
import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import ClubCard from '@/components/clubs/ClubCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { List, Search, Plus } from 'lucide-react';

const Clubs = () => {
  const { clubs } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClubs = clubs.filter((club) => 
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (club.location && club.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <List className="text-compass mr-2 h-6 w-6" />
          <h1 className="text-2xl font-bold">Clubs</h1>
        </div>
        <Button className="bg-compass hover:bg-compass-dark">
          <Plus className="mr-2 h-4 w-4" />
          Add New Club
        </Button>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border p-4 rounded-lg mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {filteredClubs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No clubs found. Try adjusting your search.</p>
        </div>
      )}
    </div>
  );
};

export default Clubs;
