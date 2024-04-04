import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'
import { WalletAdminCreateInput } from '@tokengator-mint/sdk'

export function AdminWalletUiCreateForm({ submit }: { submit: (res: WalletAdminCreateInput) => Promise<boolean> }) {
  const form = useForm<WalletAdminCreateInput>({
    initialValues: {
      secretKey: '',
      communityId: '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput name="secretKey" label="secretKey" {...form.getInputProps('secretKey')} />
        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
