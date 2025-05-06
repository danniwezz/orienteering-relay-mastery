
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Club } from '@/types';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, MapPin } from 'lucide-react';

interface ClubCardProps {
  club: Club;
}

const ClubCard = ({ club }: ClubCardProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/club/${club.id}`);
  };

  return (
    <Card className="overflow-hidden border-terrain/20 transition-all duration-200 hover:shadow-md hover:border-terrain/40 backdrop-blur-sm bg-card/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-primary">{club.name}</CardTitle>
        {club.location && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {club.location}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1 text-sm">
          <Users className="h-4 w-4" />
          <span>{club.runners.length} runners</span>
        </div>
        {club.relays && club.relays.length > 0 && (
          <div className="mt-2 text-sm">
            <span className="text-muted-foreground">Active in {club.relays.length} relays</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleViewDetails}
          className="w-full border-terrain/30 hover:border-terrain hover:bg-terrain/10"
        >
          View Club
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClubCard;
