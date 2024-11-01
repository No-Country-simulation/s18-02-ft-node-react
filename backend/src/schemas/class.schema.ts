import { z } from "zod";

export const objectIdSchema = z
  .string({
    required_error: "Se debe proporcionar un id.",
  })
  .regex(/^[0-9a-fA-F]{24}$/, {
    message: "Debe ser un ObjectId válido.",
  });

export const ReserveClassSchema = z.object({
  teacherId: objectIdSchema,
  date: z.date({
    required_error: "El campo date es requerido.",
    invalid_type_error: "El campo date debe tener un formato valido.",
  }),
  subject: z.string({
    required_error: "El campo subject es requerido.",
    invalid_type_error: "El campo subject debe ser tipo de dato string",
  }),
});

export type ReserveClassType = z.infer<typeof ReserveClassSchema>;

export const BlockDateSchema = z.object({
  date: z.date({
    required_error: "El campo date es requerido.",
    invalid_type_error: "El campo date debe tener un formato valido.",
  }),
});

export type BlockDateType = z.infer<typeof BlockDateSchema>;

export const IdClassSchema = z.object({
  id: objectIdSchema,
});

export type IdClassType = z.infer<typeof IdClassSchema>;

export const UpdateClassStatusSchema = z.object({
  id: objectIdSchema,
  status: z.enum(["accepted", "cancelled"]),
});

export type UpdateClassStatusType = z.infer<typeof UpdateClassStatusSchema>;
