import { ResponseDto } from '@/types/backendTypes.ts';

export function buildBackendErrorMessage(responseDto: ResponseDto<unknown>): string {
  const meta = responseDto.meta ?? {};
  const rawMessage = JSON.stringify(meta, null, 2);
  return `${responseDto.message}. ${rawMessage}`;
}
