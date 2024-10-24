import { ClassRepository } from "../repositories/Class.repository";
import { ReserveClassType, BlockDateType, IdClassType, UpdateClassStatusType } from "../schemas/class.schema";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { IUser } from "../models/User.model";
import { UserRepository } from "../repositories/User.repository";
import { AuthorizationError } from "../utils/errors/AuthorizationError";

export class ClassService {
  constructor(private readonly classRepository: ClassRepository, private readonly userRepository: UserRepository) {}

  async createClass(classData: ReserveClassType, user: IUser) {
    try {
      const teacher = await this.userRepository.findOneById(classData.teacherId);

      if (!teacher || teacher.role !== "teacher") {
        throw new BadRequestError("El profesor no existe");
      }

      if (!teacher.subjects.includes(classData.subject)) {
        throw new BadRequestError("El profesor no dicta esa materia.");
      }

      const newClassData = {
        date: classData.date,
        teacherId: classData.teacherId,
        studentId: user._id,
        subject: classData.subject,
        status: "pending",
      };

      const newClass = await this.classRepository.create(newClassData);

      return {
        status: "success",
        payload: newClass,
        message: "La clase ha sido creada con éxito.",
      };
    } catch (error) {
      throw error;
    }
  }

  async findUserClasses(user: IUser) {
    try {
      if (user.role === "teacher") {
        const classes = await this.classRepository.find({ teacherId: user._id, status: { $ne: "cancelled" } });
        return {
          status: "success",
          message: "Se han encontrado todas las classes del profesor.",
          payload: classes,
        };
      }
      const classes = await this.classRepository.find({ studentId: user._id, status: { $ne: "cancelled" } });
      return {
        status: "success",
        message: "Se han encontrado todas las clases del estudiante.",
        payload: classes,
      };
    } catch (error) {
      throw new NotFoundError();
    }
  }

  async findUserClass(user: IUser, id: string) {
    try {
      const classInDb = await this.classRepository.findById(id);

      if (!classInDb) {
        throw new BadRequestError("La clase no existe.");
      }

      if (!user.id.equals(classInDb.teacherId) && !user.id.equals(classInDb.studentId)) {
        throw new AuthorizationError("No tienes permisos para acceder a esta clase.");
      }

      return {
        status: "success",
        message: "Se han encontrado todas las clases del estudiante.",
        payload: classInDb,
      };
    } catch (error) {
      throw new NotFoundError();
    }
  }

  async createEmptyClass(data: BlockDateType, user: IUser) {
    try {
      const newClassData = {
        date: data.date,
        teacherId: user._id,
        studentId: user._id,
        subject: "",
        status: "cancelled",
      };

      const newClass = await this.classRepository.create(newClassData);

      return {
        status: "success",
        message: "La fecha ha sido bloqueada con exito.",
      };
    } catch (error) {
      throw new BadRequestError("Error al actualizar la clase.");
    }
  }

  async updateClassStatus(data: UpdateClassStatusType, user: IUser) {
    try {
      const updatedClass = this.classRepository.update(data.id, { status: data.status });

      return {
        status: "success",
        message: "El status de la clase ha sido actualizado",
        payload: updatedClass,
      };
    } catch (error) {
      throw new BadRequestError("Error al actualizar la clase.");
    }
  }
}
