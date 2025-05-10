import { MapPin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { UserRole } from '@/types';

interface RelayHeaderProps {
    currentUser: {
        role: UserRole;
        clubIds: string[];
    } | null;
}

export const RelayHeader = ({ currentUser }: RelayHeaderProps) => {
    const { t } = useTranslation();

    const isAdmin = currentUser?.role === UserRole.Admin;

    return (
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
                <MapPin className="text-compass mr-2 h-6 w-6" />
                <h1 className="text-2xl font-bold">{t('relays.title')}</h1>
            </div>
            {isAdmin && (
                <Button className="bg-compass text-white hover:bg-compass-dark">
                    <Plus className="mr-2 h-4 w-4" />
                    {t('relays.createNew')}
                </Button>
            )}
        </div>
    );
}; 