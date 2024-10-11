import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  name: z.string().min(8),
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8),
  repeatPassword: z.string().min(8)
}).refine(data => data.password === data.repeatPassword, {
  message: 'Las constrase;as no coinciden',
  path: ['repeatPassword']
})

export type RegisterSchema = z.infer<typeof registerSchema>
