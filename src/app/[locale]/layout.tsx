import { type Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'

import '@/styles/tailwind.css'

import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { RootLayout } from '@/components/ui/RootLayout'
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    template: '%s - Tagadart',
    default: 'Tagadart - Agence Digitale Eco Responsable Lausanne',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} className="h-full bg-neutral-950 text-base antialiased">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16700186470"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16700186470');
        `}
        </Script>
      </head>
      <body className="flex min-h-full flex-col">
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <NextIntlClientProvider messages={messages}>
          <RootLayout>{children}</RootLayout>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
