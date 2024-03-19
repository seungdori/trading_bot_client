import DataTablesWrapper from '@/components/assetsTable/DataTablesWrapper.tsx';
import CustomStrategyWrapper from '@/components/strategy/CustomStrategyWrapper.tsx';
import WalletCardWrapper from '@/components/wallet/WalletCardWrapper.tsx';
import StrategyPanel from '@/components/strategy/StrategyPanel.tsx';
import ExchangePanel from '@/components/strategy/ExchangePanel.tsx';

export default function TradingPage() {
  return (
    <main className="md:grid md:grid-cols-12 sm:flex sm:flex-col sm:space-y-4 w-full h-full gap-2">
      <section className="col-span-3">
        <WalletCardWrapper className="h-full" />
      </section>
      <section className="col-span-6">
        <StrategyPanel className="h-full" />
      </section>
      <section className="col-span-3">
        <CustomStrategyWrapper className="h-full" />
      </section>
      <section className="col-span-9">
        <DataTablesWrapper className="h-full" />
      </section>
      <section className="col-span-3">
        <ExchangePanel className="h-full" />
      </section>
    </main>
  );
}
