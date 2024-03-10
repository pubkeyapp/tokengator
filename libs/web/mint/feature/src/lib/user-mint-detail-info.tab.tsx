import { Button, Group, Select } from '@mantine/core'
import { UiCard, UiDebugModal, UiInfo, UiInfoItems, UiInfoTable, UiLoader, UiStack } from '@pubkey-ui/core'
import { AccountInfo, ParsedAccountData } from '@solana/web3.js'
import { Identity, IdentityProvider, Mint } from '@tokengator-mint/sdk'
import { useAuth } from '@tokengator-mint/web-auth-data-access'
import { useUserGetMintAccount } from '@tokengator-mint/web-mint-data-access'
import { MintUiInfo } from '@tokengator-mint/web-mint-ui'
import { useState } from 'react'

export function UserMintDetailInfoTab({ mint }: { mint: Mint }) {
  const { item, query, mintToIdentity } = useUserGetMintAccount({ mintId: mint.id })
  const { user } = useAuth()
  return (
    <UiStack>
      <UiCard>
        <MintUiInfo mint={mint} />
      </UiCard>

      <UiCard title="Mint Account">
        {query.isLoading ? (
          <UiLoader mb="md" />
        ) : item ? (
          <UserMintAccount account={item} />
        ) : (
          <UiStack>
            <UiInfo message="Mint not found on Solana." />
            <UserMintToIdentity identities={user?.identities ?? []} mintToIdentity={mintToIdentity} />
          </UiStack>
        )}
      </UiCard>
    </UiStack>
  )
}

export function UserMintAccount({ account }: { account: AccountInfo<ParsedAccountData> }) {
  const info = account.data.parsed?.info ?? {}
  const extensions = info?.extensions ?? []

  const items: UiInfoItems = [
    ['Owner', account.owner?.toString()],
    ['Lamports', account.lamports],
    ['Executable', account.executable ? 'Yes' : 'No'],
    ['Rent Epoch', account.rentEpoch],
    ['Program', account.data.program],
    ['Space', account.data.space],
    ['Type', account.data.parsed.type],
    ['Decimals', info?.decimals],
    ['Supply', info?.supply],
    ['IsInitialized', info?.isInitialized ? 'Yes' : 'No'],
    ['FreezeAuthority', info?.freezeAuthority ? info?.freezeAuthority : 'N/A'],
    ['MintAuthority', info?.mintAuthority ? info?.mintAuthority : 'N/A'],
  ]

  return (
    <UiStack>
      <UiInfoTable items={items} />
      <MintUiAccountExtensions extensions={extensions} />
      <UiDebugModal data={account} />
    </UiStack>
  )
}

interface MintExtension {
  extension: string
  state: {
    [key: string]: string | [string, string][]
  }
}

function MintUiAccountExtensions({ extensions }: { extensions: MintExtension[] }) {
  return (
    <UiStack>
      {extensions.map((extension, i) => (
        <MintUiAccountExtension key={extension.extension} extension={extension} />
      ))}
    </UiStack>
  )
}
function MintUiAccountExtension({ extension }: { extension: MintExtension }) {
  const items: UiInfoItems = Object.keys(extension.state).map((key) => {
    const value = extension.state[key] as string | [string, string][]
    if (Array.isArray(value)) {
      return [key, <UiInfoTable items={value} />]
    }
    return [key, value]
  })
  return (
    <UiCard title={extension.extension}>
      <UiInfoTable items={items} />
    </UiCard>
  )
}

export function UserMintToIdentity({
  mintToIdentity,
  identities,
}: {
  mintToIdentity: (identityId: string) => Promise<boolean>
  identities: Identity[]
}) {
  const options: { label: string; value: string }[] = identities
    .filter((i) => i.provider === IdentityProvider.Solana)
    .map((i) => ({ label: i.name ?? i.providerId, value: i.id }))
  const [identityId, setIdentityId] = useState<string | undefined>(options.length > 0 ? options[0].value : undefined)

  return (
    <UiStack>
      <Select
        data={options}
        label="Solana Identity"
        placeholder="Select Solana Identity"
        value={identityId}
        onChange={(value) => setIdentityId(value ?? undefined)}
      />

      <Group justify="flex-end">
        <Button
          disabled={!identityId}
          onClick={() => {
            if (!identityId) return
            mintToIdentity(identityId)
          }}
        >
          Mint
        </Button>
      </Group>
    </UiStack>
  )
}
