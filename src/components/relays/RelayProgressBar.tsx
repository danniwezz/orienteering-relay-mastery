import { useTranslation } from 'react-i18next';
import { Progress } from '@/components/ui/progress';
import { Relay } from '@/types';

interface RelayProgressBarProps {
    relay: Relay;
}

export function RelayProgressBar({ relay }: RelayProgressBarProps) {
    const { t } = useTranslation();

    const totalAssignments = relay.legs.reduce(
        (sum, leg) => sum + (leg.assignedRunners?.length || 0), 0
    );

    const totalNeededRunners = relay.legs.length;
    const progressPercentage = (totalAssignments / totalNeededRunners) * 100;

    return (
        <div className="bg-card/50 backdrop-blur-sm border border-border p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">{t('relays.details.progress')}</h3>
            <div className="flex justify-between text-sm mb-1">
                <span>{t('relays.details.runnersAssigned', { count: totalAssignments })}</span>
                <span>{t('relays.details.totalPositions', { count: totalNeededRunners })}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
        </div>
    );
} 