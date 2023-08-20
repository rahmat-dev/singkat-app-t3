import {
  Button,
  Card,
  Center,
  Divider,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getServerAuthSession } from '~/server/auth'
import { api } from '~/utils/api'

interface FormValues {
  name: string
  email: string
  password: string
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  const session = await getServerAuthSession(ctx)
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default function SignUp() {
  const router = useRouter()
  const theme = useMantineTheme()
  const signUpForm = useForm<FormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate: {
      name: value => {
        if (!value) {
          return 'Name is required'
        }
      },
      email: value => {
        if (!value) {
          return 'Email is required'
        }
        if (!/^\S+@\S+$/.test(value)) {
          return 'Email is not valid'
        }
      },
      password: value => {
        if (!value) {
          return 'Password is required'
        }
        if (value.length < 8) {
          return 'Password must be atleast 8 characters'
        }
      },
    },
  })
  const { mutate, isLoading } = api.auth.signUp.useMutation()

  const handleSignUp = (values: FormValues) => {
    mutate(values, {
      onSuccess: () => {
        notifications.show({
          title: 'Sign Up',
          message: 'Yeay.. registration successful',
        })
        router.push('/signin')
      },
      onError: error => {
        notifications.show({
          title: 'Sign Up',
          message: error.message,
          color: 'red',
        })
      },
    })
  }

  return (
    <Center h="100vh" bg="gray.1" p="md">
      <Card w="100%" maw={360} shadow="sm" padding="xl">
        <Stack spacing={4} mb="xl">
          <Text fz="xl" weight={600}>
            Sign Up
          </Text>
          <Divider w={48} size="sm" color="dark" />
        </Stack>
        <form onSubmit={signUpForm.onSubmit(handleSignUp)}>
          <Stack>
            <TextInput
              withAsterisk
              label="Name"
              {...signUpForm.getInputProps('name')}
            />
            <TextInput
              withAsterisk
              label="Email"
              {...signUpForm.getInputProps('email')}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              {...signUpForm.getInputProps('password')}
            />
            <Button type="submit" loading={isLoading}>
              Sign Up
            </Button>
          </Stack>
        </form>
        <Text size="sm" mt="sm" align="center">
          Already have an account?&nbsp;
          <Text
            size="sm"
            component={Link}
            href="/signin"
            color={theme.primaryColor}
            weight={600}
          >
            Sign In
          </Text>
        </Text>
      </Card>
    </Center>
  )
}
