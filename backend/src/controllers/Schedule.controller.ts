import { Request, Response, NextFunction } from "express";
import { InternalServerError } from "../utils/errors/InternalServerError";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { ScheduleService } from "../services/Schedule.service";
import { CreateScheduleType, UpdateScheduleType } from "../schemas/schedule.schemas";

export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) { }

  // Crear un nuevo Schedule
  create = async (req: Request, res: Response, next: NextFunction) => {
    const schedules: CreateScheduleType[] = req.body; // Espera una lista de horarios

    try {
      // Se usa Promise.all para crear todos los shedules de forma asincrona
      const result = await Promise.all(schedules.map(schedule => this.scheduleService.create(schedule)));
      res.status(201).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  // Obtener un Schedule por ID
  getById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const schedule = await this.scheduleService.getById(id);

      if (!schedule) {
        return next(new NotFoundError());
      }

      res.send(schedule);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  // Actualizar un Schedule
  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const data: UpdateScheduleType = req.body;

    try {
      const result = await this.scheduleService.update(id, data);

      if (!result) {
        return next(new NotFoundError());
      }

      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  // Eliminar un Schedule
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const result = await this.scheduleService.delete(id);

      if (!result) {
        return next(new NotFoundError());
      }

      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  // Obtener los Schedules por Id del profesor
  getSchedulesByTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const { teacherId } = req.params;

    try {
      const schedules = await this.scheduleService.getByTeacherId(teacherId);
      res.status(200).send(schedules);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  }

  // Obtener un Schedule por day
  getSchedulesByDay = async (req: Request, res: Response, next: NextFunction) => {
    const { day } = req.params;

    try {
      const result = await this.scheduleService.getSchedulesByDay(day);
      res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };
}
