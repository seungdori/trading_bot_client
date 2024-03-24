import { ReactNode } from 'react';
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
import { Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';

type Props = {
  action: () => void;
  children?: ReactNode;
};

export default function LogClearDialog({ action }: Props) {
  const onSubmit = () => action();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>거래 기록을 제거합니다.</AlertDialogTitle>
          <AlertDialogDescription>
            현재 기록된 거래 기록을 제거합니다. <br />
            파일로 저장된 실제 거래 데이터는 삭제되지 않습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onSubmit}>거래 기록 제거</AlertDialogAction>
          <AlertDialogCancel>닫기</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
