import { Types } from "mongoose";
import ScheduleModel, { ISchedule } from "../models/Schedule.model";
import { CreateScheduleType, UpdateScheduleType } from "../schemas/schedule.schemas";

export class ScheduleRepository {
  constructor(private readonly scheduleModel = ScheduleModel) { }

  // Crear un nuevo Schedule
  async create(data: CreateScheduleType): Promise<ISchedule> {
    try {
      return await this.scheduleModel.create(data);
    } catch (error) {
      throw error;
    }
  }

  // Obtener un schedule por ID
  async findById(id: string | Types.ObjectId): Promise<ISchedule | null> {
    try {
      return await this.scheduleModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  //findByDay
  async findByDay(day: Date): Promise<ISchedule[]> {
    try {
      return await this.scheduleModel.find({ day });
    } catch (error) {
      throw error;
    }
  }

  //findByTeacherId
  async findByTeacherId(teacherId: string | Types.ObjectId): Promise<ISchedule[]> {
    try {
      // Validamos que el teacherId sea un objectId valido
      const objectId = new Types.ObjectId(teacherId);
      return await this.scheduleModel.find({ teacherId: objectId });
    } catch (error) {
      throw error;
    }
  }

  // Actualizar un schedule por ID
  async update(id: string | Types.ObjectId, data: UpdateScheduleType): Promise<ISchedule | null> {
    try {
      return await this.scheduleModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // Eliminar un schedule por ID
  async delete(id: string | Types.ObjectId): Promise<ISchedule | null> {
    try {
      return await this.scheduleModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
