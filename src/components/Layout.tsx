import { Container } from '@mantine/core'
import Navbar from './Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Container size="sm">{children}</Container>
    </>
  )
}
