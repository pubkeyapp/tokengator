import { Group } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { useUserFindManyCommunityMember } from '@tokengator/web-community-member-data-access'
import {
  CommunityMemberUiRoleSelect,
  UserCommunityMemberCreateModal,
  UserCommunityMemberUiTable,
} from '@tokengator/web-community-member-ui'
import { UiSearchField } from '@tokengator/web-core-ui'

export function UserCommunityMemberListFeature({ communityId }: { communityId: string }) {
  const { createCommunityMember, deleteCommunityMember, items, pagination, query, role, setRole, setSearch } =
    useUserFindManyCommunityMember({
      limit: 12,
      communityId,
    })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search member" setSearch={setSearch} />
        <CommunityMemberUiRoleSelect placeholder="Filter by Role" value={role} setValue={setRole} clearable />
        <UiDebugModal data={items} />
        <UserCommunityMemberCreateModal create={createCommunityMember} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UserCommunityMemberUiTable
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
        <UiInfo message="No members found" />
      )}
    </UiStack>
  )
}
