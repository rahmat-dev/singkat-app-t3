import { Button, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { type Link } from '@prisma/client'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useState } from 'react'

interface ModalEditLink {
  link: Link
}

interface FormValues {
  shortUrl: string
}

export default function ModalEditLink({ link }: ModalEditLink) {
  const [isLoading, setIsLoading] = useState(false)

  const editFrom = useForm<FormValues>({
    initialValues: {
      shortUrl: link.shortUrl,
    },

    validate: {
      shortUrl: value => {
        if (!value) {
          return 'Short url is required'
        }
      },
    },
  })

  const handleEdit = (values: FormValues) => {
    setIsLoading(true)
    setTimeout(() => {
      if (values.shortUrl === 'success') {
        modals.closeAll()
        notifications.show({
          title: 'Update Link',
          message: 'Your link has been successfully deleted',
          icon: <IconCheck size="1rem" />,
        })
      } else {
        setIsLoading(false)
        notifications.show({
          title: 'Update Link',
          message: 'Update failed, short url is already in use',
          icon: <IconX size="1rem" />,
          color: 'red',
        })
      }
    }, 500)
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
        <Button type="submit" loading={isLoading}>
          Update
        </Button>
      </Stack>
    </form>
  )
}
