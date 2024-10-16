import { Types } from "mongoose";
import ScheduleModel, { ISchedule } from "../models/Schedule.model";
import { CreateScheduleType, UpdateScheduleType } from "../schemas/schedule.schemas";

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

    // Búsqueda de schedules con paginación
    async find(query: Query | {}, options: OptionsType) {
        try {
            return await this.scheduleModel.paginate(query, options);
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
