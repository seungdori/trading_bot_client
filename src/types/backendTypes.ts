type ResponseDtoSuccess<T> = {
  success: true;
  message: string;
  meta: Record<string, unknown>;
  data: T;
};

type ResponseDtoFailure = {
  success: false;
  message: string;
  meta: Record<string, unknown>;
  data?: unknown;
};

export type ResponseDto<T> = ResponseDtoSuccess<T> | ResponseDtoFailure;
