import { AspectRatio, Image, SimpleGrid, useMantineTheme } from '@mantine/core'
import { UiAnchor, UiCard, UiCardTitle, UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { AccountInfo, ParsedAccountData } from '@solana/web3.js'

export function MinterUiAssets({ items }: { items: AccountInfo<ParsedAccountData>[] }) {
  const { colors } = useMantineTheme()
  if (!items.length) return null
  return (
    <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }}>
      {items.map((item, index) => {
        const extensions: { extension: string; state: { mint: string } }[] = item.data.parsed.info.extensions ?? []
        const mint = extensions?.find((e) => e?.extension === 'tokenMetadata')?.state?.mint

        return (
          <UiCard
            title={
              <UiGroup>
                <UiAnchor to={`/assets/${mint}`}>
                  <UiCardTitle>Asset {index}</UiCardTitle>
                </UiAnchor>
                <UiDebugModal data={item} />
              </UiGroup>
            }
            key={index}
          >
            <AspectRatio ratio={1}>
              <Image src={`/api/metadata/image/${mint}`} bg={colors.gray[5]} radius="md" />
            </AspectRatio>
          </UiCard>
        )
      })}
    </SimpleGrid>
  )
}
