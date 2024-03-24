import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { BooleanParam, useQueryParam } from 'use-query-params';

type Props = {
  id: string;
  rootModal?: boolean;
  buttonLabel?: string;
  disabled?: boolean;
  title: string;
  description: string;
  cancelLabel: string;
  confirmLabel: string;
  onConfirmAction: () => void;
  children?: ReactNode;
};

export default function CoinSellConfirmAlertModal({
  id,
  disabled,
  rootModal,
  buttonLabel,
  title,
  description,
  cancelLabel,
  confirmLabel,
  onConfirmAction,
}: Props) {
  const [_, setOpen] = useQueryParam(id, BooleanParam);

  const handleConfirm = () => {
    onConfirmAction();
  };

  return (
    <>
      {/*Insure clean url query param when modal closed*/}
      <AlertDialog defaultOpen={!rootModal} onOpenChange={(open) => setOpen(open)}>
        {rootModal ? (
          <AlertDialogTrigger asChild>
            <Button disabled={disabled}>{buttonLabel}</Button>
          </AlertDialogTrigger>
        ) : null}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>{confirmLabel}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
