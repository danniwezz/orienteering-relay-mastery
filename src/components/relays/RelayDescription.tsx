import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RelayFile } from '@/types';
import { Pencil, Upload, File, X, Download, Paperclip } from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { toast } from 'sonner';

interface RelayDescriptionProps {
    description?: string;
    files?: RelayFile[];
    canEdit: boolean;
    onSaveDescription: (description: string) => void;
    onUploadFile: (file: File) => void;
    onDeleteFile: (fileId: string) => void;
}

export function RelayDescription({
    description = '',
    files = [],
    canEdit,
    onSaveDescription,
    onUploadFile,
    onDeleteFile
}: RelayDescriptionProps) {
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(description);
    const [activeTab, setActiveTab] = useState('description');

    const handleSaveDescription = () => {
        onSaveDescription(editedDescription);
        setIsEditing(false);
        toast.success(t('relays.details.descriptionSaved'));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onUploadFile(file);
            // Reset the input to allow uploading the same file again
            e.target.value = '';
        }
    };

    return (
        <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{t('relays.details.information')}</CardTitle>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="description">{t('relays.details.description')}</TabsTrigger>
                        <TabsTrigger value="files">
                            {t('relays.details.files')}
                            {files.length > 0 && <span className="ml-1 text-xs">({files.length})</span>}
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent>
                <TabsContent value="description" className="mt-0">
                    {isEditing ? (
                        <div className="space-y-4">
                            <Textarea
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                                placeholder={t('relays.details.descriptionPlaceholder')}
                                rows={6}
                                className="resize-none"
                            />
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditedDescription(description);
                                    }}
                                >
                                    {t('common.cancel')}
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-compass text-white hover:bg-compass-dark"
                                    onClick={handleSaveDescription}
                                >
                                    {t('common.save')}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {description ? (
                                <div className="prose dark:prose-invert prose-sm max-w-none">
                                    <p>{description}</p>
                                </div>
                            ) : (
                                <p className="text-muted-foreground italic">
                                    {t('relays.details.noDescription')}
                                </p>
                            )}
                            {canEdit && (
                                <div className="mt-4 flex justify-end">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsEditing(true)}
                                        className="gap-1"
                                    >
                                        <Pencil className="h-4 w-4" />
                                        {t('common.edit')}
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="files" className="mt-0">
                    <div className="space-y-4">
                        {files.length > 0 ? (
                            <div className="rounded-md border">
                                <div className="divide-y">
                                    {files.map((file) => (
                                        <div key={file.id} className="flex items-center justify-between p-3">
                                            <div className="flex items-center gap-3">
                                                <File className="h-8 w-8 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">{file.fileName}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {formatBytes(file.fileSize)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8"
                                                    onClick={() => window.open(file.url, '_blank')}
                                                >
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                                {canEdit && (
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 text-destructive hover:text-destructive/90"
                                                        onClick={() => onDeleteFile(file.id)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="text-muted-foreground italic">{t('relays.details.noFiles')}</p>
                        )}

                        {canEdit && (
                            <div className="mt-4">
                                <label htmlFor="file-upload">
                                    <div className="flex items-center justify-center w-full h-32 px-4 transition bg-muted border-2 border-dashed rounded-md appearance-none cursor-pointer border-muted-foreground/25 hover:border-muted-foreground/50">
                                        <div className="flex flex-col items-center space-y-2">
                                            <Upload className="w-8 h-8 text-muted-foreground" />
                                            <span className="font-medium text-muted-foreground">
                                                {t('relays.details.dropFiles')}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {t('relays.details.fileTypes')}
                                            </span>
                                        </div>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileUpload}
                                        />
                                    </div>
                                </label>
                            </div>
                        )}
                    </div>
                </TabsContent>
            </CardContent>
        </Card>
    );
} 