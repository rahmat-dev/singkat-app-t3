import {
  Stack,
  Card,
  Button,
  Flex,
  Anchor,
  Title,
  ActionIcon,
  CopyButton,
  Tooltip,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { type Link } from '@prisma/client'
import { IconCheck, IconCopy, IconPencil, IconTrash } from '@tabler/icons-react'

import { env } from '~/env.mjs'
import ModalEditLink from './modal/ModalEditLink'
import ModalDeleteLink from './modal/ModalDeleteLink'

interface CardLinkProps {
  link: Link
  handleEdit: (link: Link) => void
  handleDelete: (id: number) => void
}

function CardLink({ link, handleEdit, handleDelete }: CardLinkProps) {
  const { originalUrl, shortUrl } = link
  const appUrl = env.NEXT_PUBLIC_APP_URL

  return (
    <Card shadow="sm" padding="xl">
      <Stack spacing={4}>
        <Flex gap={4}>
          <Anchor
            href={`${appUrl}/${shortUrl}`}
            target="_blank"
            weight={500}
            color="dark"
            size="lg"
            truncate
          >
            {`${appUrl
              ?.replace('http://', '')
              ?.replace('https://', '')}/${shortUrl}`}
          </Anchor>
          <CopyButton value={`${appUrl}/${shortUrl}`} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? 'Copied' : 'Copy'}
                withArrow
                position="right"
              >
                <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                  {copied ? (
                    <IconCheck size="1rem" />
                  ) : (
                    <IconCopy size="1rem" />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Flex>
        <Flex gap={4} align="center">
          <Anchor
            href={originalUrl}
            target="_blank"
            color="dimmed"
            size="sm"
            truncate
          >
            {originalUrl}
          </Anchor>
          <CopyButton value={originalUrl} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? 'Copied' : 'Copy'}
                withArrow
                position="right"
              >
                <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                  {copied ? (
                    <IconCheck size="1rem" />
                  ) : (
                    <IconCopy size="1rem" />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Flex>
      </Stack>

      <Flex mt="md" gap="sm">
        <Button
          size="xs"
          leftIcon={<IconPencil size={16} />}
          color="yellow"
          onClick={() => handleEdit(link)}
        >
          Edit
        </Button>
        <Button
          size="xs"
          leftIcon={<IconTrash size={16} />}
          color="red"
          onClick={() => handleDelete(link.id)}
        >
          Delete
        </Button>
      </Flex>
    </Card>
  )
}

export default function CardLinks({ links }: { links: Link[] }) {
  const handleEdit = (link: Link) => {
    modals.open({
      title: 'Edit Link',
      children: <ModalEditLink link={link} />,
      closeOnClickOutside: false,
      centered: true,
    })
  }

  const handleDelete = (id: number) => {
    modals.open({
      title: 'Delete Link',
      children: <ModalDeleteLink id={id} />,
      closeOnClickOutside: false,
      centered: true,
      withCloseButton: false,
    })
  }

  return (
    <>
      <Stack mt="xl">
        <Title order={4}>Your Links</Title>
        <Stack>
          {links.map(link => (
            <CardLink
              key={link.id}
              link={link}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </Stack>
      </Stack>
    </>
  )
}
