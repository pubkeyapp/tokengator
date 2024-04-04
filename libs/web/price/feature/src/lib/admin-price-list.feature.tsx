import { Button, Group } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { useAdminFindManyPrice } from '@tokengator-mint/web-price-data-access'
import { AdminPriceUiTable } from '@tokengator-mint/web-price-ui'
import { Link } from 'react-router-dom'

export default function AdminPriceListFeature({ presetId }: { presetId: string }) {
  const { deletePrice, items, query } = useAdminFindManyPrice({
    presetId,
  })

  return (
    <UiStack>
      <Group justify="flex-end">
        <UiDebugModal data={items} />
        <Button component={Link} to="create">
          Create
        </Button>
      </Group>
      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminPriceUiTable
          deletePrice={(price) => {
            if (!window.confirm('Are you sure?')) return
            return deletePrice(price.id)
          }}
          prices={items}
        />
      ) : (
        <UiInfo message="No prices found" />
      )}
    </UiStack>
  )
}
