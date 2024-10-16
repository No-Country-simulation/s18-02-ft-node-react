import { z } from "zod";

// Esquema de validación para ObjectId (Mongoose)
const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "Debe ser un ObjectId válido.",
});

// Esquema para validar una clase (Class)
export const ClassSchema = z.object({
    teacherId: objectIdSchema,
    scheduleId: objectIdSchema,
    studentId: objectIdSchema,
    startTime: z
        .date({
            required_error: "La hora de inicio es requerida.",
            invalid_type_error: "El campo startTime debe ser una fecha válida.",
        })
        .refine((startTime) => startTime > new Date(), // Validación de que la fecha de inicio no sea en el pasado 
            {
                message: "La hora de inicio no puede estar en el pasado.",
            }),
    endTime: z
        .date({
            required_error: "La hora de fin es requerida.",
            invalid_type_error: "El campo endTime debe ser una fecha válida.",
        })
        .refine((endTime, ctx) => endTime > ctx.parent.startTime, // Validación que endTime sea mayor que startTime 
            {
                message: "La hora de fin debe ser posterior a la hora de inicio.",
            }),
    isPaid: z.boolean().default(false), // Por defecto false, hasta que se page la clase
    isCompleted: z.boolean().default(false), // Por defecto false, hasta estar completa
    status: z.enum(["pending", "accepted"]).default("pending"), // Por defecto pending, hasta estar aceptada
});

// Inferir el tipo desde el esquema de zod
export type ClassType = z.infer<typeof ClassSchema>;

// Esquema para la creación de una nueva clase (sin `isCompleted` y `isPaid`)
export const CreateClassSchema = ClassSchema.omit({ isCompleted: true, isPaid: true });
export type CreateClassType = z.infer<typeof CreateClassSchema>;

// Esquema para la actualización de una clase
export const UpdateClassSchema = ClassSchema.partial();
export type UpdateClassType = z.infer<typeof UpdateClassSchema>;
