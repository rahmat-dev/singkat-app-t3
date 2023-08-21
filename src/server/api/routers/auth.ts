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
  changePassword: publicProcedure
    .input(
      z
        .object({
          password: z.string().nonempty().min(8),
          passwordConfirmation: z.string().nonempty(),
        })
        .refine(
          ({ password, passwordConfirmation }) =>
            password === passwordConfirmation,
          {
            message: "Password confirmation doesn't match",
            path: ['passwordConfirmation'],
          },
        ),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id
      const user = await ctx.prisma.user.findUnique({
        where: { id: userId },
      })
      if (!user) {
        throw new TRPCClientError('User not found')
      }

      const salt = await genSalt()
      const hashedPassword = await hash(input.password, salt)
      await ctx.prisma.user.update({
        data: { password: hashedPassword },
        where: { id: userId },
      })
    }),
})
