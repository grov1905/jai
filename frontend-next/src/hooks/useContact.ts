// src/hooks/useContact.ts
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ApiErrorResponse } from '@/types/api';
import {ContactFormData, ApiError} from '@/types'



export const useContact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const sendContactForm = async (data: ContactFormData) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/public/contact/contactform/`, data);
      setIsSuccess(true);
      return true;
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      const errorData: ApiError = {
        message: axiosError.response?.data?.message || 'Error al enviar el formulario',
        status: axiosError.response?.status,
        details: axiosError.response?.data
      };
      setError(errorData);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendContactForm, isLoading, error, isSuccess };
};