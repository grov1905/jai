
"use client";

import useAuth from '@/hooks/useAuth';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { ContactForm } from '@/components/ContactForm/ContacForm';

export default function ContactPage() {
  const {  isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-light-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary border-opacity-60"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center min-h-screen p-5 bg-light-bg">
      <Header />
      <ContactForm />
      <Footer />
    </div>
  );
}