import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&(),.?":{}|<>])[A-Za-z\d!@#$%^&(),.?":{}|<>]+$/;

export const RegisterSchema = z
  .object({
    name: z
      .string({
        required_error: "El nombre es requerido.",
        invalid_type_error: "El nombre debe ser tipo de dato string",
      })
      .min(3, { message: "El nombre debe contener 2 caracteres mínimo." })
      .max(50, { message: "El nombre debe contener 50 caracteres máximo." }),
    username: z
      .string({
        required_error: "El username es requerido.",
        invalid_type_error: "El username debe ser tipo de dato string",
      })
      .min(3, { message: "El username debe contener 2 caracteres mínimo." })
      .max(15, { message: "El username debe contener 15 caracteres máximo." }),
    email: z
      .string({
        required_error: "El email es requerido.",
        invalid_type_error: "El email debe ser tipo de dato string.",
      })
      .email({ message: "Formato de email no válido." }),
    password: z
      .string({
        required_error: "La contraseña es requerida.",
        invalid_type_error: "La contraseña debe ser tipo de dato string.",
      })
      .min(8, { message: "La contraseña debe contener 8 caracteres minimo." })
      .regex(passwordRegex, {
        message: "La contraseña debe contener una mayuscula, un numero y un caracter especial.",
      }),
    repassword: z.string(),
    role: z.enum(["teacher", "student"], {
      required_error: "El rol es requerido.",
      invalid_type_error: "El rol debe ser 'teacher' o 'student'.",
    }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Las contraseñas no coinciden",
    path: ["repassword"],
  });

export type RegisterType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
      invalid_type_error: "El email debe ser tipo de dato string",
    })
    .email({ message: "Formato de email no válido." }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
      invalid_type_error: "La contraseña debe ser tipo de dato string.",
    })
    .min(8, { message: "La contraseña debe contener 8 caracteres minimo" })
    .regex(passwordRegex, {
      message: "La contraseña debe contener una mayuscula, un numero y un caracter especial",
    }),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const UserUpdateSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido.",
      invalid_type_error: "El nombre debe ser tipo de dato string",
    })
    .min(3, { message: "El nombre debe contener 2 caracteres mínimo." })
    .max(50, { message: "El nombre debe contener 50 caracteres máximo." }),
  username: z
    .string({
      required_error: "El username es requerido.",
      invalid_type_error: "El username debe ser tipo de dato string",
    })
    .min(3, { message: "El username debe contener 2 caracteres mínimo." })
    .max(15, { message: "El username debe contener 15 caracteres máximo." }),
  description: z
    .string({
      invalid_type_error: "La descripción debe ser tipo de dato string.",
    })
    .max(500, { message: "La descripción debe contener 500 caracteres máximo." })
    .default(""),
  birthdate: z
    .date({
      invalid_type_error: "El campo debe ser una fecha válida.",
    })
    .refine((date) => date <= new Date(), {
      message: "La fecha de nacimiento no puede ser en el futuro.",
    })
    .nullable()
    .default(null),
  subjects: z
    .array(z.string(), {
      invalid_type_error: "El campo subjects debe ser un array de strings o vacío.",
    })
    .default([]),
  classMode: z
    .enum(["remoto", "presencial"], {
      invalid_type_error: "El rol debe ser 'teacher' o 'student'.",
    })
    .default("remoto"),
  classPrice: z
    .number({
      invalid_type_error: "El precio de las clases debe ser tipo de dato number.",
    })
    .nullable()
    .default(null),
});

export type UserUpdateType = z.infer<typeof UserUpdateSchema>;

export const ResetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: "La contraseña es requerida.",
        invalid_type_error: "La contraseña debe ser tipo de dato string.",
      })
      .min(8, { message: "La contraseña debe contener 8 caracteres minimo." })
      .regex(passwordRegex, {
        message: "La contraseña debe contener una mayuscula, un numero y un caracter especial.",
      }),
    repassword: z.string(),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Las contraseñas no coinciden",
    path: ["repassword"],
  });

export const UserEmailSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
      invalid_type_error: "Tipo de dato string",
    })
    .email({ message: "Email no valido" }),
});

const TimeSlots = z.enum(["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]);

export const PreferencesUpdateSchema = z.object({
  monday: z.array(TimeSlots).default([]),
  tuesday: z.array(TimeSlots).default([]),
  wednesday: z.array(TimeSlots).default([]),
  thursday: z.array(TimeSlots).default([]),
  friday: z.array(TimeSlots).default([]),
  saturday: z.array(TimeSlots).default([]),
  sunday: z.array(TimeSlots).default([]),
});

export type PreferencesUpdateType = z.infer<typeof PreferencesUpdateSchema>;
