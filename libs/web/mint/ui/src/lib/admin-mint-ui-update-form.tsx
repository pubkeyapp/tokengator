import { Button, Group } from '@mantine/core'
import { formFieldNumber, formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'
import { AdminUpdateMintInput, Mint } from '@tokengator-mint/sdk'

export function AdminMintUiUpdateForm({
  submit,
  mint,
}: {
  submit: (res: AdminUpdateMintInput) => Promise<boolean>
  mint: Mint
}) {
  const model: AdminUpdateMintInput = {
    name: mint.name ?? '',
    symbol: mint.symbol ?? '',
    decimals: mint.decimals ?? 0,
    imageUrl: mint.imageUrl ?? '',
    secretKey: '',
  }

  const fields: UiFormField<AdminUpdateMintInput>[] = [
    formFieldText('name', { label: 'Name', required: false }),
    formFieldText('symbol', { label: 'Symbol', required: false }),
    formFieldNumber('decimals', { label: 'Decimals', required: false }),
    formFieldText('imageUrl', { label: 'Image Url', required: false }),
    formFieldText('secretKey', { label: 'Secret Key', required: false }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateMintInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
