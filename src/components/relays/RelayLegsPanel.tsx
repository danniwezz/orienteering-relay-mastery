import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Route } from 'lucide-react';
import { difficultyToTranslationKey, Relay } from '@/types';

interface RelayLegsPanelProps {
    relay: Relay;
    onAssignLegRunner?: () => void;
}

export function RelayLegsPanel({ relay, onAssignLegRunner }: RelayLegsPanelProps) {
    const { t } = useTranslation();

    const difficultyColors = {
        'Easy': 'bg-green-400',
        'Medium': 'bg-blue-400',
        'Hard': 'bg-amber-400',
        'VeryHard': 'bg-red-400',
    };

    return (
        <div className="grid gap-4">
            {relay.legs.map((leg) => (
                <Card key={leg.id}>
                    <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div>
                                <h3 className="font-bold flex items-center gap-2">
                                    {t('relays.details.leg')} {leg.number}
                                    <Badge className={`${difficultyColors[leg.difficulty]} text-xs px-2 py-0.5 rounded-full text-black`}>
                                        {t(`relays.details.difficulty.${difficultyToTranslationKey(leg.difficulty)}`)}
                                    </Badge>
                                </h3>
                                <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Route className="h-3 w-3 text-muted-foreground" />
                                        <span>{leg.distance} km</span>
                                    </div>
                                    {leg.timeOfDay && (
                                        <div>
                                            <span className="text-muted-foreground">{t('relays.details.time')}: </span>
                                            {leg.timeOfDay}
                                        </div>
                                    )}
                                </div>
                                {leg.terrainType && leg.terrainType.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {leg.terrainType.map((terrain, i) => (
                                            <span key={i} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                                                {terrain}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="min-w-[200px]">
                                <div className="text-sm font-medium mb-2">
                                    {leg.assignedRunners?.length || 0} {t('relays.details.runner', { count: leg.assignedRunners?.length })}
                                </div>
                                {leg.assignedRunners && leg.assignedRunners.length > 0 ? (
                                    <div className="space-y-1">
                                        {leg.assignedRunners.map((assignment) => (
                                            <div key={assignment.runnerId} className="text-sm p-1.5 bg-muted rounded-md flex justify-between">
                                                <span>{assignment.runnerName}</span>
                                                <span className="text-muted-foreground">{t('relays.details.team')} {assignment.teamNumber}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="w-full"
                                        onClick={onAssignLegRunner}
                                    >
                                        {t('relays.details.assignRunner')}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
} 