import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Calendar, ArrowLeft, Users, Edit } from 'lucide-react';
import { Relay, UserRole, User } from '@/types';
import { RelayEditForm } from './RelayEditForm';
import { RelayAssignDialog } from './RelayAssignDialog';

interface RelayHeaderProps {
    relay: Relay;
    currentUser: User | null;
    onUpdateRelay: (updatedRelay: Relay) => void;
    onAssignRunner: (runnerId: string, legId: string, teamNumber: number) => void;
}

export function RelayHeader({ relay, currentUser, onUpdateRelay, onAssignRunner }: RelayHeaderProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [assignDialogOpen, setAssignDialogOpen] = useState(false);

    const statusColors = {
        'Upcoming': 'bg-blue-500',
        'Active': 'bg-green-500',
        'Completed': 'bg-gray-500',
    };

    return (
        <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('common.back')}
            </Button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">{relay.name}</h1>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2 text-muted-foreground">
                        <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {relay.date}
                        </span>
                        <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {relay.location}
                        </span>
                        <Badge className={`${statusColors[relay.status]} text-white text-xs px-2 py-1 rounded-full`}>
                            {t(`common.status.${relay.status.toLowerCase()}`)}
                        </Badge>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Edit className="mr-2 h-4 w-4" />
                                {t('common.edit')}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{t('common.edit')}</DialogTitle>
                            </DialogHeader>
                            <RelayEditForm
                                relay={relay}
                                onSave={(updatedRelay) => {
                                    onUpdateRelay(updatedRelay);
                                    setEditDialogOpen(false);
                                }}
                            />
                        </DialogContent>
                    </Dialog>

                    <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-compass hover:bg-compass-dark">
                                <Users className="mr-2 h-4 w-4" />
                                {t('runners.assignRunner')}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px]">
                            <DialogHeader>
                                <DialogTitle>{t('runners.assignRunner')}</DialogTitle>
                            </DialogHeader>
                            <RelayAssignDialog
                                relay={relay}
                                onAssignRunner={(runnerId, legId, teamNumber) => {
                                    onAssignRunner(runnerId, legId, teamNumber);
                                    setAssignDialogOpen(false);
                                }}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
} 