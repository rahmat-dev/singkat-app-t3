import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconLink } from '@tabler/icons-react'
import React from 'react'

import CardLinks, { CardLinkSkeleton } from '~/components/CardLinks'
import Layout from '~/components/Layout'
import { api } from '~/utils/api'

interface FormValues {
  originalUrl: string
}

const ShortUrlForm = () => {
  const theme = useMantineTheme()
  const form = useForm<FormValues>({
    initialValues: {
      originalUrl: '',
    },
    validate: {
      originalUrl: value => {
        if (!value) return 'Url is required'
      },
    },
  })
  const { mutate, isLoading } = api.link.create.useMutation()
  const utils = api.useContext()

  const handleShortUrl = (values: FormValues) => {
    mutate(values, {
      onSuccess: () => {
        notifications.show({
          title: 'Short URL',
          message: 'URL has been successfully shortened',
        })
        utils.link.getAll.invalidate()
        form.reset()
      },
      onError: error => {
        notifications.show({
          title: 'Short URL',
          message: error.data?.zodError?.fieldErrors?.originalUrl?.length
            ? error.data?.zodError?.fieldErrors?.originalUrl
            : error.message,
          color: 'red',
        })
      },
    })
  }

  return (
    <form onSubmit={form.onSubmit(handleShortUrl)}>
      <TextInput
        mt={80}
        size="md"
        rightSection={
          <ActionIcon
            loading={isLoading}
            type="submit"
            size={32}
            color={theme.primaryColor}
            variant="filled"
          >
            <IconLink size="1.1rem" stroke={1.5} />
          </ActionIcon>
        }
        placeholder="Type or paste your URL"
        rightSectionWidth={42}
        {...form.getInputProps('originalUrl')}
      />
    </form>
  )
}

export default function Home() {
  const { data: links, isLoading } = api.link.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })

  return (
    <Layout>
      <ShortUrlForm />
      {isLoading && <CardLinkSkeleton />}
      {!isLoading && !!links?.length && <CardLinks links={links} />}
    </Layout>
  )
}
