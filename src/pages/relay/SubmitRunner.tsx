import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserRole } from '@/types';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const SubmitRunner = () => {
    const { relayId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { relays, clubs, currentUser } = useAppContext();
    const [selectedLeg, setSelectedLeg] = useState('');
    const [selectedClubId, setSelectedClubId] = useState('');
    const [error, setError] = useState('');

    const relay = relays.find(r => r.id === relayId);

    if (!relay || !currentUser) {
        return <div>{t('common.notFound')}</div>;
    }

    // Get the user's clubs
    const userClubs = clubs.filter(club => currentUser.clubIds.includes(club.id));

    // Get the teams for the relay that belong to the user's clubs
    const userClubTeams = relay.teams?.filter(team =>
        currentUser.clubIds.includes(team.clubId)
    ) || [];

    // Check if the user has already submitted to this relay
    const hasSubmitted = relay.submissions?.some(
        sub => sub.runnerId === currentUser.id && sub.relayId === relay.id
    );

    if (currentUser.role !== UserRole.Runner || userClubTeams.length === 0 || hasSubmitted) {
        return (
            <div className="container mx-auto px-4 py-6">
                <Card className="border-red-200">
                    <CardHeader>
                        <CardTitle className="text-red-500">{t('common.accessDenied')}</CardTitle>
                        <CardDescription>
                            {hasSubmitted
                                ? t('relays.alreadySubmitted')
                                : userClubTeams.length === 0
                                    ? t('relays.noTeamForYourClub')
                                    : t('common.accessDeniedDescription')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={() => navigate(`/relay/${relayId}`)}
                            className="bg-compass text-white hover:bg-compass-dark"
                        >
                            {t('relays.backToRelay')}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedLeg) {
            setError(t('relays.errors.selectLeg'));
            return;
        }

        if (userClubs.length > 1 && !selectedClubId) {
            setError(t('relays.errors.selectClub'));
            return;
        }

        const clubId = userClubs.length === 1 ? userClubs[0].id : selectedClubId;

        // Find the team for the selected club
        const team = relay.teams?.find(team => team.clubId === clubId);

        if (!team) {
            setError(t('relays.errors.noTeamFound'));
            return;
        }

        // TODO: Implement runner submission logic
        // For now, just navigate back to the relay details page
        navigate(`/relay/${relayId}`);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <Card>
                <CardHeader>
                    <CardTitle>{t('relays.sendSubmission')}</CardTitle>
                    <CardDescription>
                        {t('relays.submitDescription', { relay: relay.name })}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>{t('common.error')}</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {userClubs.length > 1 && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t('relays.selectClub')}</label>
                                <Select value={selectedClubId} onValueChange={setSelectedClubId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('relays.selectClubPlaceholder')} />
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
                            <label className="text-sm font-medium">{t('relays.selectLeg')}</label>
                            <Select value={selectedLeg} onValueChange={setSelectedLeg}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('relays.selectLegPlaceholder')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {relay.legs.map(leg => (
                                        <SelectItem key={leg.id} value={leg.id}>
                                            {t('relays.legNumber', { number: leg.number })}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate(`/relay/${relayId}`)}
                            >
                                {t('common.cancel')}
                            </Button>
                            <Button type="submit" className="bg-compass text-white hover:bg-compass-dark">
                                {t('common.submit')}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SubmitRunner; 