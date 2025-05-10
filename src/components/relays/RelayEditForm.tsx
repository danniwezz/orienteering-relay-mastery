import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Relay } from '@/types';

interface RelayEditFormProps {
    relay: Relay;
    onSave: (updatedRelay: Relay) => void;
}

export function RelayEditForm({ relay, onSave }: RelayEditFormProps) {
    const { t } = useTranslation();

    const form = useForm({
        defaultValues: {
            name: relay.name || '',
            location: relay.location || '',
            date: relay.date || '',
            description: relay.description || '',
        }
    });

    useEffect(() => {
        form.reset({
            name: relay.name,
            location: relay.location,
            date: relay.date,
            description: relay.description || '',
        });
    }, [relay, form]);

    const handleSubmit = (data) => {
        const updatedRelay = {
            ...relay,
            name: data.name,
            location: data.location,
            date: data.date,
            description: data.description,
        };

        onSave(updatedRelay);
        toast.success(t('relays.editSuccess'));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
    );
} 