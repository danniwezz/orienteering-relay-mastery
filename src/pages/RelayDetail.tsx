
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapPin, Calendar, ArrowLeft, Users, Route, Mountain } from 'lucide-react';
import { useState, useEffect } from 'react';

const RelayDetail = () => {
  const { relayId } = useParams<{ relayId: string }>();
  const navigate = useNavigate();
  const { relays, runners, selectedRelay, setSelectedRelay } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (relayId) {
      const foundRelay = relays.find(r => r.id === relayId);
      setSelectedRelay(foundRelay || null);
    }
  }, [relayId, relays, setSelectedRelay]);

  if (!selectedRelay) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Relay not found</h2>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Relays
        </Button>
      </div>
    );
  }

  const statusColors = {
    'Upcoming': 'bg-blue-500',
    'Active': 'bg-green-500',
    'Completed': 'bg-gray-500',
  };

  const difficultyColors = {
    'Easy': 'bg-green-400',
    'Medium': 'bg-blue-400',
    'Hard': 'bg-amber-400',
    'Very Hard': 'bg-red-400',
  };

  const totalAssignments = selectedRelay.legs.reduce(
    (sum, leg) => sum + (leg.assignedRunners?.length || 0), 0
  );
  
  const totalNeededRunners = selectedRelay.legs.length; // Simplified - in reality might be more complex

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Relays
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{selectedRelay.name}</h1>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2 text-muted-foreground">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {selectedRelay.date}
              </span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {selectedRelay.location}
              </span>
              <Badge className={`${statusColors[selectedRelay.status]} text-xs px-2 py-1 rounded-full`}>
                {selectedRelay.status}
              </Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">Edit Relay</Button>
            <Button className="bg-compass hover:bg-compass-dark">
              <Users className="mr-2 h-4 w-4" />
              Assign Runners
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-2">Runner Assignment Progress</h3>
        <div className="flex justify-between text-sm mb-1">
          <span>{totalAssignments} runners assigned</span>
          <span>{totalNeededRunners} total positions</span>
        </div>
        <Progress value={(totalAssignments / totalNeededRunners) * 100} className="h-2" />
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="legs">Legs</TabsTrigger>
          <TabsTrigger value="runners">Assigned Runners</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          {selectedRelay.description && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{selectedRelay.description}</p>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Route className="h-5 w-5 text-compass" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Legs</p>
                    <p className="font-medium">{selectedRelay.legs.length}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-compass" />
                  <div>
                    <p className="text-sm text-muted-foreground">Runners Assigned</p>
                    <p className="font-medium">{totalAssignments} / {totalNeededRunners}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Mountain className="h-5 w-5 text-compass" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Distance</p>
                    <p className="font-medium">
                      {selectedRelay.legs.reduce((sum, leg) => sum + leg.distance, 0).toFixed(1)} km
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="legs" className="mt-6">
          <div className="grid gap-4">
            {selectedRelay.legs.map((leg) => (
              <Card key={leg.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <h3 className="font-bold flex items-center gap-2">
                        Leg {leg.legNumber}
                        <Badge className={`${difficultyColors[leg.difficulty]} text-xs px-2 py-0.5 rounded-full text-black`}>
                          {leg.difficulty}
                        </Badge>
                      </h3>
                      <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        <div className="flex items-center gap-1">
                          <Route className="h-3 w-3 text-muted-foreground" />
                          <span>{leg.distance} km</span>
                        </div>
                        {leg.timeOfDay && (
                          <div>
                            <span className="text-muted-foreground">Time: </span>
                            {leg.timeOfDay}
                          </div>
                        )}
                      </div>
                      {leg.terrainType && leg.terrainType.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {leg.terrainType.map((terrain, i) => (
                            <span key={i} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                              {terrain}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="min-w-[200px]">
                      <div className="text-sm font-medium mb-2">
                        {leg.assignedRunners?.length || 0} Runner{leg.assignedRunners?.length !== 1 && 's'} Assigned
                      </div>
                      {leg.assignedRunners && leg.assignedRunners.length > 0 ? (
                        <div className="space-y-1">
                          {leg.assignedRunners.map((assignment) => (
                            <div key={assignment.runnerId} className="text-sm p-1.5 bg-muted rounded-md flex justify-between">
                              <span>{assignment.runnerName}</span>
                              <span className="text-muted-foreground">Team {assignment.teamNumber}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" className="w-full">
                          Assign Runner
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="runners" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Runners</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedRelay.legs.some(leg => leg.assignedRunners && leg.assignedRunners.length > 0) ? (
                <div className="space-y-4">
                  {selectedRelay.legs
                    .filter(leg => leg.assignedRunners && leg.assignedRunners.length > 0)
                    .map((leg) => (
                      <div key={leg.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                        <h3 className="font-medium mb-2">Leg {leg.legNumber} - {leg.distance} km</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {leg.assignedRunners!.map((assignment) => {
                            const runner = runners.find(r => r.id === assignment.runnerId);
                            return (
                              <div 
                                key={assignment.runnerId} 
                                className="p-3 bg-muted rounded-md flex justify-between items-center"
                              >
                                <div>
                                  <div className="font-medium">{runner?.name}</div>
                                  <div className="text-sm text-muted-foreground">{runner?.club}</div>
                                </div>
                                <Badge>Team {assignment.teamNumber}</Badge>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No runners have been assigned yet.</p>
                  <Button className="mt-4 bg-compass hover:bg-compass-dark">
                    Assign Runners
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RelayDetail;
