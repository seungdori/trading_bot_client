import { Exchange } from '@/types/exchangeTypes.ts';
import { useSellAllCoins } from '@/hooks/useSellAllCoins.ts';
import { useId } from 'react';
import { BooleanParam, useQueryParam } from 'use-query-params';
import CoinSellConfirmAlertModal from '@/components/table/CoinSellConfirmAlertModal.tsx';

type Props = { exchange: Exchange };

export default function AllCoinSellButton({ exchange }: Props) {
  const sellAllCoinsMutation = useSellAllCoins(exchange);
  const rootModalId = `all-coin-sell-root-modal-${useId()}`;
  const confirmModalId = `all-coin-sell-confirm-modal-${useId()}`;
  const finalConfirmModalId = `all-coin-sell-final-confirm-modal-${useId()}`;
  const [allCoinSellConfirmModalOpen, setAllCoinSellConfirmModalOpen] = useQueryParam(confirmModalId, BooleanParam);
  const [allCoinSellFinalConfirmModalOpen, setAllCoinSellFinalConfirmModalOpen] = useQueryParam(
    finalConfirmModalId,
    BooleanParam,
  );

  const handleAllCoinSellConfirmModalOpen = () => {
    setAllCoinSellConfirmModalOpen(true);
  };

  const handleAllCoinSellFinalConfirmModalOpen = () => {
    setAllCoinSellFinalConfirmModalOpen(true);
  };

  const handleSellAllCoins = () => {
    sellAllCoinsMutation.mutate();
  };

  return (
    <>
      <CoinSellConfirmAlertModal
        rootModal
        id={rootModalId}
        buttonLabel="전체 매도"
        title="전체 매도"
        description={`${exchange} 거레소의 모든 코인을 매도합니다.`}
        cancelLabel="취소"
        confirmLabel="매도"
        onConfirmAction={handleAllCoinSellConfirmModalOpen}
      />
      {allCoinSellConfirmModalOpen && (
        <CoinSellConfirmAlertModal
          id={confirmModalId}
          title="전체 매도"
          description={`${exchange} 거레소의 모든 코인을 매도합니다. 이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?`}
          cancelLabel="취소"
          confirmLabel="매도"
          onConfirmAction={handleAllCoinSellFinalConfirmModalOpen}
        />
      )}
      {allCoinSellFinalConfirmModalOpen && (
        <CoinSellConfirmAlertModal
          id={finalConfirmModalId}
          title="전체 매도"
          description={`마지막 확인입니다. 확인 버튼을 누르면 ${exchange} 거레소의 모든 코인을 매도합니다. 이 작업은 되돌릴 수 없습니다.`}
          cancelLabel="취소"
          confirmLabel="매도"
          onConfirmAction={handleSellAllCoins}
        />
      )}
    </>
  );
}
