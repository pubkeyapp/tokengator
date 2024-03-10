import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'
import { UserCreateCommunityInput } from '@tokengator-mint/sdk'

export function UserCommunityUiCreateForm({ submit }: { submit: (res: UserCreateCommunityInput) => Promise<boolean> }) {
  const model: UserCreateCommunityInput = {
    name: '',
    description: '',
    imageUrl: '',
  }

  const fields: UiFormField<UserCreateCommunityInput>[] = [
    formFieldText('name', { label: 'Name', required: true }),
    formFieldText('description', { label: 'Description', required: true }),
    formFieldText('imageUrl', { label: 'Image URL', required: false }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserCreateCommunityInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
