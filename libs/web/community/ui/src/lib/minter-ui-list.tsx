import { ActionIcon, Group, SimpleGrid, Text, Tooltip } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { TokenGatorMinter } from '@tokengator/sdk'

import { MinterUiCard } from './minter-ui-card'

export function MinterUiList({
  items,
  deleteMinter,
}: {
  items: TokenGatorMinter[]
  deleteMinter: (account: string) => Promise<void>
}) {
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      {items.map((item, index) => (
        <MinterUiCard key={index} item={item}>
          <Text c="dimmed">{item.description}</Text>

          <Group justify="flex-end">
            <Tooltip label={'Delete minter'}>
              <ActionIcon
                color="red"
                variant="light"
                size="sm"
                onClick={() => {
                  deleteMinter(item.publicKey)
                }}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </MinterUiCard>
      ))}
    </SimpleGrid>
  )
}
