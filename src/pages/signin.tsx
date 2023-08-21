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
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { getServerAuthSession } from '~/server/auth'

interface FormValues {
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

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const theme = useMantineTheme()
  const signInForm = useForm<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
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
      },
    },
  })

  const handleSignIn = async (values: FormValues) => {
    setIsLoading(true)
    const res = await signIn('credentials', {
      ...values,
      redirect: false,
    })
    if (!res || !res.ok) {
      notifications.show({
        title: 'Sign In',
        message: res?.error,
        color: 'red',
      })
      setIsLoading(false)
    } else {
      router.push('/')
    }
  }

  return (
    <>
      <Head>
        <title>Singkat | Sign In</title>
      </Head>
      <Center h="100vh" bg="gray.1" p="md">
        <Card w="100%" maw={360} shadow="sm" padding="xl">
          <Stack spacing={4} mb="xl">
            <Text fz="xl" weight={600}>
              Sign In
            </Text>
            <Divider w={48} size="sm" color="dark" />
          </Stack>
          <form onSubmit={signInForm.onSubmit(handleSignIn)}>
            <Stack>
              <TextInput
                withAsterisk
                label="Email"
                {...signInForm.getInputProps('email')}
              />
              <PasswordInput
                withAsterisk
                label="Password"
                {...signInForm.getInputProps('password')}
              />
              <Button type="submit" loading={isLoading}>
                Sign In
              </Button>
            </Stack>
          </form>
          <Text size="sm" mt="sm" align="center">
            Don&apos;t have an account?&nbsp;
            <Text
              size="sm"
              component={Link}
              href="/signup"
              color={theme.primaryColor}
              weight={600}
            >
              Sign Up
            </Text>
          </Text>
        </Card>
      </Center>
    </>
  )
}
