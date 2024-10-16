import { z } from "zod";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: "Debe ser un ObjectId válido.",
});

const baseScheduleSchema = z.object({
  teacherId: objectIdSchema,
  startTime: z.date({
    required_error: "La hora de inicio es requerida.",
    invalid_type_error: "El campo startTime debe ser una fecha válida.",
  }),
  endTime: z.date({
    required_error: "La hora de fin es requerida.",
    invalid_type_error: "El campo endTime debe ser una fecha válida.",
  }),
  isBooked: z.boolean().default(false),
});

const applyRefinements = (schema: z.ZodObject<any>) =>
  schema
    .refine((data) => data.endTime > data.startTime, {
      path: ["endTime"],
      message: "La hora de fin debe ser posterior a la hora de inicio.",
    })
    .refine((data) => data.startTime > new Date(), {
      path: ["startTime"],
      message: "La hora de inicio no puede estar en el pasado.",
    });

export const ScheduleSchema = applyRefinements(baseScheduleSchema);
export type ScheduleType = z.infer<typeof ScheduleSchema>;

export const CreateScheduleSchema = applyRefinements(baseScheduleSchema.omit({ isBooked: true }));
export type CreateScheduleType = z.infer<typeof CreateScheduleSchema>;

export const UpdateScheduleSchema = applyRefinements(baseScheduleSchema.partial());
export type UpdateScheduleType = z.infer<typeof UpdateScheduleSchema>;
