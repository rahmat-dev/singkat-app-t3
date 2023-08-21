import type { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { prisma } from '~/server/db'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  const shortUrl = ctx.params?.shortUrl as string
  const link = await prisma.link.findFirst({
    where: { shortUrl },
  })
  if (link) {
    return {
      redirect: {
        destination: link.originalUrl,
        permanent: false,
      },
    }
  }

  return {
    notFound: true,
  }
}

export default function ShortUrl() {
  return <></>
}
