
"use client";

import useAuth from '@/hooks/useAuth';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import AboutContent from '@/components/AboutContent/AboutContent';
import ServicesContent from '@/components/ServicesContent/ServicesContent';
import CallToAction from '@/components/CallToAction/CallToAction';
import Footer from '@/components/Footer/Footer';

export default function HomePage() {
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
      <Hero />
      <AboutContent />
      <ServicesContent />
      <CallToAction />
      <Footer />
    </div>
  );
}