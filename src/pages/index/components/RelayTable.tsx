import { ArrowUpDown } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Relay, UserRole } from '@/types';

interface RelayTableProps {
    relays: Relay[];
    currentUser: {
        id: string;
        role: UserRole;
        clubIds: string[];
    } | null;
    onSort: (key: string) => void;
    sortConfig: { key: string; direction: 'asc' | 'desc' };
}

const statusColors = {
    'Upcoming': 'bg-blue-500 text-white',
    'Active': 'bg-green-500 text-white',
    'Completed': 'bg-gray-500 text-white',
};

export const RelayTable = ({ relays, currentUser, onSort, sortConfig }: RelayTableProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const getActionButtons = (relay: Relay) => {
        if (!currentUser) return [];

        const buttons = [];

        // View Details button - always available
        buttons.push(
            <Button
                key="view-details"
                variant="default"
                size="sm"
                className="bg-compass text-white hover:bg-compass-dark w-32"
                onClick={() => navigate(`/relay/${relay.id}`)}
            >
                {t('relays.viewDetails')}
            </Button>
        );

        // Create Team button - for admins and club admins without team
        if ((currentUser.role === UserRole.Admin || currentUser.role === UserRole.ClubAdmin) &&
            !relay.teams?.some(team => currentUser.clubIds.includes(team.clubId))) {
            buttons.push(
                <Button
                    key="create-team"
                    variant="default"
                    size="sm"
                    className="bg-compass text-white hover:bg-compass-dark w-32"
                    onClick={() => navigate(`/relay/${relay.id}/create-team`)}
                >
                    {t('relays.createTeam')}
                </Button>
            );
        }

        // Submit button - for runners with team but no submission
        if (currentUser.role === UserRole.Runner &&
            relay.teams?.some(team => currentUser.clubIds.includes(team.clubId)) &&
            !relay.submissions?.some(sub => sub.runnerId === currentUser.id && sub.relayId === relay.id)) {
            buttons.push(
                <Button
                    key="submit"
                    variant="default"
                    size="sm"
                    className="bg-compass text-white hover:bg-compass-dark w-32"
                    onClick={() => navigate(`/relay/${relay.id}/submit`)}
                >
                    {t('relays.sendSubmission')}
                </Button>
            );
        }

        return buttons;
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('relays.edit.name')}</TableHead>
                        <TableHead>{t('relays.edit.location')}</TableHead>
                        <TableHead
                            className="cursor-pointer"
                            onClick={() => onSort('date')}
                        >
                            <div className="flex items-center gap-2">
                                {t('relays.edit.date')}
                                <ArrowUpDown className="h-4 w-4" />
                            </div>
                        </TableHead>
                        <TableHead>{t('relays.details.status')}</TableHead>
                        <TableHead>{t('relays.details.teams')}</TableHead>
                        <TableHead className="w-[320px]">{t('relays.details.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {relays.map((relay) => (
                        <TableRow key={relay.id}>
                            <TableCell className="font-medium">{relay.name}</TableCell>
                            <TableCell>{relay.location}</TableCell>
                            <TableCell>{relay.date}</TableCell>
                            <TableCell>
                                <Badge className={`${statusColors[relay.status]} text-xs px-2 py-0.5 rounded-full`}>
                                    {t(`common.status.${relay.status.toLowerCase()}`)}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {relay.teams?.length || 0} {t('relays.teams')}
                            </TableCell>

                            <TableCell>
                                <div className="flex space-x-4">
                                    {getActionButtons(relay).map((button, index) => (
                                        <div key={`${relay.id}-${index}`}>{button}</div>
                                    ))}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}; 