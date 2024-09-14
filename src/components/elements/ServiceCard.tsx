import { Service } from '@/types/service'
import Icon from '@/components/images/Icon'
import BasicMarkdown from '../ui/BasicMarkdown'
import { getTranslations } from 'next-intl/server'
import { truncateWithEllipses } from '@/lib/helper'

export const ServiceCard: React.FC<{ service: Service }> = async ({
  service,
}) => {
  const t = await getTranslations('Service')
  console.log(service.classIcon, 'service.classIcon')
  return (
    <div key={service.id} className="flex flex-col">
      <dt className="items-top flex min-h-20 gap-x-3 text-xl font-semibold leading-7 text-gray-900">
        {/* @ts-ignore */}
        <Icon size={64} name={service.classIcon as IconProps} />
        {service.pageIntro.title}
      </dt>
      <dd className="mt-4 flex flex-auto flex-col text-lg leading-4 text-gray-600">
        <BasicMarkdown>
          {truncateWithEllipses(service.pageIntro.content, 75)}
        </BasicMarkdown>
        {/* <BasicMarkdown>{service.pageIntro.content}</BasicMarkdown> */}
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
