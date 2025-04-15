// src/types/api.ts
export interface ApiErrorResponse {
    message: string;
    statusCode?: number;
    error?: string;
    details?: string;
  }
  
  export interface ApiSuccessResponse<T = unknown> {
    data: T;
    message?: string;
  }

  