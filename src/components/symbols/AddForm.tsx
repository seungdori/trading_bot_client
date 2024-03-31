import { useAddSymbolsAccess } from '@/hooks/useAddSymbolsAccess.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import { useFetchSymbolsAccess } from '@/hooks/useFetchSymbolsAccess.ts';
import { z } from 'zod';

type Props = {
  accessType: 'whitelist' | 'blacklist';
  accessTypeLabel: string;
};

const FormInputSchema = z.object({
  symbol: z
    .string({
      required_error: '종목을 입력해주세요.',
      invalid_type_error: '종목은 문자열이어야 합니다.',
    })
    .min(1, { message: '종목은 최소 1글자 이상이어야 합니다.' }),
});

type FormInput = z.infer<typeof FormInputSchema>;

export default function AddForm({ accessType, accessTypeLabel }: Props) {
  const accessListQuery = useFetchSymbolsAccess({ type: accessType });
  const addMutation = useAddSymbolsAccess({ type: accessType });
  const form = useForm<FormInput>({
    resolver: zodResolver(FormInputSchema),
    defaultValues: {
      symbol: '',
    },
  });

  const onSubmit = async (input: FormInput) => {
    addMutation.mutate({ type: accessType, symbols: [input.symbol] });
    await accessListQuery.refetch();
    form.resetField('symbol');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <FormLabel>{accessTypeLabel} 추가</FormLabel>
          <FormDescription className="text-xs">1개의 종목을 입력해주세요.</FormDescription>
        </div>
        <div>
          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input placeholder="종목 입력" {...field} autoCapitalize="none" autoCorrect="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <Button type="submit" className="w-full">
          {accessTypeLabel} 추가
        </Button>
      </form>
    </Form>
  );
}
