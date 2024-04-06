import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiPage } from '@pubkey-ui/core'
import { useAdminFindOnePrice } from '@tokengator/web-price-data-access'
import { PriceUiItem } from '@tokengator/web-price-ui'
import { useParams } from 'react-router-dom'
import { AdminPriceDetailSettingsTab } from './admin-price-detail-settings.tab'

export default function AdminPriceDetailFeature() {
  const { priceId } = useParams<{ priceId: string }>() as { priceId: string }
  const { item } = useAdminFindOnePrice({ priceId })
  return item ? (
    <UiPage
      title={<PriceUiItem price={item} />}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <AdminPriceDetailSettingsTab priceId={priceId} />
    </UiPage>
  ) : null
}
