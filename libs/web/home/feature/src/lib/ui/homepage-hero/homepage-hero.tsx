import { Button, Container, Group, Text } from '@mantine/core'
import { IconBrandGithub, IconRocket } from '@tabler/icons-react'
import { solanaGradient } from '@tokengator/sdk'
import { Link } from 'react-router-dom'
import classes from './homepage-hero.module.css'

export function HomepageHero() {
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          The Easiest Way to Manage Dynamic NFT Collections on{' '}
          <Text component="span" variant="gradient" gradient={solanaGradient} inherit>
            Solana
          </Text>
          .{' '}
        </h1>

        <Text className={classes.description} c="dimmed">
          Gone are the days of manual scripts and tooling to manage your NFT collections. TokenGator is a powerful
          platform that allows you to create, manage, and distribute dynamic NFT collections with ease.
        </Text>

        <Group className={classes.controls}>
          <Button
            component={Link}
            to="/dashboard"
            size="xl"
            className={classes.control}
            variant="filled"
            color="brand"
            leftSection={<IconRocket size={20} />}
          >
            Get started
          </Button>

          <Button
            component="a"
            href="https://github.com/pubkeyapp/tokengator"
            size="xl"
            target="_blank"
            rel="noopener noreferrer"
            variant="default"
            className={classes.control}
            leftSection={<IconBrandGithub size={20} />}
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  )
}
