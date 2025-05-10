import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserRole } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CreateTeam = () => {
    const { relayId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { relays, currentUser, clubs } = useAppContext();
    const [teamName, setTeamName] = useState('');
    const [selectedClubId, setSelectedClubId] = useState<string | undefined>(
        currentUser?.clubIds?.[0]
    );

    const relay = relays.find(r => r.id === relayId);

    // Check if user has clubs
    if (!currentUser?.clubIds?.length) {
        return (
            <div className="container mx-auto px-4 py-6">
                <Alert variant="destructive">
                    <AlertDescription>
                        {t('relays.noClubAssigned')}
                    </AlertDescription>
                </Alert>
                <div className="mt-4">
                    <Button
                        variant="outline"
                        onClick={() => navigate(`/relay/${relayId}`)}
                    >
                        {t('common.back')}
                    </Button>
                </div>
            </div>
        );
    }

    // Check if user is admin or club admin
    if (!currentUser || (currentUser.role !== UserRole.Admin && currentUser.role !== UserRole.ClubAdmin)) {
        return (
            <div className="container mx-auto px-4 py-6">
                <Alert variant="destructive">
                    <AlertDescription>
                        {t('common.unauthorized')}
                    </AlertDescription>
                </Alert>
                <div className="mt-4">
                    <Button
                        variant="outline"
                        onClick={() => navigate(`/relay/${relayId}`)}
                    >
                        {t('common.back')}
                    </Button>
                </div>
            </div>
        );
    }

    // Check if relay exists
    if (!relay) {
        return (
            <div className="container mx-auto px-4 py-6">
                <Alert variant="destructive">
                    <AlertDescription>
                        {t('common.notFound')}
                    </AlertDescription>
                </Alert>
                <div className="mt-4">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/')}
                    >
                        {t('common.back')}
                    </Button>
                </div>
            </div>
        );
    }

    // Get user's clubs
    const userClubs = clubs.filter(club =>
        currentUser.clubIds.includes(club.id)
    );

    // Check if team already exists for the selected club
    const existingTeam = selectedClubId ?
        relay.teams?.find(team => team.clubId === selectedClubId) : undefined;

    if (existingTeam) {
        return (
            <div className="container mx-auto px-4 py-6">
                <Alert>
                    <AlertDescription>
                        {t('relays.teamAlreadyExists')}
                    </AlertDescription>
                </Alert>
                <div className="mt-4">
                    <Button
                        variant="outline"
                        onClick={() => navigate(`/relay/${relayId}`)}
                    >
                        {t('common.back')}
                    </Button>
                </div>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClubId) {
            return;
        }
        // TODO: Implement team creation logic
        navigate(`/relay/${relayId}`);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <Card>
                <CardHeader>
                    <CardTitle>{t('relays.createTeam')}</CardTitle>
                    <CardDescription>
                        {t('relays.createTeamForClub')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {userClubs.length > 1 && (
                            <div className="space-y-2">
                                <Label htmlFor="club">{t('clubs.title')}</Label>
                                <Select value={selectedClubId} onValueChange={setSelectedClubId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('clubs.selectClub')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {userClubs.map(club => (
                                            <SelectItem key={club.id} value={club.id}>
                                                {club.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="teamName">{t('relays.teamName')}</Label>
                            <Input
                                id="teamName"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                placeholder={t('relays.teamNamePlaceholder')}
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate(`/relay/${relayId}`)}
                            >
                                {t('common.cancel')}
                            </Button>
                            <Button
                                type="submit"
                                className="bg-compass text-white hover:bg-compass-dark"
                                disabled={!selectedClubId}
                            >
                                {t('common.create')}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateTeam; 