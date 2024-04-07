import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'
import { Community, UserUpdateCommunityInput } from '@tokengator/sdk'

export function UserCommunityUiUpdateForm({
  submit,
  community,
}: {
  submit: (res: UserUpdateCommunityInput) => Promise<boolean>
  community: Community
}) {
  const model: UserUpdateCommunityInput = {
    name: community.name ?? '',
    description: community.description ?? '',
    iconUrl: community.iconUrl ?? '',
    logoUrl: community.logoUrl ?? '',
  }

  const fields: UiFormField<UserUpdateCommunityInput>[] = [
    formFieldText('name', { label: 'name' }),
    formFieldText('description', { label: 'description' }),
    formFieldText('iconUrl', { label: 'Icon URL (square)', required: false }),
    formFieldText('logoUrl', { label: 'Logo URL (rectangle)', required: false }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateCommunityInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
