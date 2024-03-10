import { Button, Group } from '@mantine/core'
import { formFieldNumber, formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'
import { AdminCreateMintInput } from '@tokengator-mint/sdk'

export function AdminMintUiCreateForm({ submit }: { submit: (res: AdminCreateMintInput) => Promise<boolean> }) {
  const model: AdminCreateMintInput = {
    name: '',
    symbol: '',
    decimals: 0,
    imageUrl: '',
    secretKey: '',
  }

  const fields: UiFormField<AdminCreateMintInput>[] = [
    formFieldText('name', { label: 'Name', required: true }),
    formFieldText('symbol', { label: 'Symbol', required: true }),
    formFieldNumber('decimals', { label: 'Decimals', required: true }),
    formFieldText('imageUrl', { label: 'imageUrl', required: false }),
    formFieldText('secretKey', { label: 'secretKey', required: false }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateMintInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
