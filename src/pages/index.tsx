import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core'
import { type Link } from '@prisma/client'
import { IconLink } from '@tabler/icons-react'
import React from 'react'

import CardLinks from '~/components/CardLinks'
import Layout from '~/components/Layout'

const links: Link[] = [
  {
    id: 1,
    userId: 1,
    originalUrl: 'https://www.instagram.com',
    shortUrl: 'ig',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    userId: 1,
    originalUrl: 'https://www.youtube.com',
    shortUrl: 'yt',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function Home() {
  const theme = useMantineTheme()

  return (
    <Layout>
      <TextInput
        mt={80}
        size="md"
        rightSection={
          <ActionIcon size={32} color={theme.primaryColor} variant="filled">
            <IconLink size="1.1rem" stroke={1.5} />
          </ActionIcon>
        }
        placeholder="Type or paste your URL"
        rightSectionWidth={42}
      />
      {!!links?.length && <CardLinks links={links} />}
    </Layout>
  )
}
