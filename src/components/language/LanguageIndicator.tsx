import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

const LanguageIndicator = () => {
    const { getCurrentLanguage, changeLanguage } = useLanguage();
    const currentLang = getCurrentLanguage();

    const toggleLanguage = () => {
        const newLang = currentLang === 'en' ? 'sv' : 'en';
        changeLanguage(newLang);
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center space-x-1 text-white/90 hover:text-white"
        >
            <Globe className="h-4 w-4" />
            <span className="uppercase">{currentLang}</span>
        </Button>
    );
};

export default LanguageIndicator;