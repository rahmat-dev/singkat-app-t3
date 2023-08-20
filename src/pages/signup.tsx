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
  name: string
  email: string
  password: string
}

export default function SignUp() {
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
      },
    },
  })

  const handleSignUp = (values: FormValues) => {
    console.log(values)
  }

  return (
    <Container size="sm" bg="gray.1">
      <Center h="100vh">
        <Card w="100%" maw={360} shadow="sm" padding="xl">
          <Stack spacing={4} mb="xl">
            <Text fz="xl" weight={500}>
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
              <TextInput
                withAsterisk
                label="Password"
                {...signUpForm.getInputProps('password')}
              />
              <Button type="submit">Sign Up</Button>
            </Stack>
          </form>
          <Text size="sm" mt="sm" align="center">
            Already have an account?&nbsp;
            <Text
              size="sm"
              component={Link}
              href="/signin"
              color={theme.primaryColor}
              weight={500}
            >
              Sign In
            </Text>
          </Text>
        </Card>
      </Center>
    </Container>
  )
}
