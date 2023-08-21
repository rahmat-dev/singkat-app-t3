import { TRPCClientError } from '@trpc/client'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { generateRandomString } from '~/utils/generator'

export const linkRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id
    const links = await ctx.prisma.link.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return links
  }),
  create: protectedProcedure
    .input(
      z.object({
        originalUrl: z.string().min(1).url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id
      const newLink = await ctx.prisma.link.create({
        data: {
          originalUrl: input.originalUrl,
          shortUrl: generateRandomString(8),
          userId,
        },
      })

      return newLink
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        shortUrl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id
      const { id, shortUrl } = input
      const link = await ctx.prisma.link.findFirst({
        where: { shortUrl },
      })
      if (link && link.id !== id) {
        throw new TRPCClientError('Update failed, short url is already in use')
      }
      if (link && link.userId !== userId) {
        throw new TRPCClientError("You don't have an access to the link")
      }

      await ctx.prisma.link.update({
        where: { id },
        data: { shortUrl },
      })
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id
      const { id } = input
      await ctx.prisma.link.delete({
        where: { id, userId },
      })
    }),
})
