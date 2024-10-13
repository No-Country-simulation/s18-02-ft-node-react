import { z } from "zod";

// Esquema de validación para ObjectId (Mongoose)
const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "Debe ser un ObjectId válido.",
});

export const ScheduleSchema = z.object({
    teacherId: objectIdSchema,
    startTime: z
        .date({
            required_error: "La hora de inicio es requerida.",
            invalid_type_error: "El campo startTime debe ser una fecha válida.",
        })
        .refine(
            (startTime) => startTime > new Date(), // Validación de que la fecha de inicio no sea en el pasado
            {
                message: "La hora de inicio no puede estar en el pasado.",
            }
        ),
    endTime: z
        .date({
            required_error: "La hora de fin es requerida.",
            invalid_type_error: "El campo endTime debe ser una fecha válida.",
        })
        .refine(
            (endTime, ctx) => endTime > ctx.parent.startTime, // Validación que endTime sea mayor que startTime
            {
                message: "La hora de fin debe ser posterior a la hora de inicio.",
            }
        ),
    isBooked: z.boolean().default(false), // Por defecto false, si no se proporciona
});

// Inferir el tipo desde el esquema de zod
export type ScheduleType = z.infer<typeof ScheduleSchema>;

// Tipo para creación de un nuevo Schedule (sin isBooked)
export const CreateScheduleSchema = ScheduleSchema.omit({ isBooked: true });
export type CreateScheduleType = z.infer<typeof CreateScheduleSchema>;

// Tipo para la actualización del Schedule
export const UpdateScheduleSchema = ScheduleSchema.partial();
export type UpdateScheduleType = z.infer<typeof UpdateScheduleSchema>;