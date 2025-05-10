import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Relay } from '@/types';

interface RelayRunnersPanelProps {
    relay: Relay;
    onAssignRunner?: () => void;
}

export function RelayRunnersPanel({ relay, onAssignRunner }: RelayRunnersPanelProps) {
    const { t } = useTranslation();
    const { runners } = useAppContext();

    const hasAssignedRunners = relay.legs.some(leg => leg.assignedRunners && leg.assignedRunners.length > 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('relays.details.assignedRunners')}</CardTitle>
            </CardHeader>
            <CardContent>
                {hasAssignedRunners ? (
                    <div className="space-y-4">
                        {relay.legs
                            .filter(leg => leg.assignedRunners && leg.assignedRunners.length > 0)
                            .map((leg) => (
                                <div key={leg.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                                    <h3 className="font-medium mb-2">{t('relays.details.leg')} {leg.number} - {leg.distance} km</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {leg.assignedRunners!.map((assignment) => {
                                            const runner = runners.find(r => r.id === assignment.runnerId);
                                            return (
                                                <div
                                                    key={assignment.runnerId}
                                                    className="p-3 bg-muted rounded-md flex justify-between items-center"
                                                >
                                                    <div>
                                                        <div className="font-medium">{runner?.name}</div>
                                                        <div className="text-sm text-muted-foreground">{runner?.club}</div>
                                                    </div>
                                                    <Badge>{t('relays.details.team')} {assignment.teamNumber}</Badge>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <p className="text-muted-foreground">{t('relays.details.noRunnersAssigned')}</p>
                        <Button
                            className="mt-4 bg-compass hover:bg-compass-dark"
                            onClick={onAssignRunner}
                        >
                            {t('runners.assignRunner')}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 