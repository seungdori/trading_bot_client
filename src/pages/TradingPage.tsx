import { useParams } from 'react-router-dom';
import DarkModeToggle from '@/components/DarkModeToggle.tsx';
import SettingsButton from '@/components/settings/SettingsButton.tsx';
import DataTablesWrapper from '@/components/table/DataTablesWrapper.tsx';
import StrategyCard from '@/components/strategy/StrategyCard.tsx';
import WalletCardWrapper from '@/components/wallet/WalletCardWrapper.tsx';

export default function TradingPage() {
  const params = useParams();

  return (
    <main className="flex flex-col w-full h-full">
      <div className="flex flex-col flex-1">
        <h1>{`${Object.values(params)}`}</h1>
        <DarkModeToggle />
        <div className="container grid grid-cols-4">
          <div className="col-span-1">
            <WalletCardWrapper />
          </div>
          <div className="col-span-2">
            <WalletCardWrapper />
          </div>
          <div className="col-span-1">
            <StrategyCard />
          </div>
        </div>
        <SettingsButton className="w-full" />
      </div>
      <DataTablesWrapper />
    </main>
  );
}
