
import { useState } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Globe, Wifi, WifiOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/contexts/AppContext';

// Placeholder version info - would normally come from environment variables or package.json
const APP_VERSION = '0.1.0';

const Settings = () => {
  const { clubs } = useAppContext();
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [defaultClub, setDefaultClub] = useState('');
  const [offlineMode, setOfflineMode] = useState(false);
  const [language, setLanguage] = useState('en');

  const handleThemeChange = (newTheme: 'dark' | 'light' | 'system') => {
    setTheme(newTheme);
    // In a real app, we would store this preference and apply it
    // document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleOfflineModeToggle = () => {
    setOfflineMode(!offlineMode);
    // In a real app, we would configure API clients to use local data
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    // In a real app, we would change the i18n language
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <SettingsIcon className="text-compass mr-2 h-6 w-6" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how OLMan25 looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <div className="flex gap-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleThemeChange('light')}
                  className="flex items-center gap-2"
                >
                  <Sun className="h-4 w-4" /> Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleThemeChange('dark')}
                  className="flex items-center gap-2"
                >
                  <Moon className="h-4 w-4" /> Dark
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleThemeChange('system')}
                >
                  System
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Language & Region</CardTitle>
            <CardDescription>Set your preferred language</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="sv">Svenska (Swedish)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Default Club</CardTitle>
            <CardDescription>Choose your primary club</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Club</Label>
              <Select value={defaultClub} onValueChange={setDefaultClub}>
                <SelectTrigger className="w-full md:w-[300px]">
                  <SelectValue placeholder="Select default club" />
                </SelectTrigger>
                <SelectContent>
                  {clubs.map((club) => (
                    <SelectItem key={club.id} value={club.id}>
                      {club.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Network</CardTitle>
            <CardDescription>Configure online/offline behavior</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="offline-mode">Offline Mode</Label>
                <div className="text-sm text-muted-foreground">
                  Work offline and sync when connected
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {offlineMode ? <WifiOff className="h-4 w-4 text-muted-foreground" /> : <Wifi className="h-4 w-4 text-primary" />}
                <Switch
                  id="offline-mode"
                  checked={offlineMode}
                  onCheckedChange={handleOfflineModeToggle}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>Information about OLMan25</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <div className="text-sm font-medium">Version</div>
              <div className="text-sm text-muted-foreground">{APP_VERSION}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">Build</div>
              <div className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
