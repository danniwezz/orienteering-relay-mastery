import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MapPin, Calendar, ArrowLeft, Users, Route, Mountain, Plus, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const RelayDetail = () => {
  const { relayId } = useParams<{ relayId: string }>();
  const navigate = useNavigate();
  const { relays, runners, selectedRelay, setSelectedRelay, assignRunner, updateRelay } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedLeg, setSelectedLeg] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (relayId) {
      const foundRelay = relays.find(r => r.id === relayId);
      setSelectedRelay(foundRelay || null);
    }
  }, [relayId, relays, setSelectedRelay]);

  const editForm = useForm({
    defaultValues: {
      name: selectedRelay?.name || '',
      location: selectedRelay?.location || '',
      date: selectedRelay?.date || '',
      description: selectedRelay?.description || '',
    }
  });

  useEffect(() => {
    if (selectedRelay) {
      editForm.reset({
        name: selectedRelay.name,
        location: selectedRelay.location,
        date: selectedRelay.date,
        description: selectedRelay.description || '',
      });
    }
  }, [selectedRelay, editForm]);

  const handleEditSubmit = (data) => {
    if (!selectedRelay) return;

    const updatedRelay = {
      ...selectedRelay,
      name: data.name,
      location: data.location,
      date: data.date,
      description: data.description,
    };

    updateRelay(updatedRelay);
    setEditDialogOpen(false);
    toast.success("Relay updated successfully");
  };

  const handleDragEnd = (result) => {
    if (!result.destination || !selectedLeg) return;

    const runnerId = result.draggableId;
    const teamNumber = parseInt(result.destination.droppableId.replace('team-', ''));

    assignRunner(runnerId, selectedLeg, teamNumber);
    toast.success("Runner assigned successfully");
  };

  if (!selectedRelay) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">{t('relays.notFound')}</h2>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('common.back')}
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

  const totalNeededRunners = selectedRelay.legs.length;

  const availableRunners = runners.filter(runner => {
    // Filter out runners that are already assigned to any leg in this relay
    const isAlreadyAssigned = selectedRelay.legs.some(leg =>
      leg.assignedRunners?.some(assignment => assignment.runnerId === runner.id)
    );
    return !isAlreadyAssigned;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('common.back')}
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
              <Badge className={`${statusColors[selectedRelay.status]} text-white text-xs px-2 py-1 rounded-full`}>
                {t(`common.status.${selectedRelay.status.toLowerCase()}`)}
              </Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  {t('common.edit')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t('relays.edit.title')}</DialogTitle>
                </DialogHeader>
                <Form {...editForm}>
                  <form onSubmit={editForm.handleSubmit(handleEditSubmit)} className="space-y-4">
                    <FormField
                      control={editForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('relays.edit.name')}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('relays.edit.location')}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editForm.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('relays.edit.date')}</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('relays.edit.description')}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
                      <Button type="submit">{t('common.saveChanges')}</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-compass hover:bg-compass-dark">
                  <Users className="mr-2 h-4 w-4" />
                  {t('runners.assignRunner')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>{t('runners.assignRunner')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">{t('relays.details.selectLeg')}</h3>
                      <div className="space-y-2">
                        {selectedRelay.legs.map((leg) => (
                          <div
                            key={leg.id}
                            onClick={() => setSelectedLeg(leg.id)}
                            className={`p-2 border rounded-md cursor-pointer ${selectedLeg === leg.id ? 'bg-primary/20 border-primary' : 'hover:bg-muted'
                              }`}
                          >
                            <div className="flex justify-between">
                              <span>{t('relays.details.leg')} {leg.legNumber}</span>
                              <Badge className={`${difficultyColors[leg.difficulty]} text-xs px-2 py-0.5 rounded-full text-black`}>
                                {t(`relays.details.difficulty.${leg.difficulty.toLowerCase()}`)}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">{leg.distance} km</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedLeg && (
                      <DragDropContext onDragEnd={handleDragEnd}>
                        <div>
                          <h3 className="font-medium mb-2">{t('relays.details.dragRunners')}</h3>
                          <div className="space-y-4">
                            <Droppable droppableId="runner-pool">
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className="p-2 border border-dashed rounded-md bg-muted/50 min-h-[100px]"
                                >
                                  <h4 className="text-sm font-medium mb-2">{t('relays.details.availableRunners')}</h4>
                                  {availableRunners.length > 0 ? (
                                    <div className="space-y-1">
                                      {availableRunners.map((runner, index) => (
                                        <Draggable key={runner.id} draggableId={runner.id} index={index}>
                                          {(provided) => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className="bg-card p-2 rounded-md text-sm"
                                            >
                                              {runner.name} ({runner.club})
                                            </div>
                                          )}
                                        </Draggable>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-sm text-muted-foreground text-center py-4">
                                      {t('relays.details.noAvailableRunners')}
                                    </div>
                                  )}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>

                            <div className="grid grid-cols-2 gap-2">
                              {[1, 2].map(teamNum => (
                                <Droppable droppableId={`team-${teamNum}`} key={teamNum}>
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.droppableProps}
                                      className="p-2 border border-dashed rounded-md min-h-[80px]"
                                    >
                                      <h4 className="text-sm font-medium mb-2">{t('relays.details.team')} {teamNum}</h4>
                                      {provided.placeholder}
                                    </div>
                                  )}
                                </Droppable>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DragDropContext>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-2">{t('relays.details.progress')}</h3>
        <div className="flex justify-between text-sm mb-1">
          <span>{t('relays.details.runnersAssigned', { count: totalAssignments })}</span>
          <span>{t('relays.details.totalPositions', { count: totalNeededRunners })}</span>
        </div>
        <Progress value={(totalAssignments / totalNeededRunners) * 100} className="h-2" />
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">{t('relays.details.overview')}</TabsTrigger>
          <TabsTrigger value="legs">{t('relays.details.legs')}</TabsTrigger>
          <TabsTrigger value="runners">{t('relays.details.runners')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {selectedRelay.description && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t('relays.details.description')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{selectedRelay.description}</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>{t('relays.details.summary')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Route className="h-5 w-5 text-compass" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t('relays.details.totalLegs')}</p>
                    <p className="font-medium">{selectedRelay.legs.length}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-compass" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t('relays.details.runnersAssigned')}</p>
                    <p className="font-medium">{totalAssignments} / {totalNeededRunners}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Mountain className="h-5 w-5 text-compass" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t('relays.details.totalDistance')}</p>
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
                        {t('relays.details.leg')} {leg.legNumber}
                        <Badge className={`${difficultyColors[leg.difficulty]} text-xs px-2 py-0.5 rounded-full text-black`}>
                          {t(`relays.details.difficulty.${leg.difficulty.toLowerCase()}`)}
                        </Badge>
                      </h3>
                      <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        <div className="flex items-center gap-1">
                          <Route className="h-3 w-3 text-muted-foreground" />
                          <span>{leg.distance} km</span>
                        </div>
                        {leg.timeOfDay && (
                          <div>
                            <span className="text-muted-foreground">{t('relays.details.time')}: </span>
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
                        {leg.assignedRunners?.length || 0} {t('relays.details.runner', { count: leg.assignedRunners?.length })}
                      </div>
                      {leg.assignedRunners && leg.assignedRunners.length > 0 ? (
                        <div className="space-y-1">
                          {leg.assignedRunners.map((assignment) => (
                            <div key={assignment.runnerId} className="text-sm p-1.5 bg-muted rounded-md flex justify-between">
                              <span>{assignment.runnerName}</span>
                              <span className="text-muted-foreground">{t('relays.details.team')} {assignment.teamNumber}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" className="w-full">
                          {t('relays.details.assignRunner')}
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
              <CardTitle>{t('relays.details.assignedRunners')}</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedRelay.legs.some(leg => leg.assignedRunners && leg.assignedRunners.length > 0) ? (
                <div className="space-y-4">
                  {selectedRelay.legs
                    .filter(leg => leg.assignedRunners && leg.assignedRunners.length > 0)
                    .map((leg) => (
                      <div key={leg.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                        <h3 className="font-medium mb-2">{t('relays.details.leg')} {leg.legNumber} - {leg.distance} km</h3>
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
                                <Badge>{t('relays.details.team')} {assignment.teamNumber}</Badge>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">{t('relays.details.noRunnersAssigned')}</p>
                  <Button className="mt-4 bg-compass hover:bg-compass-dark">
                    {t('runners.assignRunner')}
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
