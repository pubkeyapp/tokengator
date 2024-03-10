import { Button, Group } from '@mantine/core'
import { formFieldSelect, getEnumOptions, UiForm, UiFormField } from '@pubkey-ui/core'
import { CommunityMember, CommunityMemberRole, UserUpdateCommunityMemberInput } from '@tokengator-mint/sdk'

export function UserCommunityMemberUiUpdateForm({
  submit,
  communityMember,
}: {
  submit: (res: UserUpdateCommunityMemberInput) => Promise<boolean>
  communityMember: CommunityMember
}) {
  const model: UserUpdateCommunityMemberInput = {
    role: communityMember.role,
  }

  const fields: UiFormField<UserUpdateCommunityMemberInput>[] = [
    formFieldSelect('role', {
      label: 'Role',
      description: 'The role of the user in the community.',
      options: getEnumOptions(CommunityMemberRole),
    }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateCommunityMemberInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
