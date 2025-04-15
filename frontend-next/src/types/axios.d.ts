
import 'axios';

declare module 'axios' {
  export interface AxiosStatic {
    isAxiosError(payload: unknown): payload is AxiosError<unknown>;
  }
}