import type { Metadata } from 'next';
import {  Roboto } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import GoogleAnalytics from '@/components/Common/GoogleAnalytics';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'JAI Experts - Innovación Tecnológica y Consultoría en Transformación Digital',
  description: 'JAI Experts te ayuda a transformar digitalmente tu empresa con soluciones innovadoras en tecnología y consultoría IT. ¡Potencia tu negocio!',
  keywords: ['transformación digital', 'innovación tecnológica', 'desarrollo web', 'software empresarial', 'consultoría IT', 'soluciones digitales'],
  authors: [{ name: 'JAI Experts' }],
  robots: 'index, follow',
  openGraph: {
    title: 'JAI Experts - Innovación en Tecnología',
    description: 'Soluciones digitales avanzadas para la transformación tecnológica de tu empresa.',
    images: [
      {
        url: 'https://www.jaiexperts.com/static/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JAI Experts - Transformación Digital',
      },
    ],
    url: 'https://www.jaiexperts.com',
    type: 'website',
    siteName: 'JAI Experts',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JAI Experts - Innovación en Tecnología',
    description: 'Soluciones digitales avanzadas para la transformación tecnológica de tu empresa.',
    images: ['https://www.jaiexperts.com/static/images/twitter-image.jpg'],
    creator: '@jaiexperts',
  },
  themeColor: '#304D80',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  metadataBase: new URL('https://www.jaiexperts.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "JAI Experts",
            "url": "https://www.jaiexperts.com",
            "logo": "https://www.jaiexperts.com/static/images/logo.png",
            "description": "Consultoría en innovación tecnológica y transformación digital.",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+51 935938821",
              "contactType": "customer service",
              "areaServed": "Worldwide",
              "availableLanguage": ["Spanish", "English"]
            }
          })}
        </script>
      </head>
      <body className={`${roboto.className} bg-light-bg flex flex-col items-center min-h-screen p-5`}>
        {/* Google Analytics Script */}
        <GoogleAnalytics />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}