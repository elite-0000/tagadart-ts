import { type Metadata } from 'next'

import '@/styles/tailwind.css'

import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { RootLayout } from '@/components/ui/RootLayout'

export const metadata: Metadata = {
  title: {
    template: '%s - Tagadart',
    default: 'Tagadart - Agence Digitale Eco Responsable Lausanne',
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
      <body className="flex min-h-full flex-col">
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <NextIntlClientProvider messages={messages}>
          <RootLayout>{children}</RootLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
