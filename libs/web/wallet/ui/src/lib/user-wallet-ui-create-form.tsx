import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'
import { WalletUserCreateInput } from '@tokengator/sdk'

export function UserWalletUiCreateForm({ submit }: { submit: (res: WalletUserCreateInput) => Promise<boolean> }) {
  const form = useForm<WalletUserCreateInput>({
    initialValues: {
      communityId: '',
      secretKey: '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput
          name="secretKey"
          label="Secret"
          description="Add the byte array of the secret key. Leave empty to generate a new key."
          {...form.getInputProps('secretKey')}
        />
        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
