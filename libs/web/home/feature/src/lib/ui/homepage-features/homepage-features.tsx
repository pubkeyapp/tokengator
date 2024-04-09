import { Container, rem, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core'
import { IconGauge, IconMoneybag, IconPhoto, IconPuzzle, IconSourceCode, IconUsersGroup } from '@tabler/icons-react'
import { ComponentType, CSSProperties, ReactNode } from 'react'
import classes from './homepage-features.module.css'

export const FEATURES: FeatureProps[] = [
  {
    icon: IconGauge,
    title: 'Holistic Digital Asset Management',
    description:
      'TokenGator simplifies the creation, issuance, and management of digital assets on Solana, offering a comprehensive solution for DAOs and Network States.',
  },
  {
    icon: IconPhoto,
    title: 'Dynamic NFT Collections',
    description:
      'Leverage TokenGator to craft dynamic NFT collections that evolve with your community. Utilize Solana Token Extensions for enhanced functionality and engagement.',
  },
  {
    icon: IconUsersGroup,
    title: 'Community-Centric Features',
    description:
      'Designed with communities in mind, TokenGator supports diverse document management needs, from business visas to event access, tailored to your community’s identity.',
  },
  {
    icon: IconMoneybag,
    title: 'Transparent and Customizable Pricing',
    description:
      'Choose from flexible pricing tiers designed to fit the scale and scope of your project, ensuring you only pay for what you need.',
  },
  {
    icon: IconPuzzle,
    title: 'Easy Integration',
    description:
      'Incorporate TokenGator’s Anchor Program, SDK, and API into your existing systems for seamless integration and maximal composability within the Solana ecosystem.',
  },
  {
    icon: IconSourceCode,
    title: 'Open Source and MIT Licensed',
    description:
      'TokenGator is committed to transparency and flexibility, offering its powerful platform under the MIT License, enabling free, open-source access and customization to meet your unique needs.',
  },
]

interface FeatureProps {
  icon: ComponentType<{ color?: string; size?: number; style?: CSSProperties; stroke?: number }>
  title: ReactNode
  description: ReactNode
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </ThemeIcon>
      <Text mt="sm" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  )
}

export function HomepageFeatures() {
  const features = FEATURES.map((feature, index) => <Feature {...feature} key={index} />)

  return (
    <Container className={classes.wrapper}>
      <Title
        className={classes.title}
        style={{
          fontSize: '52px',
          fontFamily: `'Baloo Bhai 2', var(--mantine-font-family)`,
        }}
      >
        Unleash Your Community's Potential with TokenGator
      </Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          Explore a suite of robust features designed to revolutionize digital asset management on Solana. From dynamic
          NFT collections to open-source flexibility, TokenGator is your key to engaging and expanding your community.
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {features}
      </SimpleGrid>
    </Container>
  )
}
