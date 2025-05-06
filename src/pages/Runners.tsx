
import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import RunnerCard from '@/components/runners/RunnerCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Search, Plus, Filter } from 'lucide-react';

const Runners = () => {
  const { runners, clubs } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [clubFilter, setClubFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');

  const filteredRunners = runners.filter((runner) => {
    const matchesSearch = runner.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClub = clubFilter === 'all' || runner.club === clubFilter;
    const matchesExperience = experienceFilter === 'all' || runner.experience === experienceFilter;
    return matchesSearch && matchesClub && matchesExperience;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Users className="text-compass mr-2 h-6 w-6" />
          <h1 className="text-2xl font-bold">Runners</h1>
        </div>
        <Button className="bg-compass hover:bg-compass-dark">
          <Plus className="mr-2 h-4 w-4" />
          Add New Runner
        </Button>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border p-4 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search runners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="flex gap-2 flex-col sm:flex-row">
            <Select value={clubFilter} onValueChange={setClubFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by club" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clubs</SelectItem>
                {clubs.map((club) => (
                  <SelectItem key={club.id} value={club.name}>
                    {club.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Elite">Elite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredRunners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRunners.map((runner) => (
            <RunnerCard key={runner.id} runner={runner} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No runners found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default Runners;
