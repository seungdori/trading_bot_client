import * as typia from 'typia';
import { IAssetsTable } from '@/types/tableTypes.ts';

export function generateRandomAssetsTableRow() {
  return typia.random<IAssetsTable>();
}
