
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Calendar, Users } from 'lucide-react';
import { Relay } from '@/types';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SubmissionForm from './SubmissionForm';

interface RelayCardProps {
  relay: Relay;
}

const statusColors = {
  'Upcoming': 'bg-blue-500 text-white',
  'Active': 'bg-green-500 text-white',
  'Completed': 'bg-gray-500 text-white',
};

const RelayCard = ({ relay }: RelayCardProps) => {
  const { setSelectedRelay } = useAppContext();
  const navigate = useNavigate();
  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);

  const totalRunners = relay.legs.reduce(
    (sum, leg) => sum + (leg.assignedRunners?.length || 0), 0
  );
  
  const totalLegs = relay.legs.length;
  
  const handleViewDetails = () => {
    setSelectedRelay(relay);
    navigate(`/relay/${relay.id}`);
  };

  return (
    <Card className="overflow-hidden border-terrain/20 transition-all duration-200 hover:shadow-md hover:border-terrain/40 backdrop-blur-sm bg-card/90">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold text-foreground">{relay.name}</CardTitle>
          <Badge className={`${statusColors[relay.status]} text-xs px-2 py-1 rounded-full`}>
            {relay.status}
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground flex items-center gap-1">
          <Calendar className="h-3 w-3" /> {relay.date}
        </CardDescription>
        <CardDescription className="text-muted-foreground flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {relay.location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-1">
          <div className="flex items-center justify-between text-sm text-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" /> 
              {totalRunners} runners assigned
            </span>
            <span>{totalLegs} legs</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-compass" 
              style={{ width: `${(totalRunners / (totalLegs * 2)) * 100}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleViewDetails}
          className="flex-1 border-terrain/30 hover:border-terrain hover:bg-terrain/10"
        >
          View Details
        </Button>
        
        <Dialog open={submissionDialogOpen} onOpenChange={setSubmissionDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="secondary" 
              size="sm"
              className="flex-1"
            >
              Submit Interest
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <SubmissionForm 
              relayId={relay.id} 
              onClose={() => setSubmissionDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default RelayCard;
