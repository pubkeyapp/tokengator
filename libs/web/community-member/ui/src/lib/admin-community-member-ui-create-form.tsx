import { Button, Group } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { AdminCreateCommunityMemberInput, CommunityMemberRole, User } from '@tokengator-mint/sdk'
import { CommunityMemberUiRoleSelect } from './community-member-ui-role-select'
import { UserUiSearch } from '@tokengator-mint/web-user-ui'
import { useState } from 'react'

export function AdminCommunityMemberUiCreateForm({
  create,
}: {
  create: (input: AdminCreateCommunityMemberInput) => Promise<void>
}) {
  const [userResult, setUserResult] = useState<User | undefined>(undefined)
  const [role, communityRole] = useState<CommunityMemberRole>(CommunityMemberRole.Member)
  return (
    <UiStack>
      <CommunityMemberUiRoleSelect
        label="Role"
        description="Select the role for the user"
        value={role}
        setValue={(role) => {
          if (role) {
            communityRole(role)
          }
        }}
      />
      <UserUiSearch description="Search for a user to add to the community" select={setUserResult} />
      <Group justify="end">
        <Button
          disabled={!userResult?.id || !role}
          onClick={() => {
            if (!userResult?.id) return
            return create({ communityId: '', userId: userResult?.id, role: role })
          }}
        >
          Add Member
        </Button>
      </Group>
    </UiStack>
  )
}
