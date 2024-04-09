import { Anchor, Avatar, Container, SimpleGrid, Text, Title } from '@mantine/core'
import { ReactNode } from 'react'
import classes from './homepage-technology.module.css'

export const FEATURES: FeatureProps[] = [
  {
    logo: '/assets/anchor.png',
    title: 'Anchor: Solana Program Framework',
    description:
      "Anchor serves as the foundation for TokenGator's Solana programs, enabling rapid and secure development of smart contracts. This framework ensures that our digital asset management solutions are both efficient and reliable, leveraging Solana's blockchain capabilities to the fullest.",
  },
  {
    logo: '/assets/nestjs.svg',
    title: 'Nest.js: Scalable API Development',
    description:
      "At the heart of TokenGator's backend is Nest.js, a powerful framework for building efficient and scalable server-side applications. Nest.js allows us to create a highly performant API layer that seamlessly integrates with our blockchain infrastructure, ensuring fast and secure data handling.",
  },
  {
    logo: '/assets/prisma.svg',
    title: 'Prisma: Next-Generation ORM',
    description:
      'Prisma revolutionizes our database management, offering a next-generation ORM for Node.js and TypeScript. It simplifies database access, schema management, and migrations, enabling TokenGator to handle complex data models with ease and efficiency.',
  },
  {
    logo: '/assets/graphql.png',
    title: 'GraphQL: Flexible Data Queries',
    description:
      'TokenGator utilizes GraphQL to provide a flexible and efficient API for data queries and mutations. This allows users and developers to retrieve exactly the data they need from our platform, reducing bandwidth and improving the user experience.',
  },
  {
    logo: '/assets/react.svg',
    title: 'React: Interactive UIs',
    description:
      "Our user interfaces are built with React, ensuring that interacting with TokenGator is smooth, responsive, and engaging. React's component-based architecture allows us to create dynamic and reusable UI elements, enhancing the overall user journey on our platform.",
  },
  {
    logo: '/assets/mantine.svg',
    title: 'Mantine: Modern React UI Framework',
    description:
      "Mantine enhances TokenGator's user interface with its comprehensive suite of fully customizable React components. Focused on usability and accessibility, Mantine helps us deliver a beautiful and user-friendly experience across all aspects of our platform.",
  },
]

interface FeatureProps {
  logo?: string
  title: ReactNode
  description: ReactNode
}

export function Feature({ title, logo, description }: FeatureProps) {
  return (
    <div>
      <Avatar radius={0} size="lg" src={logo} />
      <Text mt="sm" size="lg" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  )
}

export function HomepageTechnology() {
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
        TokenGator Technology
      </Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          On the base of TokenGator's digital asset management platform lies a powerful technology. As a starting point,
          we used{' '}
          <Anchor href="https://github.com/pubkeyapp/pubkey-stack" target="_blank">
            PubKey Stack
          </Anchor>{' '}
          which is a full-stack TypeScript template for building web applications with React, NestJS, Prisma, and
          GraphQL.
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
