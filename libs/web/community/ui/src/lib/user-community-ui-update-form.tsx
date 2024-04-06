import { Button, Group } from '@mantine/core'
import { UserUpdateCommunityInput, Community } from '@tokengator/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

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

    imageUrl: community.imageUrl ?? '',
  }

  const fields: UiFormField<UserUpdateCommunityInput>[] = [
    formFieldText('name', { label: 'name' }),

    formFieldText('description', { label: 'description' }),

    formFieldText('imageUrl', { label: 'imageUrl' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateCommunityInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
