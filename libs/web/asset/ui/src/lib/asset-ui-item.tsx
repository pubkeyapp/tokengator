import { AspectRatio, Image, useMantineTheme } from '@mantine/core'
import { UiCardTitle, UiDebugModal, UiInfoTable, UiStack } from '@pubkey-ui/core'
import { Asset } from '@tokengator/sdk'
import { ReactNode } from 'react'

export function AssetUiItem({ asset }: { asset: Asset }) {
  const { colors } = useMantineTheme()
  return (
    <UiStack>
      <AspectRatio ratio={1}>
        <Image src={asset.image} bg={colors.gray[5]} radius="md" />
      </AspectRatio>
      <UiStack>
        <AssetUiAttributes
          attributes={[
            ['Name', <UiCardTitle>{asset.name}</UiCardTitle>],
            ['Description', asset.description],
            ['account', asset.account],
            ['activities', asset.activities.join(', ')],
            ...asset.attributes,
          ]}
        />
        <UiDebugModal data={asset} />
      </UiStack>
    </UiStack>
  )
}

export function AssetUiAttributes({ attributes }: { attributes: ReactNode[][] }) {
  return <UiInfoTable items={attributes.map(([key, value]) => [key, value])} />
}
