import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Users, List, Trophy, Settings, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { useTranslation } from 'react-i18next';
import LanguageIndicator from '../language/LanguageIndicator';
import UserSelector from '@/components/UserSelector';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/', label: t('navigation.relays'), icon: <MapPin className="h-5 w-5" /> },
    { path: '/runners', label: t('navigation.runners'), icon: <Users className="h-5 w-5" /> },
    { path: '/clubs', label: t('navigation.clubs'), icon: <List className="h-5 w-5" /> },
    { path: '/results', label: t('navigation.results'), icon: <Trophy className="h-5 w-5" /> },
    { path: '/settings', label: t('navigation.settings'), icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <nav className="bg-forest py-2 border-b border-forest-light/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-white">
            <Logo size={64} />
            <span className="text-xl font-bold">OLMan25</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-compass",
                  location.pathname === item.path
                    ? "text-compass-light"
                    : "text-white/90"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            <LanguageIndicator />
            <UserSelector />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <LanguageIndicator />
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-forest-light"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-2 border-t border-forest-light/30">
            <div className="flex flex-col space-y-4 pb-3">
              <div className="px-2 py-2 mb-2">
                <UserSelector />
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 px-2 py-2 rounded-md transition-colors",
                    location.pathname === item.path
                      ? "bg-forest-light text-compass-light"
                      : "text-white/90 hover:bg-forest-light hover:text-white"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
