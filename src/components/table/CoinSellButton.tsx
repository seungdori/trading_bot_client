import { Exchange } from '@/types/exchangeTypes.ts';
import { useSelectedCoinStore } from '@/store/selectedCoinStore.ts';
import { useSellCoins } from '@/hooks/useSellCoins.ts';
import { useId } from 'react';
import { BooleanParam, useQueryParam } from 'use-query-params';
import CoinSellConfirmAlertModal from '@/components/table/CoinSellConfirmAlertModal.tsx';
import { toast } from '@/components/ui/use-toast.ts';

type Props = { exchange: Exchange };

export default function CoinSellButton({ exchange }: Props) {
  const { selectedCoins } = useSelectedCoinStore();
  const coins = selectedCoins.map((coin) => ({ symbol: coin }));
  const sellCoinsMutation = useSellCoins(exchange);
  const rootModalId = `coin-sell-root-modal-${useId()}`; // random ID
  const confirmModalId = `coin-sell-confirm-modal-${useId()}`;
  const [coinSellConfirmModalOpen, setCoinSellConfirmModalOpen] = useQueryParam(confirmModalId, BooleanParam);

  const handleCoinSellConfirmModalOpen = () => {
    if (coins?.length === 0) {
      toast({
        title: '선택된 코인이 없습니다.',
      });
      return;
    }

    setCoinSellConfirmModalOpen(true);
  };

  const handleSellCoins = () => {
    sellCoinsMutation.mutate({ exchange, coins });
  };

  return (
    <>
      <CoinSellConfirmAlertModal
        rootModal
        id={rootModalId}
        buttonLabel="해당 코인 매도"
        title="해당 코인 매도"
        description={`${exchange} 거레소의 선택한 코인을 매도합니다.`}
        cancelLabel="취소"
        confirmLabel="매도"
        onConfirmAction={handleCoinSellConfirmModalOpen}
      />
      {coinSellConfirmModalOpen && (
        <CoinSellConfirmAlertModal
          id={confirmModalId}
          title="해당 코인 매도"
          description={`${exchange} 거레소의 선택한 코인을 매도합니다. 이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?`}
          cancelLabel="취소"
          confirmLabel="매도"
          onConfirmAction={handleSellCoins}
        />
      )}
    </>
  );
}
