import { format, formatDistance } from 'date-fns';
import { sv, enUS } from 'date-fns/locale';

const locales = {
    'en': enUS,
    'sv': sv
};

export const formatDate = (date: string | Date, formatStr: string = 'PPP', locale: string = 'en') => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, formatStr, { locale: locales[locale] || enUS });
};

export const formatRelativeTime = (date: string | Date, locale: string = 'en') => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return formatDistance(dateObj, new Date(), {
        addSuffix: true,
        locale: locales[locale] || enUS
    });
};

export const formatShortDate = (date: string | Date, locale: string = 'en') => {
    return formatDate(date, 'P', locale);
};

export const formatDateTime = (date: string | Date, locale: string = 'en') => {
    return formatDate(date, 'PPp', locale);
};