import { Container, createStyles } from '@mantine/core'
import Navbar from './Navbar'

const useStyles = createStyles(theme => ({
  container: {
    backgroundColor: theme.colors.gray[1],
    minHeight: '100vh',
  },
}))

export default function Layout({ children }: { children: React.ReactNode }) {
  const { classes } = useStyles()

  return (
    <div className={classes.container}>
      <Navbar />
      <Container size="sm">{children}</Container>
    </div>
  )
}
