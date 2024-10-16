import { ClassRepository } from "../repositories/Class.repository";
import { CreateClassType, UpdateClassType } from "../schemas/class.schema";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { BadRequestError } from "../utils/errors/BadRequestError";

export class ClassService {
    constructor(private readonly classRepository: ClassRepository) { }

    // Crear una nueva clase
    async create(classData: CreateClassType) {
        try {
            const newClass = await this.classRepository.create(classData);
            return {
                status: "success",
                payload: newClass,
                message: "La clase ha sido creada con éxito.",
            };
        } catch (error) {
            throw new BadRequestError("Error al crear la clase.");
        }
    }

    // Obtener una clase por ID
    async getById(id: string) {
        try {
            const classItem = await this.classRepository.findById(id);

            if (!classItem) {
                throw new NotFoundError();
            }

            return {
                status: "success",
                payload: classItem,
            };
        } catch (error) {
            throw new NotFoundError();
        }
    }

    // Actualizar una clase por ID
    async update(id: string, classData: UpdateClassType) {
        try {
            const updatedClass = await this.classRepository.update(id, classData);

            if (!updatedClass) {
                throw new NotFoundError();
            }

            return {
                status: "success",
                payload: updatedClass,
                message: "La clase ha sido actualizada con éxito.",
            };
        } catch (error) {
            throw new BadRequestError("Error al actualizar la clase.");
        }
    }

    // Eliminar una clase por ID
    async delete(id: string) {
        try {
            const deletedClass = await this.classRepository.delete(id);

            if (!deletedClass) {
                throw new NotFoundError();
            }

            return {
                status: "success",
                message: "La clase ha sido eliminada con éxito.",
            };
        } catch (error) {
            throw new BadRequestError("Error al eliminar la clase.");
        }
    }

    // Obtener todas las clases de un profesor por su teacherId, con paginación
    async getAllByTeacherId(teacherId: string, { page = 1, limit = 10 }: { page?: number; limit?: number }) {
        try {
            const classes = await this.classRepository.findByTeacherId(teacherId, { page, limit });

            if (!classes.length) {
                throw new NotFoundError();
            }

            return {
                status: "success",
                payload: classes,
            };
        } catch (error) {
            throw new BadRequestError("Error al obtener las clases del profesor.");
        }
    }
}
