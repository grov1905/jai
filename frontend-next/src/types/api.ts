// src/types/api.ts
export interface ApiErrorResponse {
    message: string;
    statusCode?: number;
    error?: string;
    details?: any;
  }
  
  export interface ApiSuccessResponse<T = any> {
    data: T;
    message?: string;
  }

  