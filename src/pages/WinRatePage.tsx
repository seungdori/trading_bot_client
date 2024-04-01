import WinRateTabs from '@/components/winRate/WinRateTabs.tsx';

export default function WinRatePage() {
  return (
    <main className="h-full w-full">
      <WinRateTabs exchange={'binance'} />
    </main>
  );
}
