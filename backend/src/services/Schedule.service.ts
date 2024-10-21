import { ScheduleRepository } from "../repositories/Schedule.repository";
import { CreateScheduleType, UpdateScheduleType } from "../schemas/schedule.schemas";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { Types } from "mongoose";

export class ScheduleService {
    constructor(private readonly scheduleRepository: ScheduleRepository) { }

    // Crear un nuevo Schedule
    async create(scheduleData: CreateScheduleType) {
        try {
            const newSchedule = await this.scheduleRepository.create(scheduleData);
            return {
                status: "success",
                payload: newSchedule,
                message: "El Schedule ha sido creado con éxito.",
            };
        } catch (error) {
            throw new BadRequestError("Error al crear el Schedule.");
        }
    }

    // Obtener un Schedule por ID
    async getById(id: string) {
        try {
            const schedule = await this.scheduleRepository.findById(id);

            if (!schedule) {
                throw new NotFoundError();
            }

            return {
                status: "success",
                payload: schedule,
            };
        } catch (error) {
            throw new NotFoundError();
        }
    }

    // Actualizar un Schedule por ID
    async update(id: string, scheduleData: UpdateScheduleType) {
        try {
            const updatedSchedule = await this.scheduleRepository.update(id, scheduleData);

            if (!updatedSchedule) {
                throw new NotFoundError();
            }

            return {
                status: "success",
                payload: updatedSchedule,
                message: "El Schedule ha sido actualizado con éxito.",
            };
        } catch (error) {
            throw new BadRequestError("Error al actualizar el Schedule.");
        }
    }

    // Eliminar un Schedule por ID
    async delete(id: string) {
        try {
            const deletedSchedule = await this.scheduleRepository.delete(id);

            if (!deletedSchedule) {
                throw new NotFoundError();
            }

            return {
                status: "success",
                message: "El Schedule ha sido eliminado con éxito.",
            };
        } catch (error) {
            throw new BadRequestError("Error al eliminar el Schedule.");
        }
    }

    // Llamar a todos los Schedules por ID del profesor
    async getByTeacherId(teacherId: string) {
        try {
            if (!Types.ObjectId.isValid(teacherId)) {
                throw new BadRequestError("ID del profesor no válido");
            };

            const schedules = await this.scheduleRepository.findByTeacherId(teacherId);

            if (!schedules || schedules.length === 0) {
                throw new NotFoundError();
            };

            return {
                status: "success",
                payload: schedules,
                message: "Horarios obtenidos con exito.",
            };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new BadRequestError("Error al obtener los horarios del profesor.");
        }
    }

    // Llamar un Schedule por Dia
    async getSchedulesByDay(day: string) {
        try {
          const parsedDay = new Date(day);
      
          if (isNaN(parsedDay.getTime())) {
            throw new BadRequestError("La fecha proporcionada no es válida.");
          }
      
          const schedules = await this.scheduleRepository.findByDay(parsedDay);
      
          if (!schedules || schedules.length === 0) {
            throw new NotFoundError();
          }
      
          return {
            status: "success",
            payload: schedules,
            message: "Horarios obtenidos con éxito.",
          };
        } catch (error) {
          if (error instanceof NotFoundError) {
            throw error;
          }
          throw new BadRequestError("Error al obtener los horarios de la fecha.");
        }
      }
      
}
