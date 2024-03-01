import * as typia from 'typia';
import { AssetsData } from '@/types/tableTypes.ts';
export function generateRandomAssetsTableRow(): AssetsData {
    console.log(`[generateRandomAssetsTableRow]`);
    const random = ((generator?: Partial<typia.IRandomGenerator>): typia.Resolved<AssetsData> => {
        const $generator = (typia.random as any).generator;
        const $ro0 = (_recursive: boolean = false, _depth: number = 0): any => ({
            coinName: (generator?.customs ?? $generator.customs)?.string?.([]) ?? (generator?.string ?? $generator.string)(),
            initPrice: (generator?.customs ?? $generator.customs)?.number?.([]) ?? (generator?.number ?? $generator.number)(0, 100),
            currentPrice: (generator?.customs ?? $generator.customs)?.number?.([]) ?? (generator?.number ?? $generator.number)(0, 100),
            amount: (generator?.customs ?? $generator.customs)?.number?.([]) ?? (generator?.number ?? $generator.number)(0, 100),
            rateOfReturn: (generator?.customs ?? $generator.customs)?.number?.([]) ?? (generator?.number ?? $generator.number)(0, 100),
            sellPrice: (generator?.customs ?? $generator.customs)?.number?.([]) ?? (generator?.number ?? $generator.number)(0, 100),
            tp1: (generator?.customs ?? $generator.customs)?.number?.([]) ?? (generator?.number ?? $generator.number)(0, 100),
            tp2: (generator?.customs ?? $generator.customs)?.number?.([]) ?? (generator?.number ?? $generator.number)(0, 100),
            tp3: (generator?.customs ?? $generator.customs)?.number?.([]) ?? (generator?.number ?? $generator.number)(0, 100),
            value: (generator?.customs ?? $generator.customs)?.number?.([]) ?? (generator?.number ?? $generator.number)(0, 100)
        });
        return $ro0();
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
