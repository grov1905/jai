/* export interface User {
    id: number;
    username: string;
    email: string;
  }
  
  export interface AuthResponse {
    access: string;
    refresh: string;
  } */
  
  export interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
  }
 
  
  interface AuthResponse {
    access: string;
    refresh: string;
  }
  
  interface AuthError {
    message: string;
    status?: number;
    details?: any;
  }

export type ContactFormData = {
    name: string;
    email: string;
    message: string;
  };
  
  export type ApiError = {
    message: string;
    status?: number;
    details?: any;
  };