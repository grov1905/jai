//frontend-next/src/app/layout.tsx

import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import '@/app/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Script from 'next/script';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  themeColor: '#304D80',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'JAI Experts - Innovación Tecnológica y Consultoría en Transformación Digital',
    template: '%s | JAI Experts'
  },
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
  metadataBase: new URL('https://www.jaiexperts.com'),
  alternates: {
    canonical: '/',
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#304D80" />
        
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
              "telephone": "+51 977205812",
              "contactType": "customer service",
              "areaServed": "Worldwide",
              "availableLanguage": ["Spanish", "English"]
            }
          })}
        </script>
      </head>
      <body className={`${roboto.className} bg-light-bg flex flex-col items-center min-h-screen p-5`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        {/* Google Analytics - Implementación recomendada por Next.js */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-G6ZFT7T80X" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G6ZFT7T80X');
          `}
        </Script>
      </body>
    </html>
  );
}