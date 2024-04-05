import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { z } from 'zod';
import { EnterSymbolSchema } from '@/schemas/exchangeSchema.ts';
import { useForm } from 'react-hook-form';
import { useStrategyStore } from '@/hooks/useStrategyStore.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { cn } from '@/lib/utils.ts';
import { Exchange } from '@/types/exchangeTypes.ts';

const FormSchema = EnterSymbolSchema;

type Props = { className?: string };

export default function EnterSymbol({ className }: Props) {
  const { exchange, store, setStore } = useStrategyStore();
  const { enterSymbolCount, enterSymbolAmount } = store;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      enterSymbolCount,
      enterSymbolAmount,
    },
  });

  const handleEtnerSymbolCount = (changed: typeof enterSymbolCount) => {
    setStore({ enterSymbolCount: changed });
  };
  const handleEnterSymbolAmount = (changed: typeof enterSymbolAmount) => {
    setStore({ enterSymbolAmount: changed });
  };

  return (
    <div className={cn('container', className)}>
      <Form {...form}>
        <form className="w-full space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="enterSymbolCount"
              render={({ field }) => (
                <FormItem className="space-y-3 w-full">
                  <FormLabel>진입 종목 개수</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        id="enterSymbolCount"
                        type="number"
                        placeholder="진입 종목 개수"
                        autoCapitalize="none"
                        autoCorrect="off"
                        value={enterSymbolCount.toString()}
                        onChange={(e) => {
                          const enterSymbolCount = +e.target.value;
                          handleEtnerSymbolCount(enterSymbolCount);
                          field.onChange(enterSymbolCount);
                        }}
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enterSymbolAmount"
              render={({ field }) => (
                <FormItem className="space-y-3 w-full">
                  <FormControl>
                    <>
                      <Label htmlFor="enterSymbolAmount">{buildEnterSymbolLabel(exchange)}</Label>
                      <Input
                        id="enterSymbolAmount"
                        type="number"
                        placeholder="주문당 투입금"
                        autoCapitalize="none"
                        autoCorrect="off"
                        value={enterSymbolAmount.toString()}
                        onChange={(e) => {
                          const enterSymbolAmount = +e.target.value;
                          handleEnterSymbolAmount(enterSymbolAmount);
                          field.onChange(enterSymbolAmount);
                        }}
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

function buildEnterSymbolLabel(exchange: Exchange): string {
  switch (exchange) {
    case 'binance':
    case 'okx':
      return '주문당 투입금 $';

    case 'bithumb':
    case 'upbit':
      return '주문당 투입금 ₩';

    default:
      return '주문당 투입금 ₩';
  }
}
