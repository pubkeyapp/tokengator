import { Button, Group } from '@mantine/core'
import { formFieldNumber, formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'
import { Mint, UserUpdateMintInput } from '@tokengator-mint/sdk'

export function UserMintUiUpdateForm({
  submit,
  mint,
}: {
  submit: (res: UserUpdateMintInput) => Promise<boolean>
  mint: Mint
}) {
  const model: UserUpdateMintInput = {
    name: mint.name ?? '',
    symbol: mint.symbol ?? '',
    decimals: mint.decimals ?? 0,
    imageUrl: mint.imageUrl ?? '',
    secretKey: '',
  }

  const fields: UiFormField<UserUpdateMintInput>[] = [
    formFieldText('name', { label: 'Name', required: false }),
    formFieldText('symbol', { label: 'Symbol', required: false }),
    formFieldNumber('decimals', { label: 'Decimals', required: false }),
    formFieldText('imageUrl', { label: 'Image Url', required: false }),
    formFieldText('secretKey', { label: 'Secret Key', required: false }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateMintInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
