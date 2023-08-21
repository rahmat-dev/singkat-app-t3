import { Button, Flex, Stack, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'

import { api } from '~/utils/api'

interface ModalDeleteLinkProps {
  id: number
}

export default function ModalDeleteLink({ id }: ModalDeleteLinkProps) {
  const { mutate, isLoading } = api.link.delete.useMutation()
  const utils = api.useContext()

  const handleCancel = () => {
    modals.closeAll()
  }

  const handleDelete = () => {
    mutate(
      { id },
      {
        onSuccess: () => {
          handleCancel()
          notifications.show({
            title: 'Delete Link',
            message: 'Your link has been successfully deleted',
          })
          utils.link.getAll.invalidate()
        },
        onError: error => {
          notifications.show({
            title: 'Delete Link',
            message: error.message,
            color: 'red',
          })
        },
      },
    )
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
