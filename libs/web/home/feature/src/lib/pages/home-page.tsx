import { Button, Container, Group, Text, Title } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { IconBrandGithub, IconRocket } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <Container size={800}>
      <UiStack gap="xl" my="xl">
        <Title>Welcome to TokenGator.</Title>

        <Text c="dimmed">This is the TokenGator project website.</Text>
        <Group>
          <Button component={Link} to="/dashboard" size="xl" color="brand" leftSection={<IconRocket />}>
            Get started
          </Button>
          <Button component={Link} to="/about" variant="light" size="xl" color="brand">
            About
          </Button>

          <Button
            component={'a'}
            href="https://github.com/pubkeyapp/tokengator"
            size="xl"
            variant="default"
            leftSection={<IconBrandGithub />}
          >
            Star on GitHub
          </Button>
        </Group>
      </UiStack>
    </Container>
  )
}
