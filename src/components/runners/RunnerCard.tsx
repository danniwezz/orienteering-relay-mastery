import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Runner } from '@/types';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Flag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface RunnerCardProps {
  runner: Runner;
}

const experienceColors = {
  'Beginner': 'bg-green-400',
  'Intermediate': 'bg-blue-400',
  'Advanced': 'bg-amber-400',
  'Elite': 'bg-red-400',
};

const RunnerCard = ({ runner }: RunnerCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleViewProfile = () => {
    navigate(`/runner/${runner.id}`);
  };

  return (
    <Card className="overflow-hidden border-terrain/20 transition-all duration-200 hover:shadow-md hover:border-terrain/40 backdrop-blur-sm bg-card/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex justify-between">
          <span className="text-primary">{runner.name}</span>
          {runner.experience && (
            <span className={`text-xs ${experienceColors[runner.experience]} px-2 py-1 rounded-full text-black`}>
              {t(`runners.experience.${runner.experience.toLowerCase()}`)}
            </span>
          )}
        </CardTitle>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" /> {runner.age} {t('runners.details.years')}
          </span>
          <span className="flex items-center gap-1">
            <Flag className="h-3 w-3" /> {runner.club}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {runner.preferenceTags && runner.preferenceTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {runner.preferenceTags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewProfile}
          className="w-full border-terrain/30 hover:border-terrain hover:bg-terrain/10"
        >
          {t('runners.viewProfile')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RunnerCard;
