
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Users, List, Trophy, Settings, MapPin, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Relays', icon: <MapPin className="h-5 w-5" /> },
    { path: '/runners', label: 'Runners', icon: <Users className="h-5 w-5" /> },
    { path: '/clubs', label: 'Clubs', icon: <List className="h-5 w-5" /> },
    { path: '/results', label: 'Results', icon: <Trophy className="h-5 w-5" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <nav className="bg-forest py-2 border-b border-forest-light/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-white">
            <div className="relative">
              <div className="bg-white p-2 rounded-md">
                {/* Orienteering Control */}
                <div className="control-icon w-6 h-6 bg-white border-2 border-compass rounded-md grid grid-cols-2 grid-rows-2">
                  <div className="bg-compass"></div>
                  <div className="bg-white"></div>
                  <div className="bg-white"></div>
                  <div className="bg-compass"></div>
                </div>
                {/* Overlapping Runner */}
                <Activity className="absolute -right-2 -bottom-2 h-6 w-6 text-primary bg-white rounded-full p-0.5" />
              </div>
            </div>
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
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-forest-light"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-2 border-t border-forest-light/30">
            <div className="flex flex-col space-y-4 pb-3">
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
