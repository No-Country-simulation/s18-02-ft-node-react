import { z } from 'zod'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&/])/

export const loginSchema = z.object({
  email: z.string().email('Formato de email no válido.'),
  password: z.string()
    .min(8, 'La contraseña tiene menos de 8 caracteres.')
    .max(40, 'La contraseña supera los 40 caracteres.')
    .regex(passwordRegex, {
      message: 'La contraseña debe contener una mayuscula, un numero y uno de los caracteres especiales (@, $, !, %, *, ?, &, /).'
    })
})

export type LoginSchema = z.infer<typeof loginSchema>

const usernameRegex = /^[a-zA-Z0-9._]/
export const registerSchema = z.object({
  ...loginSchema.shape,
  name: z.string()
    .min(8, 'El nombre debe contener al menos 8 caracteres')
    .max(40, 'El nombre debe de contener un maximo de 40.'),
  username: z.string()
    .min(3, 'El username debe contener al menos 3 caracteres')
    .max(16, 'El username no debe contener más de 16 caracteres ')
    .regex(usernameRegex, 'El username solo puede contener letras, números, guiones bajos y puntos'),
  repeatedPassword: z.string().min(8)
})

export const registerFormSchema = registerSchema.refine(data => data.password === data.repeatedPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['repeatedPassword']
})

export type RegisterSchema = z.infer<typeof registerSchema>

export const updateStudentSchema = z.object({

})
