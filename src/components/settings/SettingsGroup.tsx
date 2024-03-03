import DarkModeToggle from '@/components/settings/DarkModeToggle.tsx';
import SettingsButton from '@/components/settings/SettingsButton.tsx';

type Props = { className?: string };

export default function SettingsGroup({ className }: Props) {
  return (
    <div className={className}>
      <DarkModeToggle />
      <SettingsButton />
    </div>
  );
}
