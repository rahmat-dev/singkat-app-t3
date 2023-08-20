import { TRPCClientError } from '@trpc/client'
import { genSalt, hash } from 'bcrypt'
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({
        name: z.string().nonempty(),
        email: z.string().nonempty().email(),
        password: z.string().nonempty().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      })
      if (user) {
        throw new TRPCClientError('Email has been registered')
      }

      const salt = await genSalt()
      const hashedPassword = await hash(input.password, salt)
      const newUser = await ctx.prisma.user.create({
        data: { ...input, password: hashedPassword },
      })
      return newUser
    }),
})
