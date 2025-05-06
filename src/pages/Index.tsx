import { useState } from 'react';
import { MapPin, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import RelayCard from '@/components/relays/RelayCard';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { relays } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { t } = useTranslation();

  const filteredRelays = relays.filter(relay => {
    const matchesSearch = relay.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      relay.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || relay.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <MapPin className="text-compass mr-2 h-6 w-6" />
          <h1 className="text-2xl font-bold">{t('relays.title')}</h1>
        </div>
        <Button className="bg-compass hover:bg-compass-dark">
          <Plus className="mr-2 h-4 w-4" />
          {t('relays.createNew')}
        </Button>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border p-4 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder={t('common.status.all')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('common.status.all')}</SelectItem>
              <SelectItem value="upcoming">{t('common.status.upcoming')}</SelectItem>
              <SelectItem value="active">{t('common.status.active')}</SelectItem>
              <SelectItem value="completed">{t('common.status.completed')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRelays.map((relay) => (
          <RelayCard key={relay.id} relay={relay} />
        ))}
      </div>
    </div>
  );
};

export default Index;
