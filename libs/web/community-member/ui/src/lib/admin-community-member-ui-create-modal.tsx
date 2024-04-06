import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { AdminCreateCommunityMemberInput } from '@tokengator/sdk'
import { AdminCommunityMemberUiCreateForm } from './admin-community-member-ui-create-form'

export function AdminCommunityMemberUiCreateModal({
  create,
}: {
  create: (input: AdminCreateCommunityMemberInput) => Promise<boolean>
}) {
  return (
    <Button
      variant="light"
      onClick={() => {
        modals.open({
          centered: true,
          title: 'Add Member',
          children: (
            <AdminCommunityMemberUiCreateForm create={(input) => create(input).then(() => modals.closeAll())} />
          ),
        })
      }}
    >
      Add Member
    </Button>
  )
}
