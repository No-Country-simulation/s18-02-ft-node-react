import { Request, Response, NextFunction } from "express";
import { InternalServerError } from "../utils/errors/InternalServerError";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { ClassService } from "../services/Class.service";
import { CreateClassType, UpdateClassType } from "../schemas/class.schema";

export class ClassController {
    constructor(private readonly classService: ClassService) { }

    // Crear una nueva clase
    create = async (req: Request, res: Response, next: NextFunction) => {
        const data: CreateClassType = req.body;

        try {
            const result = await this.classService.create(data);
            res.status(201).send(result);
        } catch (error) {
            if (error instanceof Error) {
                return next(error);
            }
            return next(new InternalServerError());
        }
    };

    // Obtener una clase por ID
    getById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            const classItem = await this.classService.getById(id);

            if (!classItem) {
                return next(new NotFoundError());
            }

            res.send(classItem);
        } catch (error) {
            if (error instanceof Error) {
                return next(error);
            }
            return next(new InternalServerError());
        }
    };

    // Actualizar una clase
    update = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data: UpdateClassType = req.body;

        try {
            const result = await this.classService.update(id, data);

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

    // Eliminar una clase
    delete = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            const result = await this.classService.delete(id);

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

    // Obtener todas las clases de un profesor por su teacherId
    getAllByTeacherId = async (req: Request, res: Response, next: NextFunction) => {
        const { teacherId } = req.params;
        const { page, limit } = req.query;

        try {
            const classes = await this.classService.getAllByTeacherId(teacherId, { page, limit });

            if (!classes.length) {
                return next(new NotFoundError());
            }

            res.send(classes);
        } catch (error) {
            if (error instanceof Error) {
                return next(error);
            }
            return next(new InternalServerError());
        }
    };

}
