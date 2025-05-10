import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/contexts/AppContext';
import { Badge } from '@/components/ui/badge';
import { difficultyToTranslationKey, Relay } from '@/types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'sonner';

interface RelayAssignDialogProps {
    relay: Relay;
    onAssignRunner: (runnerId: string, legId: string, teamNumber: number) => void;
}

export function RelayAssignDialog({ relay, onAssignRunner }: RelayAssignDialogProps) {
    const { t } = useTranslation();
    const { runners } = useAppContext();
    const [selectedLeg, setSelectedLeg] = useState<string | null>(null);

    const difficultyColors = {
        'Easy': 'bg-green-400',
        'Medium': 'bg-blue-400',
        'Hard': 'bg-amber-400',
        'VeryHard': 'bg-red-400',
    };

    const availableRunners = runners.filter(runner => {
        // Filter out runners that are already assigned to any leg in this relay
        const isAlreadyAssigned = relay.legs.some(leg =>
            leg.assignedRunners?.some(assignment => assignment.runnerId === runner.id)
        );
        return !isAlreadyAssigned;
    });

    const handleDragEnd = (result) => {
        if (!result.destination || !selectedLeg) return;

        const runnerId = result.draggableId;
        const teamNumber = parseInt(result.destination.droppableId.replace('team-', ''));

        onAssignRunner(runnerId, selectedLeg, teamNumber);
        toast.success(t('relays.runnerAssigned'));
    };

    return (
        <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-medium mb-2">{t('relays.details.selectLeg')}</h3>
                    <div className="space-y-2">
                        {relay.legs.map((leg) => (
                            <div
                                key={leg.id}
                                onClick={() => setSelectedLeg(leg.id)}
                                className={`p-2 border rounded-md cursor-pointer ${selectedLeg === leg.id ? 'bg-primary/20 border-primary' : 'hover:bg-muted'
                                    }`}
                            >
                                <div className="flex justify-between">
                                    <span>{t('relays.details.leg')} {leg.number}</span>
                                    <Badge className={`${difficultyColors[leg.difficulty]} text-xs px-2 py-0.5 rounded-full text-black`}>
                                        {t(`relays.details.difficulty.${difficultyToTranslationKey(leg.difficulty)}`)}
                                    </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">{leg.distance} km</div>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedLeg && (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <div>
                            <h3 className="font-medium mb-2">{t('relays.details.dragRunners')}</h3>
                            <div className="space-y-4">
                                <Droppable droppableId="runner-pool">
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="p-2 border border-dashed rounded-md bg-muted/50 min-h-[100px]"
                                        >
                                            <h4 className="text-sm font-medium mb-2">{t('relays.details.availableRunners')}</h4>
                                            {availableRunners.length > 0 ? (
                                                <div className="space-y-1">
                                                    {availableRunners.map((runner, index) => (
                                                        <Draggable key={runner.id} draggableId={runner.id} index={index}>
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="bg-card p-2 rounded-md text-sm"
                                                                >
                                                                    {runner.name} ({runner.club})
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-sm text-muted-foreground text-center py-4">
                                                    {t('relays.details.noAvailableRunners')}
                                                </div>
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>

                                <div className="grid grid-cols-2 gap-2">
                                    {[1, 2].map(teamNum => (
                                        <Droppable droppableId={`team-${teamNum}`} key={teamNum}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    className="p-2 border border-dashed rounded-md min-h-[80px]"
                                                >
                                                    <h4 className="text-sm font-medium mb-2">{t('relays.details.team')} {teamNum}</h4>
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </DragDropContext>
                )}
            </div>
        </div>
    );
} 