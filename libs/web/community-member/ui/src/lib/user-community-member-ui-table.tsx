import { ActionIcon, Group, ScrollArea } from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { CommunityMember } from '@tokengator-mint/sdk'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { CommunityMemberUiItem } from './community-member-ui-item'

export function UserCommunityMemberUiTable({
  deleteCommunityMember,
  communityMembers = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deleteCommunityMember: (communityMember: CommunityMember) => void
  communityMembers: CommunityMember[]
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
            accessor: 'user',
            render: (item) => <CommunityMemberUiItem to={item.id} communityMember={item} />,
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon color="brand" variant="light" size="sm" component={Link} to={`./${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteCommunityMember(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={communityMembers}
      />
    </ScrollArea>
  )
}
