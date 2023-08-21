import { Button, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { type Link } from '@prisma/client'
import { IconCheck, IconX } from '@tabler/icons-react'
import { api } from '~/utils/api'

interface ModalEditLink {
  link: Link
}

interface FormValues {
  shortUrl: string
}

export default function ModalEditLink({ link }: ModalEditLink) {
  const { mutate, isLoading } = api.link.update.useMutation()
  const utils = api.useContext()

  const editFrom = useForm<FormValues>({
    initialValues: {
      shortUrl: link.shortUrl,
    },

    validate: {
      shortUrl: value => {
        if (!value) {
          return 'Short url is required'
        }
        if (!/^[a-zA-Z0-9_\-]+$/.test(value)) {
          return 'Short url only letter, number, - or _'
        }
      },
    },
  })

  const handleEdit = (values: FormValues) => {
    mutate(
      { id: link.id, shortUrl: values.shortUrl },
      {
        onSuccess: () => {
          modals.closeAll()
          notifications.show({
            title: 'Update Link',
            message: 'Your link has been successfully deleted',
            icon: <IconCheck size="1rem" />,
          })
          utils.link.getAll.invalidate()
        },
        onError: error => {
          notifications.show({
            title: 'Update Link',
            message: error.message,
            icon: <IconX size="1rem" />,
            color: 'red',
          })
        },
      },
    )
  }

  return (
    <form onSubmit={editFrom.onSubmit(handleEdit)}>
      <Stack>
        <TextInput
          withAsterisk
          label="Short Url"
          {...editFrom.getInputProps('shortUrl')}
        />
        <TextInput disabled label="Original Url" value={link.originalUrl} />
        <Button
          type="submit"
          loading={isLoading}
          disabled={link.shortUrl === editFrom.values.shortUrl}
        >
          Update
        </Button>
      </Stack>
    </form>
  )
}
