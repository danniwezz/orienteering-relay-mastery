import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

interface RelayFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    statusFilter: string;
    onStatusChange: (value: string) => void;
}

export const RelayFilters = ({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusChange
}: RelayFiltersProps) => {
    const { t } = useTranslation();

    return (
        <div className="bg-card/50 backdrop-blur-sm border border-border p-4 rounded-lg mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder={t('common.search')}
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Select value={statusFilter} onValueChange={onStatusChange}>
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
    );
}; 