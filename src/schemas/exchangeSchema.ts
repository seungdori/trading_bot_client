import { z } from 'zod';

export const ExchangeSchema = z.union([z.literal('binance'), z.literal('bithumb'), z.literal('upbit')]);

export const EnterStrategySchema = z.union([z.literal('long'), z.literal('short'), z.literal('long-short')]);

export const CustomStrategySchema = z.union([z.literal('전략1'), z.literal('전략2'), z.literal('전략3')]);
