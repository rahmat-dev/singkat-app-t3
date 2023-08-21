import { Button, PasswordInput, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'

import Layout from '~/components/Layout'
import { api } from '~/utils/api'

interface FormValues {
  password: string
  passwordConfirmation: string
}

export default function ChangePassword() {
  const { mutate, isLoading } = api.auth.changePassword.useMutation()

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
          return 'Password must be atleast 8 characters'
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
    mutate(values, {
      onSuccess: () => {
        notifications.show({
          title: 'Change Password',
          message: 'Password has been successfully updated',
          icon: <IconCheck size="1rem" />,
        })
        changePasswordForm.reset()
      },
      onError: error => {
        notifications.show({
          title: 'Change Password',
          message: error.message,
          icon: <IconX size="1rem" />,
        })
      },
    })
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
