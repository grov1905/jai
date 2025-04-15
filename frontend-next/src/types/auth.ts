export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar_url: string | null;
    biografia: string | null;
    estado: string;
    is_staff: boolean;
    is_superuser: boolean;
    last_login: string;
    date_joined: string;
    phone: string | null;
    company: string | null;
  }
  
  export interface AuthResponse {
    access: string;
    refresh: string;
  }
  
 export interface AuthError {
    message: string;
    status?: number;
    details?: any;
  }
