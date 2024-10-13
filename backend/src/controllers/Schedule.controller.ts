import { Request, Response, NextFunction } from "express";
import { InternalServerError } from "../utils/errors/InternalServerError";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { ScheduleService } from "../services/Schedule.service";
import { CreateScheduleType, UpdateScheduleType } from "../schemas/schedule.schemas";

export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) { }

  // Crear un nuevo Schedule
  create = async (req: Request, res: Response, next: NextFunction) => {
    const data: CreateScheduleType = req.body;

    try {
      const result = await this.scheduleService.create(data);
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

      res.status(204).send(); // Status 204 No Content
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };
}
