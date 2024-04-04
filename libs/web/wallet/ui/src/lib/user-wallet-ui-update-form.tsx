import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'
import { Wallet, WalletUserUpdateInput } from '@tokengator-mint/sdk'

export function UserWalletUiUpdateForm({
  submit,
  wallet,
}: {
  submit: (res: WalletUserUpdateInput) => Promise<boolean>
  wallet: Wallet
}) {
  const form = useForm<WalletUserUpdateInput>({
    initialValues: {
      name: wallet.name ?? '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput name="name" label="name" {...form.getInputProps('name')} />
        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
