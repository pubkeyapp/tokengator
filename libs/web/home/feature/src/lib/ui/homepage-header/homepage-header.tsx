import { Burger, Button, Container, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconRocket } from '@tabler/icons-react'
import { AppLogoType } from '@tokengator/web-core-ui'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './homepage-header.module.css'

const links = [
  { link: '/home#home', label: 'Home' },
  { link: '/home#features', label: 'Features' },
  { link: '/home#pricing', label: 'Pricing' },
  { link: '/home#team', label: 'Team' },
]

export function HomepageHeader() {
  const [opened, { toggle }] = useDisclosure(false)
  const [active, setActive] = useState(links[0].link)

  const items = links.map((link, index) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        setActive(link.link)
      }}
    >
      {link.label}
    </a>
  ))

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <AppLogoType height={28} />
        <Group gap={5} visibleFrom="xs">
          {items}
          <Button
            component={Link}
            c="brand"
            variant="light"
            to={'/dashboard'}
            className={classes.link}
            leftSection={<IconRocket size={20} />}
          >
            Get Started
          </Button>
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  )
}
