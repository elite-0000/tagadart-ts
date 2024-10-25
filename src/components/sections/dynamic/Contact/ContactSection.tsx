import React from 'react'

import { ButtonProps, PageIntro } from '@/types/global'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import { Button } from '@/components/elements/Button'
import { getTranslations } from 'next-intl/server'

interface ContactProps {
  contactSection: { sectionIntro: PageIntro } & { Buttons: ButtonProps[] }
  designType: Number
}

const renderContent = async (Buttons: ButtonProps[], designType?: Number) => {
  const t = await getTranslations('Contact')
  switch (designType) {
    case 1:
      return (
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn className="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
            <div className="mx-auto max-w-4xl">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
                  {t('title')}
                </h2>
                <div className="mt-6 flex">
                  {/* <Button href="/contact" invert>
                    {t('button_contact')}
                  </Button> */}
                  {Buttons.map((button: ButtonProps) => (
                    <Button key={button.id} href={button.link} invert>
                      {button.text}
                    </Button>
                  ))}
                </div>
                {/* <div className="mt-10 border-t border-white/10 pt-10">
                  <h3 className="font-display text-base font-semibold text-white">
                    Our offices
                  </h3>
                  <OfficesSection
                    invert
                    className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
                  />
                </div> */}
              </div>
            </div>
          </FadeIn>
        </Container>
      )

    default:
      return (
        <Container className="mt-16">
          <FadeIn>
            {/* {services.map((service: Service) => (
              <ServiceCard1 key={service.id} service={service} />
            ))} */}
          </FadeIn>
        </Container>
      )
  }
}

const ContactSection: React.FC<ContactProps> = async ({
  contactSection,
  designType,
}) => {
  try {
    // contacts = await fetchContactPage()
  } catch (error) {
    console.error('Failed to load services:', error)
  }

  return (
    <>
      <SectionIntro {...contactSection.sectionIntro} />
      {renderContent(
        contactSection.Buttons.length > 0 ? contactSection.Buttons : [],
        designType,
      )}
    </>
  )
}

export default ContactSection
