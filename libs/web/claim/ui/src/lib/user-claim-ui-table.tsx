import { ActionIcon, Anchor, Group, ScrollArea } from '@mantine/core'
import { UiDebugModal } from '@pubkey-ui/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { Claim, ellipsify } from '@tokengator/sdk'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'

export function UserClaimUiTable({
  deleteClaim,
  claims = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deleteClaim: (claim: Claim) => void
  claims: Claim[]
  page: DataTableProps['page']
  totalRecords: DataTableProps['totalRecords']
  recordsPerPage: DataTableProps['recordsPerPage']
  onPageChange: (page: number) => void
}) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        onPageChange={onPageChange}
        page={page ?? 1}
        recordsPerPage={recordsPerPage ?? 10}
        totalRecords={totalRecords ?? 1}
        columns={[
          {
            accessor: 'name',
            render: (item) => (
              <Anchor component={Link} to={`./${item.id}`} size="sm" fw={500}>
                {ellipsify(item.providerId, 10)}
              </Anchor>
            ),
          },
          { accessor: 'provider' },
          { accessor: 'amount' },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <UiDebugModal data={item} />
                <ActionIcon color="brand" variant="light" size="sm" component={Link} to={`./${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteClaim(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={claims}
      />
    </ScrollArea>
  )
}
