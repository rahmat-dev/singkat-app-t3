import { Button, Flex, Stack, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { useState } from 'react'

interface ModalDeleteLinkProps {
  id: number
}

export default function ModalDeleteLink({ id }: ModalDeleteLinkProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCancel = () => {
    modals.closeAll()
  }

  const handleDelete = () => {
    setIsLoading(true)
    setTimeout(() => {
      modals.closeAll()
      notifications.show({
        title: 'Delete Link',
        message: 'Your link has been successfully deleted',
        icon: <IconCheck size="1rem" />,
      })
    }, 500)
  }

  return (
    <Stack>
      <Text size="sm">
        Are you sure you want to delete your link {id}? This action is
        destructive and you will have to contact support to restore your data.
      </Text>
      <Flex justify="end" gap="xs">
        <Button color="gray" onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="red" onClick={handleDelete} loading={isLoading}>
          Yes, delete it!
        </Button>
      </Flex>
    </Stack>
  )
}
