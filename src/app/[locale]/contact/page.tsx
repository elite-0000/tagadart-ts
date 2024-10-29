import { type Metadata } from 'next'
import Link from 'next/link'
import { useId } from 'react'

import { Border } from '@/components/ui/Border'
import { Button } from '@/components/elements/Button'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { OfficesSection } from '@/components/sections/Offices'

import { SocialMedia } from '@/components/sections/SocialMedia'

import { PageIntroSections } from '@/components/sections/PageIntro'

import { getTranslations } from 'next-intl/server'
import { fetchContactPage } from '@/request/fetch'
import { ContactForm } from '@/components/form/ContactForm'

async function ContactDetails(offices: any) {
  const t = await getTranslations('Contact')

  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        {t('offices')}
      </h2>
      {/* <p className="mt-6 text-base text-neutral-600">
        Prefer doing things in person? We don’t but we have to list our
        addresses here for legal reasons.
      </p> */}

      <OfficesSection
        offices={offices.offices}
        className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2"
      />

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          {t('email_us')}
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            ['Support', 'support@tagadart.ch'],
            ['John', 'john@tagadart.ch'],
            ['Aurélien', 'aurelien@tagadart.ch'],
          ].map(([label, email]) => (
            <div key={email}>
              <dt className="font-semibold text-neutral-950">{label}</dt>
              <dd>
                <Link
                  href={`mailto:${email}`}
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  {email}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Follow us
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  )
}

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Let’s work together. We can’t wait to hear from you.',
}

export default async function Contact() {
  let contactData

  try {
    contactData = await fetchContactPage()
  } catch (error) {
    console.error('Failed to load data:', error)
    return <div>Failed to load data</div>
  }

  const { pageIntro, offices } = contactData || ''

  return (
    <>
      <PageIntroSections {...pageIntro} />
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails offices={offices} />
        </div>
      </Container>
    </>
  )
}
