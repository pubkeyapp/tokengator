import { Accordion, Container, rem, ThemeIcon, Title } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import classes from './homepage-use-cases.module.css'

export function HomepageUseCases() {
  const items: {
    title: string
    content: string
  }[] = [
    {
      title: "Dean's List DAO Business Visa",
      content: `Dean's List DAO to issue Business Visas, facilitating members' ability to earn within the community. This innovative use case surpasses traditional limitations by utilizing dynamic NFTs, ensuring a seamless and enhanced user experience for both issuers and holders.`,
    },
    {
      title: 'IslandDAOx Event NFT',
      content: `Streamline Event Management and Access: For communities like Island DAO, TokenGator offers a solution to control access to facilities and events through sol-bound NFTs. These NFTs can include expiration dates and membership levels, such as staff, sponsor, visitor, and guest, making event access management straightforward and secure.`,
    },
    {
      title: 'Solana Mobile Chapter 2',
      content: `Innovate with Solana Mobile Integration: Although briefly mentioned, this use case hints at the potential for TokenGator to integrate with Solana Mobile efforts, potentially facilitating mobile-friendly digital asset management and engagement, opening new avenues for community interaction and asset utilization.`,
    },
  ]
  return (
    <div className={classes.wrapper}>
      <Container size="sm">
        <Title
          ta="center"
          style={{
            fontSize: '52px',
            fontFamily: `'Baloo Bhai 2', var(--mantine-font-family)`,
          }}
          mb="xl"
        >
          TokenGator Use Cases
        </Title>

        <Accordion
          multiple
          chevronPosition="right"
          chevronSize={26}
          variant="separated"
          disableChevronRotation
          styles={{ item: { border: 0 } }}
          chevron={
            <ThemeIcon radius="xl" color="brand" variant="light" size={26}>
              <IconPlus style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ThemeIcon>
          }
        >
          {items.map((item) => (
            <Accordion.Item className={classes.item} value={item.title} key={item.title}>
              <Accordion.Control>{item.title}</Accordion.Control>
              <Accordion.Panel>{item.content}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </div>
  )
}
