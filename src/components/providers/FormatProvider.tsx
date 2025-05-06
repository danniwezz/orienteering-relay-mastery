import { createContext, useContext, ReactNode } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { formatDate, formatRelativeTime, formatShortDate, formatDateTime } from '@/utils/dateFormatter';

interface FormatContextType {
    formatDate: (date: string | Date, format?: string) => string;
    formatRelativeTime: (date: string | Date) => string;
    formatShortDate: (date: string | Date) => string;
    formatDateTime: (date: string | Date) => string;
}

const FormatContext = createContext<FormatContextType | undefined>(undefined);

export const FormatProvider = ({ children }: { children: ReactNode }) => {
    const { getCurrentLanguage } = useLanguage();

    const value = {
        formatDate: (date: string | Date, format?: string) =>
            formatDate(date, format, getCurrentLanguage()),
        formatRelativeTime: (date: string | Date) =>
            formatRelativeTime(date, getCurrentLanguage()),
        formatShortDate: (date: string | Date) =>
            formatShortDate(date, getCurrentLanguage()),
        formatDateTime: (date: string | Date) =>
            formatDateTime(date, getCurrentLanguage())
    };

    return (
        <FormatContext.Provider value={value}>
            {children}
        </FormatContext.Provider>
    );
};

export const useFormat = () => {
    const context = useContext(FormatContext);
    if (context === undefined) {
        throw new Error('useFormat must be used within a FormatProvider');
    }
    return context;
};