import { useState } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Globe, Wifi, WifiOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/contexts/AppContext';
import { useLanguage } from '@/hooks/useLanguage';

const APP_VERSION = '0.1.0';

const Settings = () => {
  const { clubs } = useAppContext();
  const { t, changeLanguage, getSupportedLanguages, getCurrentLanguage } = useLanguage();
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [defaultClub, setDefaultClub] = useState('');
  const [offlineMode, setOfflineMode] = useState(false);
  const languages = getSupportedLanguages();
  const currentLanguage = getCurrentLanguage();

  const handleThemeChange = (newTheme: 'dark' | 'light' | 'system') => {
    setTheme(newTheme);
  };

  const handleOfflineModeToggle = () => {
    setOfflineMode(!offlineMode);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <SettingsIcon className="text-compass mr-2 h-6 w-6" />
        <h1 className="text-2xl font-bold">{t('settings.title')}</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('settings.appearance.title')}</CardTitle>
            <CardDescription>{t('settings.appearance.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t('settings.appearance.theme.title')}</Label>
              <div className="flex gap-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleThemeChange('light')}
                  className="flex items-center gap-2"
                >
                  <Sun className="h-4 w-4" /> {t('settings.appearance.theme.light')}
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleThemeChange('dark')}
                  className="flex items-center gap-2"
                >
                  <Moon className="h-4 w-4" /> {t('settings.appearance.theme.dark')}
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleThemeChange('system')}
                >
                  {t('settings.appearance.theme.system')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('settings.language.title')}</CardTitle>
            <CardDescription>{t('settings.language.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t('settings.language.select')}</Label>
              <Select value={currentLanguage} onValueChange={changeLanguage}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder={t('settings.language.select')} />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('settings.defaultClub.title')}</CardTitle>
            <CardDescription>{t('settings.defaultClub.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Select value={defaultClub} onValueChange={setDefaultClub}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder={t('settings.defaultClub.select')} />
                </SelectTrigger>
                <SelectContent>
                  {clubs.map(club => (
                    <SelectItem key={club.id} value={club.id}>
                      {club.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
