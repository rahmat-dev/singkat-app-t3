import { Button, PasswordInput, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { useState } from 'react'

import Layout from '~/components/Layout'

interface FormValues {
  password: string
  passwordConfirmation: string
}

export default function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false)

  const changePasswordForm = useForm<FormValues>({
    initialValues: {
      password: '',
      passwordConfirmation: '',
    },

    validate: {
      password: value => {
        if (!value) {
          return 'Password is required'
        }
        if (value.length < 8) {
          return 'Password must be more than 8 characters'
        }
      },
      passwordConfirmation: (value, values) => {
        if (!value) {
          return 'Password confirmation is required'
        }
        if (values.password !== value) {
          return "Password confirmation doesn't match"
        }
      },
    },
  })

  const handleUpdatePassword = (values: FormValues) => {
    console.log(values)
    setIsLoading(true)
    setTimeout(() => {
      notifications.show({
        title: 'Update Link',
        message: 'Your link has been successfully deleted',
        icon: <IconCheck size="1rem" />,
      })
      setIsLoading(false)
    }, 500)
  }

  return (
    <Layout>
      <form onSubmit={changePasswordForm.onSubmit(handleUpdatePassword)}>
        <Stack mt={80}>
          <PasswordInput
            withAsterisk
            label="New Password"
            {...changePasswordForm.getInputProps('password')}
          />
          <PasswordInput
            withAsterisk
            label="Password Confirmation"
            {...changePasswordForm.getInputProps('passwordConfirmation')}
          />
          <Button type="submit" loading={isLoading}>
            Update Password
          </Button>
        </Stack>
      </form>
    </Layout>
  )
}
