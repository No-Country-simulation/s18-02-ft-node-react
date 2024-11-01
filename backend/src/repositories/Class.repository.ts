import { Types } from "mongoose";
import ClassModel, { IClass } from "../models/Class.model";
import { ReserveClassType, BlockDateType, IdClassType } from "../schemas/class.schema";
import { FilterQuery, QueryOptions } from "mongoose";

type OptionsType = {
  page: number;
  limit: number;
  select?: string;
  populate?: { path: string; select?: string }[];
};

type Query = {
  teacherId?: string;
  [key: string]: any;
};

type CreateClassType = {
  teacherId: string | Types.ObjectId;
  studentId: string | Types.ObjectId;
  date: Date;
  subject: string;
  status: string;
};

export class ClassRepository {
  constructor(private readonly classModel = ClassModel) {}

  // Crear una nueva clase
  async create(data: CreateClassType): Promise<IClass> {
    try {
      return await this.classModel.create(data);
    } catch (error) {
      throw error;
    }
  }

  async find(query: FilterQuery<IClass> = {}, options: QueryOptions & { select?: string } = {}) {
    try {
      const { select, ...restOptions } = options;
      const queryBuilder = this.classModel.find(query, restOptions);

      if (select) {
        queryBuilder.select(select);
      }

      return await queryBuilder;
    } catch (error) {
      throw error;
    }
  }

  // Obtener una clase por ID
  async findById(id: string | Types.ObjectId): Promise<IClass | null> {
    try {
      return await this.classModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  // Actualizar una clase por ID
  async update(id: string | Types.ObjectId, data: Partial<IClass>): Promise<IClass | null> {
    try {
      return await this.classModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // Eliminar una clase por ID
  async delete(id: string | Types.ObjectId): Promise<IClass | null> {
    try {
      return await this.classModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  // Buscar todas las clases de un profesor por su teacherId con paginación
  async findByTeacherId(teacherId: string, options: OptionsType) {
    try {
      const query = { teacherId };
      return await this.classModel.paginate(query, options);
    } catch (error) {
      throw error;
    }
  }
}
