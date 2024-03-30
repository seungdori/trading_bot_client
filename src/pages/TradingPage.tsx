import DataTablesWrapper from '@/components/assetsTable/DataTablesWrapper.tsx';
import CustomStrategyWrapper from '@/components/strategy/CustomStrategyWrapper.tsx';
import WalletCardWrapper from '@/components/wallet/WalletCardWrapper.tsx';
import StrategyPanel from '@/components/strategy/StrategyPanel.tsx';
import ExchangePanel from '@/components/strategy/ExchangePanel.tsx';

export default function TradingPage() {
  return (
    <main className="flex flex-col w-full h-full space-y-2">
      <section className="grid grid-cols-12 space-x-2">
        <section className="col-span-3">
          <WalletCardWrapper className="h-full" />
        </section>
        <section className="col-span-6">
          <StrategyPanel className="h-full" />
        </section>
        <section className="col-span-3">
          <CustomStrategyWrapper className="w-full h-full" />
        </section>
      </section>

      <section className="max-h-[45vh] grid grid-cols-12 flex-1 space-x-2">
        <section className="h-full col-span-9">
          <DataTablesWrapper className="flex flex-col w-full h-full" />
        </section>
        <section className="col-span-3">
          <ExchangePanel className="h-full" />
        </section>
      </section>
    </main>
  );
}
