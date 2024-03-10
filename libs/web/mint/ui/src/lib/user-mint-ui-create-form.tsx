import { Button, Group } from '@mantine/core'
import { formFieldNumber, formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'
import { UserCreateMintInput } from '@tokengator-mint/sdk'

export function UserMintUiCreateForm({ submit }: { submit: (res: UserCreateMintInput) => Promise<boolean> }) {
  const model: UserCreateMintInput = {
    communityId: '',
    name: '',
    symbol: '',
    decimals: 0,
    imageUrl: '',
    secretKey: '',
  }

  const fields: UiFormField<UserCreateMintInput>[] = [
    formFieldText('name', { label: 'Name', required: true }),
    formFieldText('symbol', { label: 'Symbol', required: true }),
    formFieldNumber('decimals', { label: 'Decimals', required: true }),
    formFieldText('imageUrl', { label: 'Image Url', required: false }),
    formFieldText('secretKey', { label: 'Secret Key', required: false }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserCreateMintInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
