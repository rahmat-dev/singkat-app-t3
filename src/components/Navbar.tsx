import { useState } from 'react'
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  rem,
  Stack,
} from '@mantine/core'
import { IconLock, IconLogout } from '@tabler/icons-react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

import { convertAvatarName } from '~/utils/format'

const useStyles = createStyles(theme => ({
  header: {
    paddingTop: theme.spacing.sm,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
    }`,
    backgroundColor: theme.white,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}))

export default function Navbar() {
  const { classes, cx } = useStyles()
  const [userMenuOpened, setUserMenuOpened] = useState(false)
  const { data } = useSession()

  return (
    <div className={classes.header}>
      <Container size="sm" className={classes.mainSection}>
        <Group position="apart">
          <Text href="/" component={Link} fz="xl" fw="bold" color="teal">
            SINGKAT
          </Text>

          <Menu
            width={200}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={7}>
                  <Stack align="flex-end" spacing={4}>
                    <Text size="xs" weight={500} sx={{ lineHeight: 1 }} mr={3}>
                      {data?.user?.name}
                    </Text>
                    <Text color="gray" size="xs" sx={{ lineHeight: 1 }} mr={3}>
                      {data?.user?.email}
                    </Text>
                  </Stack>
                  <Avatar tt="uppercase" radius="xl" size={32} color="teal">
                    {convertAvatarName(data?.user?.name)}
                  </Avatar>
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                href="/change-password"
                component={Link}
                icon={<IconLock size="1rem" />}
              >
                Change Password
              </Menu.Item>
              <Menu.Item
                onClick={() => signOut()}
                icon={<IconLogout size="1rem" />}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </div>
  )
}
