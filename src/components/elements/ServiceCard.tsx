import { Service } from '@/types/service'
import Icon from '@/components/images/Icon'
import BasicMarkdown from '../ui/BasicMarkdown'
import { getTranslations } from 'next-intl/server'

export const ServiceCard: React.FC<{ service: Service }> = async ({
  service,
}) => {
  const t = await getTranslations('Service')
  return (
    <div key={service.id} className="flex flex-col">
      <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
        <Icon name="brain-circuit" />
        {service.pageIntro.title}
      </dt>
      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
        <BasicMarkdown>{service.pageIntro.content}</BasicMarkdown>
        <p className="mt-6">
          <a
            href={`/services/${service.id}`}
            className="text-sm font-semibold leading-6 text-indigo-600"
          >
            {t('view_more')} <span aria-hidden="true">→</span>
          </a>
        </p>
      </dd>
    </div>
  )
}
