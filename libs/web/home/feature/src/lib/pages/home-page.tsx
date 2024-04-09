import { Box, useMantineTheme } from '@mantine/core'
import { UiStack, useUiColorScheme } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { HomepageFeatures } from '../ui/homepage-features/homepage-features'
import { HomepageFooter } from '../ui/homepage-footer/homepage-footer'
import { HomepageHeader } from '../ui/homepage-header/homepage-header'
import { HomepageHero } from '../ui/homepage-hero/homepage-hero'
import { HomepagePricing } from '../ui/homepage-pricing/homepage-pricing'
import { HomepageTechnology } from '../ui/homepage-technology/homepage-technology'
import { HomepageUseCases } from '../ui/homepage-use-cases/homepage-use-cases'

export default function HomePage() {
  const items: { id: string; element: ReactNode }[] = [
    { id: 'homepage', element: <HomepageHero /> },
    { id: 'features', element: <HomepageFeatures /> },
    { id: 'pricing', element: <HomepagePricing /> },
    { id: 'use-cases', element: <HomepageUseCases /> },
    { id: 'technology', element: <HomepageTechnology /> },
  ]

  return (
    <UiStack gap={0}>
      <HomepageHeader />
      {items.map(({ id, element }, index) => (
        <HomepageSection key={id} id={id} index={index}>
          {element}
        </HomepageSection>
      ))}
      <HomepageFooter />
    </UiStack>
  )
}

function HomepageSection({ children, id, index }: { children: ReactNode; id: string; index: number }) {
  const { colors } = useMantineTheme()
  const { colorScheme } = useUiColorScheme()
  const isDark = colorScheme === 'dark'
  const isOdd = index % 2 === 0

  const bg = isDark ? colors.dark[isOdd ? 8 : 9] : isOdd ? colors.gray[0] : colors.gray[1]

  return (
    <Box bg={bg} id={id} py="xl">
      {children}
    </Box>
  )
}
