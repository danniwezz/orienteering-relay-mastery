import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/contexts/AppContext';

export const useLanguage = () => {
    const { t, i18n } = useTranslation();
    const { setLanguage } = useAppContext();

    const changeLanguage = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
        i18n.changeLanguage(lang);
    };

    const getSupportedLanguages = () => [
        { code: 'en', name: 'English' },
        { code: 'sv', name: 'Svenska' }
    ];

    const getCurrentLanguage = () => i18n.language;

    return {
        t,
        i18n,
        changeLanguage,
        getSupportedLanguages,
        getCurrentLanguage
    };
};