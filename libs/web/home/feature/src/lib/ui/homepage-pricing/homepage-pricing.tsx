import { Box, Button, Flex, Group, Stack, Text, Title, useMantineTheme } from '@mantine/core'
import { useUiColorScheme } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function HomepagePricing() {
  const theme = useMantineTheme()
  const { colorScheme } = useUiColorScheme()
  const isDark = colorScheme === 'dark'

  const prices: {
    title: string
    price: string
    features: string[]
  }[] = [
    {
      title: 'Self-hosted',
      price: 'Free',
      features: ['Unlimited Managed NFTs', 'Open-source MIT License', 'Community Support', 'Bring your own Server'],
    },
    {
      title: 'Monthly',
      price: '49.99',
      features: ['100 Managed NFTs', 'Custom Branding', 'Custom Integrations', 'Chat Support'],
    },
    {
      title: 'Yearly',
      price: '499.99',
      features: ['100 Managed NFTs', 'Custom Branding', 'Custom Integrations', 'Priority Support'],
    },
  ]

  return (
    <Group justify="center" py="xl" my="xl">
      <Stack gap={40}>
        <Flex direction="column" gap={10} align="center" justify="start">
          <Title
            ta="center"
            style={{
              fontSize: '52px',
              fontFamily: `'Baloo Bhai 2', var(--mantine-font-family)`,
            }}
          >
            TokenGator Pricing
          </Title>
        </Flex>

        <Group>
          <Flex
            align={'center'}
            direction={{ base: 'column', sm: 'row' }}
            color={'hsl(232, 13%, 33%)'}
            gap={{ base: '1.5rem', sm: 0 }}
          >
            {prices.map((price, index) => {
              const isMiddle = index === 1
              const isLast = index === prices.length - 1

              return (
                <Box
                  key={index}
                  style={
                    isMiddle
                      ? {
                          boxShadow: '0px 30px 50px -7px rgba(0,0,0,0.1)',
                          height: '25rem',
                          width: '19rem',
                          paddingInline: '1.5rem',
                          background: theme.colors['brand'][6],
                          color: 'white',
                          borderRadius: '0.7rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',

                          '@media (minWidth: 756px) and (maxWidth: 820px)': {
                            width: '15rem',
                            borderRadius: '0.7rem',
                          },
                        }
                      : {
                          boxShadow: '0px 30px 50px -7px rgba(0,0,0,0.1)',
                          height: '22rem',
                          width: '17rem',
                          paddingInline: '1.5rem',
                          backgroundColor: isDark ? theme.colors.dark[7] : 'white',
                          borderRadius: isLast ? '0 0.7rem 0.7rem 0' : '0.7rem 0 0 0.7rem',

                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',

                          '@media (maxWidth: 755px)': {
                            width: '19rem',
                            borderRadius: '0.7rem',
                          },
                          '@media (minWidth: 756px) and (maxWidth: 820px)': {
                            width: '15rem',
                            borderRadius: '0.7rem 0 0 0.7rem',
                          },
                        }
                  }
                >
                  <Stack w={'100%'} align={'center'} gap={20}>
                    <Text
                      style={{
                        fontWeight: 700,
                        color: isDark ? theme.colors.dark[1] : 'hsl(233, 13%, 49%)',
                      }}
                      fz={'md'}
                    >
                      {price.title}
                    </Text>
                    <Title
                      order={2}
                      style={{
                        color: isDark ? 'white' : 'hsl(232, 13%, 33%)',
                        fontSize: 50,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      <Text fz={'2rem'}>$</Text>
                      {price.price}
                    </Title>
                    <Stack w={'100%'} align="center" gap={10}>
                      {price.features.map((feature, index) => (
                        <Text key={index} fz={'sm'} fw={600}>
                          {feature}
                        </Text>
                      ))}
                    </Stack>
                    <Button
                      component={Link}
                      to={'/dashboard'}
                      variant={isMiddle ? 'default' : 'filled'}
                      c="brand"
                      w="100%"
                    >
                      LEARN MORE
                    </Button>
                  </Stack>
                </Box>
              )
            })}
          </Flex>
        </Group>
      </Stack>
    </Group>
  )
}
