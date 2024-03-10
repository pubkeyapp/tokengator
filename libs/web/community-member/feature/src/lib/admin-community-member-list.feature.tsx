import { Group } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { useAdminFindManyCommunityMember } from '@tokengator-mint/web-community-member-data-access'
import {
  AdminCommunityMemberUiCreateModal,
  AdminCommunityMemberUiTable,
  CommunityMemberUiRoleSelect,
} from '@tokengator-mint/web-community-member-ui'
import { UiPageLimit, UiSearchField } from '@tokengator-mint/web-core-ui'

export function AdminCommunityMemberListFeature({ communityId }: { communityId: string }) {
  const { deleteCommunityMember, createCommunityMember, role, setRole, items, pagination, query, setSearch } =
    useAdminFindManyCommunityMember({
      communityId,
      limit: 10,
    })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search communityMember" setSearch={setSearch} />
        <CommunityMemberUiRoleSelect placeholder="Filter by Role" value={role} setValue={setRole} />
        <UiDebugModal data={items} />
        <AdminCommunityMemberUiCreateModal create={createCommunityMember} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminCommunityMemberUiTable
          deleteCommunityMember={(communityMember) => {
            if (!window.confirm('Are you sure?')) return
            return deleteCommunityMember(communityMember.id)
          }}
          communityMembers={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No communityMembers found" />
      )}
    </UiStack>
  )
}
