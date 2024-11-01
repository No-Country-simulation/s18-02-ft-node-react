import { Request, Response, NextFunction } from "express";
import { InternalServerError } from "../utils/errors/InternalServerError";
import { AuthenticationError } from "../utils/errors/AuthenticationError";
import { ClassService } from "../services/Class.service";
import { ReserveClassType, BlockDateType, IdClassType, UpdateClassStatusType } from "../schemas/class.schema";
import { IUser } from "../models/User.model";
import { BadRequestError } from "../utils/errors/BadRequestError";

export class ClassController {
  constructor(private readonly classService: ClassService) {}

  // Crear una nueva clase
  reserveClass = async (req: Request, res: Response, next: NextFunction) => {
    const data: ReserveClassType = req.body;
    const user = req.user as IUser;

    try {
      if (!user) {
        return new AuthenticationError("No se a podido auntenticar al usuario");
      }

      const result = await this.classService.createClass(data, user);
      res.status(201).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
      return next(new InternalServerError());
    }
  };

  getClasses = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;

    try {
      if (!user) {
        return new AuthenticationError("No se a podido auntenticar al usuario");
      }

      const result = await this.classService.findUserClasses(user);
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
      return next(new InternalServerError());
    }
  };

  getClass = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    const id = req.query.id?.toString();

    try {
      if (!user) {
        return new AuthenticationError("No se a podido auntenticar al usuario");
      }

      if (!id) {
        return new BadRequestError("Se debe proporcionar un id Valido");
      }

      const result = await this.classService.findUserClass(user, id);
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
      return next(new InternalServerError());
    }
  };

  // Actualizar una clase
  blockDate = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    const data: BlockDateType = req.body;

    try {
      if (!user) {
        return new AuthenticationError("No se a podido auntenticar al usuario");
      }
      const result = await this.classService.createEmptyClass(data, user);

      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
      return next(new InternalServerError());
    }
  };

  updateClassStatus = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    const data: UpdateClassStatusType = req.body;

    try {
      if (!user) {
        return new AuthenticationError("No se a podido auntenticar al usuario");
      }
      const result = await this.classService.updateClassStatus(data, user);

      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
      return next(new InternalServerError());
    }
  };
}
