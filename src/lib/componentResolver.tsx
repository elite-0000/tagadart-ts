import FeaturesSection from '@/components/sections/dynamic/Features/FeaturesSection'
import PostsSection from '@/components/sections/dynamic/Posts/PostsSection'
import ProjectsSection from '@/components/sections/dynamic/Projects/ProjectsSection'
import ServicesSection from '@/components/sections/dynamic/Services/ServiceSection'
import TeamsSection from '@/components/sections/dynamic/Teams/TeamsCardSection'
import ReferenceSection from '@/components/sections/dynamic/References/ReferenceSection'
import ContactSection from '@/components/sections/dynamic/Contact/ContactSection'
import CultureSection from '@/components/sections/dynamic/Culture/CultureSection'
import TestimonialSection from '@/components/sections/dynamic/TestimonialSection'
import PageIntroSection from '@/components/sections/dynamic/PageIntro/PageIntroSection'
import HeroSection from '@/components/sections/dynamic/Hero/HeroSection'
import CTASection from '@/components/sections/dynamic/CTA/CTA'
import PricingSection from '@/components/sections/dynamic/PricingSection/PricingSection'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { Section } from '@/components/ui/Section'

type SectionComponentProps = {
  section: any
  designType: number
}

// Map of component resolvers
const componentMap: Record<string, React.FC<SectionComponentProps>> = {
  'section.text-section': ({ section }) => (
    <Section className="m-auto max-w-5xl">
      {section.title && (
        <h2 className="text-2xl font-semibold">{section.title}</h2>
      )}
      <BasicMarkdown content={section.content} />
    </Section>
  ),
  'section.blog-section': ({ section, designType }) => (
    <PostsSection postsSection={section} designType={designType} />
  ),
  'section.projects-section': ({ section, designType }) => (
    <ProjectsSection projectsSection={section} designType={designType} />
  ),
  'section.services-section': ({ section, designType }) => (
    <ServicesSection servicesSection={section} designType={designType} />
  ),
  'section.reference-section': ({ section, designType }) => (
    <ReferenceSection referenceSection={section} designType={designType} />
  ),
  'section.cta': ({ section, designType }) => (
    <CTASection ctaSection={section} designType={designType} />
  ),
  'section.pricing-section': ({ section, designType }) => (
    <PricingSection pricingSection={section} designType={designType} />
  ),
  'section.team-section': ({ section, designType }) => (
    <TeamsSection teamsSection={section} designType={designType} />
  ),
  'section.culture-section': ({ section, designType }) => (
    <CultureSection culturesSection={section} designType={designType} />
  ),
  'section.contact-section': ({ section, designType }) => (
    <ContactSection contactSection={section} designType={designType} />
  ),
  'section.page-intro': ({ section, designType }) => (
    <PageIntroSection pageIntroSection={section} designType={designType} />
  ),
  'section.features-section': ({ section, designType }) => (
    <FeaturesSection featuresSection={section} designType={designType} />
  ),
  'section.hero-section': ({ section, designType }) => (
    <HeroSection heroSection={section} designType={designType} />
  ),
  'section.testimonials': ({ section }) => (
    <TestimonialSection testimonialSection={section} />
  ),
}

// Component Resolver Function
export const componentResolver = ({
  section,
  designType,
}: {
  section: any
  designType: number
}) => {
  const Component = componentMap[section.__component]
  if (!Component) {
    console.warn(`Unknown component type: ${section.__component}`)
    return null
  }

  return <Component section={section} designType={designType} />
}
