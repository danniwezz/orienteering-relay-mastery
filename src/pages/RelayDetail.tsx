import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RelayFile, UserRole } from '@/types';
import { RelayDescription } from '@/components/relays/RelayDescription';
import { RelayHeader } from '@/components/relays/RelayHeader';
import { RelayProgressBar } from '@/components/relays/RelayProgressBar';
import { RelaySummaryCard } from '@/components/relays/RelaySummaryCard';
import { RelayLegsPanel } from '@/components/relays/RelayLegsPanel';
import { RelayRunnersPanel } from '@/components/relays/RelayRunnersPanel';
import { toast } from 'sonner';

const RelayDetail = () => {
  const { relayId } = useParams<{ relayId: string }>();
  const navigate = useNavigate();
  const { relays, runners, selectedRelay, setSelectedRelay, assignRunner, updateRelay, currentUser } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (relayId) {
      const foundRelay = relays.find(r => r.id === relayId);
      setSelectedRelay(foundRelay || null);
    }
  }, [relayId, relays, setSelectedRelay]);

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

  return (
    <div className="container mx-auto px-4 py-6">
      <RelayHeader
        relay={selectedRelay}
        currentUser={currentUser}
        onUpdateRelay={updateRelay}
        onAssignRunner={assignRunner}
      />

      <RelayProgressBar relay={selectedRelay} />

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">{t('relays.details.overview')}</TabsTrigger>
          <TabsTrigger value="legs">{t('relays.details.legs')}</TabsTrigger>
          <TabsTrigger value="runners">{t('relays.details.runners')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <RelayDescription
            description={selectedRelay.description}
            files={selectedRelay.files}
            canEdit={currentUser?.role === UserRole.Admin}
            onSaveDescription={(description) => {
              if (selectedRelay) {
                const updatedRelay = {
                  ...selectedRelay,
                  description
                };
                updateRelay(updatedRelay);
              }
            }}
            onUploadFile={(file) => {
              // Mock implementation for demo purposes
              const newFile: RelayFile = {
                id: `file-${Date.now()}`,
                relayId: selectedRelay.id,
                fileName: file.name,
                fileType: file.type,
                fileSize: file.size,
                url: URL.createObjectURL(file), // In a real app, this would be a server URL
                uploadedAt: new Date().toISOString(),
                uploadedBy: currentUser?.id || ''
              };

              const updatedRelay = {
                ...selectedRelay,
                files: [...(selectedRelay.files || []), newFile]
              };

              updateRelay(updatedRelay);
              toast.success(t('relays.details.fileUploaded'));
            }}
            onDeleteFile={(fileId) => {
              const updatedRelay = {
                ...selectedRelay,
                files: selectedRelay.files?.filter(f => f.id !== fileId)
              };

              updateRelay(updatedRelay);
              toast.success(t('relays.details.fileDeleted'));
            }}
          />

          <RelaySummaryCard relay={selectedRelay} />
        </TabsContent>

        <TabsContent value="legs" className="mt-6">
          <RelayLegsPanel
            relay={selectedRelay}
            onAssignLegRunner={() => setAssignDialogOpen(true)}
          />
        </TabsContent>

        <TabsContent value="runners" className="mt-6">
          <RelayRunnersPanel
            relay={selectedRelay}
            onAssignRunner={() => setAssignDialogOpen(true)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RelayDetail;
