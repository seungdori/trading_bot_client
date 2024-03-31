import { useFetchSymbolsAccess } from '@/hooks/useFetchSymbolsAccess.ts';
import { useForm } from 'react-hook-form';
import { SymbolAccessList } from '@/types/backendTypes.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { SymbolAccessListSchema } from '@/schemas/backendSchema.ts';
import { toast } from '@/components/ui/use-toast.ts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { useId } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { cn } from '@/lib/utils.ts';
import { useDeleteSymbolsAccess } from '@/hooks/useDeleteSymbolsAccess.ts';
import AddForm from '@/components/symbols/AddForm.tsx';

type Props = {
  dialogButtonLabel: string;
  accessType: 'whitelist' | 'blacklist';
};

export default function AccessListDialog({ dialogButtonLabel, accessType }: Props) {
  const selectAllId = useId();
  const accessTypeLabel = buildLabel(accessType);

  const accessListQuery = useFetchSymbolsAccess({ type: accessType });
  const deleteMutation = useDeleteSymbolsAccess({ type: accessType });

  const form = useForm<SymbolAccessList>({
    resolver: zodResolver(SymbolAccessListSchema),
    defaultValues: {
      type: accessType,
      symbols: [],
    },
  });

  const onSubmit = async (formData: SymbolAccessList) => {
    if (formData.symbols.length === 0) {
      toast({
        title: '선택된 항목이 없습니다.',
      });
      return;
    }

    deleteMutation.mutate(formData);
    await accessListQuery.refetch();
    form.resetField('symbols');
  };

  const sortedSymbols = sortSymbolsByName(accessListQuery.data?.symbols ?? []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{dialogButtonLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogButtonLabel} 추가 / 제거</DialogTitle>
          <DialogDescription>현재 설정된 {dialogButtonLabel}를 수정합니다.</DialogDescription>
        </DialogHeader>
        {accessListQuery.isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormLabel>{accessTypeLabel} 제거</FormLabel>
                <ScrollArea className={cn('rounded-md border h-72 p-2')}>
                  <FormField
                    control={form.control}
                    name="symbols"
                    render={() => (
                      <FormItem>
                        {/*전체 선택 항목*/}
                        <FormField
                          key={selectAllId}
                          control={form.control}
                          name="symbols"
                          render={({ field }) => {
                            return (
                              <FormItem key={selectAllId} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange(sortedSymbols);
                                      } else {
                                        field.onChange([]);
                                      }
                                      return checked;
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">전체 선택</FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                        {/*심볼 목록*/}
                        <div className="grid grid-cols-2 gap-1">
                          {sortedSymbols.map((symbol) => (
                            <FormField
                              key={symbol}
                              control={form.control}
                              name="symbols"
                              render={({ field }) => {
                                return (
                                  <FormItem key={symbol} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(symbol)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, symbol])
                                            : field.onChange(field.value?.filter((value) => value !== symbol));
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{symbol}</FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </ScrollArea>
                <Button type="submit" className="w-full" variant="destructive">
                  선택한 {accessTypeLabel} 제거
                </Button>
              </form>
            </Form>
          </div>
        )}

        <DialogFooter>
          <div className="w-full">
            <AddForm accessType={accessType} accessTypeLabel={accessTypeLabel} />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function sortSymbolsByName(symbols: string[]) {
  return symbols.sort((a, b) => a.localeCompare(b));
}

function buildLabel(accessType: 'whitelist' | 'blacklist') {
  return accessType === 'whitelist' ? '화이트리스트' : '블랙리스트';
}
