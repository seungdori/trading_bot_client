import DarkModeToggle from '@/components/DarkModeToggle.tsx';
import { useParams } from 'react-router-dom';
import SettingsButton from '@/components/settings/SettingsButton.tsx';
import DataTablesWrapper from '@/components/table/DataTablesWrapper.tsx';

export default function App() {
  const params = useParams();

  return (
    <main>
      <h1>{`${Object.values(params)}`}</h1>
      {/*<MockTable />*/}

      <DataTablesWrapper className="w-full" />
      <DarkModeToggle />
      <SettingsButton className="w-full" />
    </main>
  );
}
