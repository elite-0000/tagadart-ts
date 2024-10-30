import FeaturesSection from '@/components/sections/dynamic/Features/FeaturesSection'
import PostsSection from '@/components/sections/dynamic/Posts/PostsSection'
import ProjectsSection from '@/components/sections/dynamic/Projects/ProjectsSection'
import ServicesSection from '@/components/sections/dynamic/Services/ServiceSection'
import TeamsSection from '@/components/sections/dynamic/Teams/TeamsCardSection'
import ReferenceSection from '@/components/sections/dynamic/References/ReferenceSection'
import ContactSection from '@/components/sections/dynamic/Contact/ContactSection'
import CultureSection from '@/components/sections/dynamic/Culture/CultureSection'
import TestimonialSection from '@/components/sections/dynamic/TestimonialSection'
import PageIntroSection from '@/components/sections/dynamic/PageIntro/ContactSection'
import HeroSection from '@/components/sections/dynamic/Hero/HeroSection'
import CTASection from '@/components/sections/dynamic/CTA/CTA'
import PricingSection from '@/components/sections/dynamic/PricingSection/PricingSection'

export const componentResolver = (section: any) => {
  switch (section.__component) {
    case 'section.blog-section':
      return (
        <PostsSection key={section.id} postsSection={section} designType={1} />
      )
    case 'section.projects-section':
      return (
        <ProjectsSection
          key={section.id}
          projectsSection={section}
          designType={2}
        />
      )

    case 'section.services-section':
      return (
        <ServicesSection
          key={section.id}
          servicesSection={section}
          designType={2}
        />
      )
    case 'section.reference-section':
      return (
        <ReferenceSection
          key={section.id}
          referenceSection={section}
          designType={2}
        />
      )
    case 'section.cta':
      return (
        <CTASection key={section.id} ctaSection={section} designType={10} />
      )
    case 'section.pricing-section':
      return (
        <PricingSection
          key={section.id}
          pricingSection={section}
          designType={10}
        />
      )
    case 'section.team-section':
      return (
        <TeamsSection key={section.id} teamsSection={section} designType={2} />
      )
    case 'section.culture-section':
      return (
        <CultureSection
          key={section.id}
          culturesSection={section}
          designType={2}
        />
      )
    case 'section.contact-section':
      return (
        <ContactSection
          key={section.id}
          contactSection={section}
          designType={2}
        />
      )
    case 'section.cta':
      return (
        <ContactSection
          key={section.id}
          contactSection={section}
          designType={2}
        />
      )
    case 'section.page-intro':
      return (
        <PageIntroSection
          key={section.id}
          pageIntroSection={section}
          designType={2}
        />
      )

    case 'section.features-section':
      return (
        <FeaturesSection
          key={section.id}
          featuresSection={section}
          designType={10}
        />
      )
    case 'section.hero-section':
      return (
        <HeroSection key={section.id} heroSection={section} designType={10} />
      )

    case 'section.testimonials':
      return <TestimonialSection key={section.id} avatar={section.avatar} />

    default:
      return null
  }
}
