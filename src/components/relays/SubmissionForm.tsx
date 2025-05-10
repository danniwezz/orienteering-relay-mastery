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
import { useTranslation } from 'react-i18next';
import { difficultyToTranslationKey } from '@/types';

interface SubmissionFormProps {
  relayId: string;
  onClose: () => void;
}

const SubmissionForm = ({ relayId, onClose }: SubmissionFormProps) => {
  const { relays, addRunner } = useAppContext();
  const [selectedLegs, setSelectedLegs] = useState<string[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { t } = useTranslation();

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
    toast.success(t('submissions.successMessage'));
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
        <CardTitle>{t('submissions.title')} {relay.name}</CardTitle>
        <CardDescription>
          {t('submissions.description', { name: relay.name, date: relay.date })}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t('auth.firstName')}</Label>
              <Input
                id="firstName"
                placeholder={t('auth.firstName')}
                {...register("firstName", { required: t('auth.firstNameRequired') })}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName.message?.toString()}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t('auth.lastName')}</Label>
              <Input
                id="lastName"
                placeholder={t('auth.lastName')}
                {...register("lastName", { required: t('auth.lastNameRequired') })}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName.message?.toString()}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...register("email", { required: t('auth.emailRequired') })}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message?.toString()}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t('submissions.phone')}</Label>
              <Input
                id="phone"
                placeholder={t('submissions.phonePlaceholder')}
                {...register("phone")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="club">{t('relays.details.club')}</Label>
              <Input
                id="club"
                placeholder={t('submissions.clubPlaceholder')}
                {...register("club", { required: t('submissions.clubRequired') })}
              />
              {errors.club && (
                <p className="text-sm text-destructive">{errors.club.message?.toString()}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">{t('submissions.age')}</Label>
              <Input
                id="age"
                type="number"
                placeholder={t('submissions.agePlaceholder')}
                {...register("age", {
                  required: t('submissions.ageRequired'),
                  min: { value: 10, message: t('submissions.ageMin', { min: 10 }) },
                  max: { value: 100, message: t('submissions.ageMax', { max: 100 }) }
                })}
              />
              {errors.age && (
                <p className="text-sm text-destructive">{errors.age.message?.toString()}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">{t('submissions.gender')}</Label>
              <Select
                {...register("gender", { required: t('submissions.genderRequired') })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('submissions.genderPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t('submissions.genderMale')}</SelectItem>
                  <SelectItem value="female">{t('submissions.genderFemale')}</SelectItem>
                  <SelectItem value="other">{t('submissions.genderOther')}</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-destructive">{errors.gender.message?.toString()}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">{t('runners.details.experience')}</Label>
            <Select
              {...register("experience", { required: t('submissions.experienceRequired') })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('submissions.experiencePlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">{t('runners.experience.beginner')}</SelectItem>
                <SelectItem value="intermediate">{t('runners.experience.intermediate')}</SelectItem>
                <SelectItem value="advanced">{t('runners.experience.advanced')}</SelectItem>
                <SelectItem value="elite">{t('runners.experience.elite')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.experience && (
              <p className="text-sm text-destructive">{errors.experience.message?.toString()}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>{t('submissions.preferredLegs')}</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {relay.legs.map((leg) => (
                <div
                  key={leg.id}
                  className={`p-2 border rounded-md cursor-pointer ${selectedLegs.includes(leg.id)
                    ? 'bg-primary/20 border-primary'
                    : 'hover:bg-muted'
                    }`}
                  onClick={() => handleLegToggle(leg.id)}
                >
                  <div className="text-sm font-medium">{t('relays.details.leg')} {leg.legNumber}</div>
                  <div className="text-xs text-muted-foreground">
                    {leg.distance} km - {t(`relays.details.difficulty.${difficultyToTranslationKey(leg.difficulty)}`)}
                  </div>
                </div>
              ))}
            </div>
            {selectedLegs.length === 0 && (
              <p className="text-sm text-destructive">{t('submissions.selectLegRequired')}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">{t('submissions.notes')}</Label>
            <Textarea
              id="notes"
              placeholder={t('submissions.notesPlaceholder')}
              {...register("notes")}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" disabled={selectedLegs.length === 0}>
            {t('submissions.submitButton')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SubmissionForm;
