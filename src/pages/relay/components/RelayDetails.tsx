import { useTranslation } from 'react-i18next';
import { Relay, UserRole } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface RelayDetailsProps {
    relay: Relay;
    currentUser: {
        role: UserRole;
        clubId: string;
    } | null;
}

export const RelayDetails = ({ relay, currentUser }: RelayDetailsProps) => {
    const { t } = useTranslation();

    const userTeam = relay.teams?.find(team => team.clubId === currentUser?.clubId);
    const userSubmissions = relay.submissions?.filter(
        sub => userTeam?.runners.some(r => r.runnerId === sub.runnerId)
    );

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <h2 className="text-lg font-semibold">{t('relays.details.general')}</h2>
                    <dl className="mt-2 space-y-2">
                        <div>
                            <dt className="text-sm text-muted-foreground">{t('relays.edit.name')}</dt>
                            <dd>{relay.name}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-muted-foreground">{t('relays.edit.location')}</dt>
                            <dd>{relay.location}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-muted-foreground">{t('relays.edit.date')}</dt>
                            <dd>{relay.date}</dd>
                        </div>
                    </dl>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">{t('relays.details.team')}</h2>
                    {userTeam ? (
                        <div className="mt-2">
                            <p className="font-medium">{userTeam.name}</p>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('relays.details.runner')}</TableHead>
                                        <TableHead>{t('relays.details.leg')}</TableHead>
                                        <TableHead>{t('relays.details.status')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userTeam.runners.map(({ runnerId, legId }) => {
                                        const submission = userSubmissions?.find(sub => sub.runnerId === runnerId);
                                        return (
                                            <TableRow key={runnerId}>
                                                <TableCell>{runnerId}</TableCell>
                                                <TableCell>
                                                    {currentUser?.role === UserRole.Admin ?
                                                        `Leg ${legId}` :
                                                        t('relays.details.legHidden')}
                                                </TableCell>
                                                <TableCell>
                                                    {submission ? (
                                                        <Badge className={`${getStatusColor(submission.status)} text-xs px-2 py-0.5 rounded-full`}>
                                                            {t(`common.status.${submission.status.toLowerCase()}`)}
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="text-xs px-2 py-0.5 rounded-full">
                                                            {t('common.status.pending')}
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <p className="mt-2 text-muted-foreground">{t('relays.details.noTeam')}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Approved':
            return 'bg-green-500 text-white';
        case 'Rejected':
            return 'bg-red-500 text-white';
        default:
            return 'bg-yellow-500 text-white';
    }
}; 