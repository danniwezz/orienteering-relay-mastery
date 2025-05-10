import { useAppContext } from '@/contexts/AppContext';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

const UserSelector = () => {
    const {
        currentUser,
        setCurrentUser,
        adminUser,
        clubAdminUser,
        runnerUser,
        testRunnerUser
    } = useAppContext();
    const { t } = useTranslation();

    const handleUserChange = (userId: string) => {
        switch (userId) {
            case adminUser.id:
                setCurrentUser(adminUser);
                break;
            case clubAdminUser.id:
                setCurrentUser(clubAdminUser);
                break;
            case runnerUser.id:
                setCurrentUser(runnerUser);
                break;
            case testRunnerUser.id:
                setCurrentUser(testRunnerUser);
                break;
            default:
                setCurrentUser(adminUser);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{t('common.testAs')}:</span>
            <Select
                value={currentUser?.id}
                onValueChange={handleUserChange}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t('common.selectUser')} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={adminUser.id}>
                        {adminUser.username} ({t('common.roles.admin')})
                    </SelectItem>
                    <SelectItem value={clubAdminUser.id}>
                        {clubAdminUser.username} ({t('common.roles.clubAdmin')})
                    </SelectItem>
                    <SelectItem value={runnerUser.id}>
                        {runnerUser.username} ({t('common.roles.runner')})
                    </SelectItem>
                    <SelectItem value={testRunnerUser.id}>
                        {testRunnerUser.username} ({t('common.roles.testRunner')})
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default UserSelector; 