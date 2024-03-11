import * as typia from 'typia';
import { AssetsData } from '@/types/tableTypes.ts';
export function generateRandomAssetsTableRow(): AssetsData {
    console.log(`[generateRandomAssetsTableRow]`);
    const random = ((generator?: Partial<typia.IRandomGenerator>): typia.Resolved<AssetsData> => {
        return "any type used...";
    })();
    console.log(`[generateRandomAssetsTableRow] random`, random);
    return random;
}
type RandomString = string & typia.tags.MinLength<5000> & typia.tags.MaxLength<10000>;
export function getnerateRandomTransactionLog() {
    const randomLog = ((generator?: Partial<typia.IRandomGenerator>): typia.Resolved<RandomString> => {
        const $generator = (typia.random as any).generator;
        return (generator?.customs ?? $generator.customs)?.string?.([
            {
                name: "MinLength<5000>",
                kind: "minLength",
                value: 5000
            },
            {
                name: "MaxLength<10000>",
                kind: "maxLength",
                value: 10000
            }
        ]) ?? (generator?.string ?? $generator.string)((generator?.integer ?? $generator.integer)(5000, 10000));
    })();
    console.log(`[getnerateRandomTransactionLog] random`, randomLog);
    return randomLog;
}
