
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAppContext } from '@/contexts/AppContext';

interface SubmissionFormProps {
  relayId: string;
  onClose: () => void;
}

const SubmissionForm = ({ relayId, onClose }: SubmissionFormProps) => {
  const { relays, addRunner } = useAppContext();
  const [selectedLegs, setSelectedLegs] = useState<string[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const relay = relays.find(r => r.id === relayId);
  
  const onSubmit = (data) => {
    if (!relay) return;
    
    const newRunner = {
      id: `runner-${Date.now()}`,
      name: `${data.firstName} ${data.lastName}`,
      club: data.club,
      age: parseInt(data.age),
      gender: data.gender,
      experience: data.experience,
      preferredLegs: selectedLegs,
      contact: {
        email: data.email,
        phone: data.phone
      },
      notes: data.notes
    };
    
    addRunner(newRunner);
    toast.success("Submission received successfully!");
    onClose();
  };

  const handleLegToggle = (legId: string) => {
    setSelectedLegs(prev => 
      prev.includes(legId)
        ? prev.filter(id => id !== legId)
        : [...prev, legId]
    );
  };

  if (!relay) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit for {relay.name}</CardTitle>
        <CardDescription>
          Fill out this form to sign up for {relay.name} on {relay.date}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input 
                id="firstName"
                placeholder="First name" 
                {...register("firstName", { required: "First name is required" })}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input 
                id="lastName"
                placeholder="Last name" 
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email"
                placeholder="your.email@example.com" 
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone"
                placeholder="Phone number" 
                {...register("phone")}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="club">Club</Label>
              <Input 
                id="club"
                placeholder="Your club" 
                {...register("club", { required: "Club is required" })}
              />
              {errors.club && (
                <p className="text-sm text-destructive">{errors.club.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age"
                type="number"
                placeholder="Age" 
                {...register("age", { 
                  required: "Age is required",
                  min: { value: 10, message: "Age must be at least 10" },
                  max: { value: 100, message: "Age must be at most 100" }
                })}
              />
              {errors.age && (
                <p className="text-sm text-destructive">{errors.age.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                {...register("gender", { required: "Gender is required" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-destructive">{errors.gender.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level</Label>
            <Select
              {...register("experience", { required: "Experience is required" })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="elite">Elite</SelectItem>
              </SelectContent>
            </Select>
            {errors.experience && (
              <p className="text-sm text-destructive">{errors.experience.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Preferred Legs</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {relay.legs.map((leg) => (
                <div
                  key={leg.id}
                  className={`p-2 border rounded-md cursor-pointer ${
                    selectedLegs.includes(leg.id) 
                      ? 'bg-primary/20 border-primary' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => handleLegToggle(leg.id)}
                >
                  <div className="text-sm font-medium">Leg {leg.legNumber}</div>
                  <div className="text-xs text-muted-foreground">
                    {leg.distance} km - {leg.difficulty}
                  </div>
                </div>
              ))}
            </div>
            {selectedLegs.length === 0 && (
              <p className="text-sm text-destructive">Please select at least one leg</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes"
              placeholder="Any additional information..." 
              {...register("notes")}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={selectedLegs.length === 0}>
            Submit Application
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SubmissionForm;
