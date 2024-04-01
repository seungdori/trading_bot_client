import { useMutation } from '@tanstack/react-query';
import { createChartImage } from '@/components/api/desktopClient.ts';
import { Exchange } from '@/types/exchangeTypes.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { CustomStrategy, EnterStrategy, SellCoin } from '@/types/backendTypes.ts';

export const useCreateChartImage = ({
  exchange,
  enterStrategy,
  customStrategy,
}: {
  exchange: Exchange;
  enterStrategy: EnterStrategy;
  customStrategy: CustomStrategy;
}) => {
  return useMutation({
    mutationKey: ['createChartImage', exchange, enterStrategy, customStrategy],
    mutationFn: async ({ coin }: { coin: SellCoin }) =>
      createChartImage({ exchange, enterStrategy, customStrategy, coin }),
    onSuccess: (fileUrl) => {
      console.log(`[LOCAL FILE PATH]`, fileUrl);
    },
    onError: (error) => {
      console.error(error);
      toast({ title: error.name, description: error.message });
      throw error;
    },
  });
};
