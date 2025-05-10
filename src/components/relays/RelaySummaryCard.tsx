import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Route, Users, Mountain } from 'lucide-react';
import { Relay } from '@/types';

interface RelaySummaryCardProps {
    relay: Relay;
}

export function RelaySummaryCard({ relay }: RelaySummaryCardProps) {
    const { t } = useTranslation();

    const totalAssignments = relay.legs.reduce(
        (sum, leg) => sum + (leg.assignedRunners?.length || 0), 0
    );

    const totalNeededRunners = relay.legs.length;
    const totalDistance = relay.legs.reduce((sum, leg) => sum + leg.distance, 0).toFixed(1);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('relays.details.summary')}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                        <Route className="h-5 w-5 text-compass" />
                        <div>
                            <p className="text-sm text-muted-foreground">{t('relays.details.totalLegs')}</p>
                            <p className="font-medium">{relay.legs.length}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-compass" />
                        <div>
                            <p className="text-sm text-muted-foreground">{t('relays.details.runnersAssigned', { count: totalAssignments })}</p>
                            <p className="font-medium">{totalAssignments} / {totalNeededRunners}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Mountain className="h-5 w-5 text-compass" />
                        <div>
                            <p className="text-sm text-muted-foreground">{t('relays.details.totalDistance')}</p>
                            <p className="font-medium">{totalDistance} km</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 