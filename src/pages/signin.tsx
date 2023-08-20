import {
  Button,
  Card,
  Center,
  Container,
  Divider,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Link from 'next/link'

interface FormValues {
  email: string
  password: string
}

export default function SignIn() {
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

  const handleSignIn = (values: FormValues) => {
    console.log(values)
  }

  return (
    <Container size="sm" bg="gray.1">
      <Center h="100vh">
        <Card w="100%" maw={360} shadow="sm" padding="xl">
          <Stack spacing={4} mb="xl">
            <Text fz="xl" weight={500}>
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
              <TextInput
                withAsterisk
                label="Password"
                {...signInForm.getInputProps('password')}
              />
              <Button type="submit">Sign In</Button>
            </Stack>
          </form>
          <Text size="sm" mt="sm" align="center">
            Don&apos;t have an account?&nbsp;
            <Text
              size="sm"
              component={Link}
              href="/signup"
              color={theme.primaryColor}
              weight={500}
            >
              Sign Up
            </Text>
          </Text>
        </Card>
      </Center>
    </Container>
  )
}
