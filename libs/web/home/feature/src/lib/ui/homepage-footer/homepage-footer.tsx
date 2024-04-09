import { ActionIcon, Anchor, Container, Group, rem, Stack, Text, Tooltip } from '@mantine/core'
import { UiAnchor, UiLogoType } from '@pubkey-ui/core'
import { IconBrandDiscord, IconBrandGithub, IconBrandX } from '@tabler/icons-react'
import { AppLogoType } from '@tokengator/web-core-ui'
import classes from './homepage-footer.module.css'

const data = [
  {
    title: 'About',
    links: [
      { label: 'Home', link: '/home#homepage' },
      { label: 'Features', link: '/home#features' },
      { label: 'Pricing', link: '/home#pricing' },
      { label: 'Team', link: '/home#team' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'Platform', link: 'https://github.com/pubkeyapp/tokengator' },
      { label: 'Program Library', link: 'https://github.com/pubkeyapp/tokengator-program-library' },
      {
        label: 'Deployed Program',
        link: 'https://solana.fm/address/GAToRDEEZmbXSe7ECcChQ1TsZCQXDBCtVhSd1Ypas9h6?cluster=devnet-alpha',
      },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Join Discord', link: 'https://discord.gg/XxuZQeDPNf' },
      { label: 'Follow on X', link: 'https://x.com/TokenGator' },
      { label: 'Star on GitHub', link: 'https://github.com/pubkeyapp/tokengator' },
    ],
  },
]

export function HomepageFooter() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <UiAnchor key={index} to={link.link}>
        <Text className={classes.link}>{link.label}</Text>
      </UiAnchor>
    ))

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    )
  })

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <AppLogoType height={30} />
          <Text size="xs" c="dimmed" className={classes.description}>
            The Easiest Way to Manage Dynamic NFT Collections on Solana.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Stack gap="xs" align="flex-start">
          <UiLogoType height={30} />
          <Text c="dimmed" size="sm">
            TokenGator is a{' '}
            <Anchor href="https://x.com/PubKeyapp" target="_blank">
              PubKey
            </Anchor>{' '}
            Project built for the{' '}
            <Anchor href="https://www.colosseum.org/renaissance" target="_blank">
              Renaissance Hackathon.
            </Anchor>
          </Text>
        </Stack>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <Tooltip label="Follow on X" position="top" withArrow>
            <ActionIcon component="a" href="https://x.com/TokenGator" size="lg" color="gray" variant="subtle">
              <IconBrandX style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Star on GitHub" position="top" withArrow>
            <ActionIcon
              component="a"
              href="https://github.com/pubkeyapp/tokengator"
              size="lg"
              color="gray"
              variant="subtle"
            >
              <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Join Discord" position="top" withArrow>
            <ActionIcon component="a" href="https://discord.gg/XxuZQeDPNf" size="lg" color="gray" variant="subtle">
              <IconBrandDiscord style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Container>
    </footer>
  )
}
