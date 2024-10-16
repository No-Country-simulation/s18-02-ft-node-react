import { z } from "zod";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: "Debe ser un ObjectId válido.",
});

const baseClassSchema = z.object({
  teacherId: objectIdSchema,
  scheduleId: objectIdSchema,
  studentId: objectIdSchema,
  startTime: z.date({
    required_error: "La hora de inicio es requerida.",
    invalid_type_error: "El campo startTime debe ser una fecha válida.",
  }),
  endTime: z.date({
    required_error: "La hora de fin es requerida.",
    invalid_type_error: "El campo endTime debe ser una fecha válida.",
  }),
  isPaid: z.boolean().default(false),
  isCompleted: z.boolean().default(false),
  status: z.enum(["pending", "accepted"]).default("pending"),
});

const applyRefinements = (schema: z.ZodObject<any>) => {
  return schema
    .refine((data) => data.endTime > data.startTime, {
      path: ["endTime"],
      message: "La hora de fin debe ser posterior a la hora de inicio.",
    })
    .refine((data) => data.startTime > new Date(), {
      path: ["startTime"],
      message: "La hora de inicio no puede estar en el pasado.",
    });
};

export const ClassSchema = applyRefinements(baseClassSchema);
export type ClassType = z.infer<typeof ClassSchema>;

export const CreateClassSchema = applyRefinements(baseClassSchema.omit({ isCompleted: true, isPaid: true }));
export type CreateClassType = z.infer<typeof CreateClassSchema>;

export const UpdateClassSchema = applyRefinements(baseClassSchema.partial());
export type UpdateClassType = z.infer<typeof UpdateClassSchema>;
