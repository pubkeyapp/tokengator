import { Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { UiBack, UiCard, UiDebugModal, UiError, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { CommunityMember } from '@tokengator/sdk'
import { useAdminFindOneCommunityMember } from '@tokengator/web-community-member-data-access'
import { AdminCommunityMemberUiUpdateForm, CommunityMemberUiItem } from '@tokengator/web-community-member-ui'
import { useParams } from 'react-router-dom'
import { AdminCommunityMemberDetailInfoTab } from './admin-community-member-detail-info.tab'

export function AdminCommunityMemberDetailFeature() {
  const { communityMemberId } = useParams<{ communityMemberId: string }>() as { communityMemberId: string }
  const { item, query } = useAdminFindOneCommunityMember({ communityMemberId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="CommunityMember not found." />
  }

  return (
    <UiStack>
      <UiStack>
        <UiGroup>
          <Group>
            <UiBack />
            <CommunityMemberUiItem communityMember={item} />
          </Group>
          <UiDebugModal data={item} />
        </UiGroup>
        <AdminCommunityMemberDetailInfoTab communityMemberId={communityMemberId} />
        <UiCard>
          <AdminCommunityMemberUiUpdateModal item={item} refresh={query.refetch} />
        </UiCard>
      </UiStack>
    </UiStack>
  )
}

function AdminCommunityMemberUiUpdateModal({ item, refresh }: { item: CommunityMember; refresh: () => void }) {
  const { updateCommunityMember } = useAdminFindOneCommunityMember({ communityMemberId: item.id })

  return (
    <AdminCommunityMemberUiUpdateForm
      communityMember={item}
      submit={(value) =>
        updateCommunityMember(value).then((res) => {
          refresh()
          modals.closeAll()
          return res
        })
      }
    />
  )
}
