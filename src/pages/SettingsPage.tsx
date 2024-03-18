import ApiKeysSettings from '@/components/settings/ApiKeysSettings.tsx';
import TelegramTokenSettings from '@/components/settings/TelegramTokenSettings.tsx';
import TelegramIdSettings from '@/components/settings/TelegramIdSettings.tsx';
import SystemSettings from '@/components/settings/SystemSettings.tsx';

export default function SettingsPage() {
  return (
    <main className="h-full w-full grid grid-cols-2 gap-4">
      <ApiKeysSettings />
      <TelegramIdSettings />
      <TelegramTokenSettings />
      <SystemSettings />
    </main>
  );
}
