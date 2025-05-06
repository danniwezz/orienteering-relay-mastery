import { Compass } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LoadingScreen = () => {
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="text-center">
                <div className="mb-4">
                    <Compass className="h-12 w-12 animate-spin text-compass" />
                </div>
                <p className="text-lg text-muted-foreground">{t('common.loading')}</p>
            </div>
        </div>
    );
};

export default LoadingScreen;