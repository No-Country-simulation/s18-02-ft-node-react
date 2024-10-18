import { UserRepository } from "../repositories/User.repository";
import { AuthorizationError } from "../utils/errors/AuthorizationError";
import { AuthenticationError } from "../utils/errors/AuthenticationError";
import { BadRequestError } from "../utils/errors/BadRequestError";
import ScheduleModel from "../models/Schedule.model";

type Query = {
  subject?: string;
  name?: string;
  page?: string;
};

type OptionsType = {
  page: number;
  limit: number;
  select: string;
};

export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly scheduleModel = ScheduleModel) {}

  async findUsers(query: Query) {
    const options: OptionsType = {
      page: parseInt(query.page as string, 10) || 1,
      limit: 10,
      select: "name username subjects avatar",
    };

    const filters: any = {};

    filters.role = "teacher";

    filters.subjects = { $ne: [] };

    if (query.subject) {
      filters.subjects = { $regex: query.subject, $options: "i" };
    }

    if (query.name) {
      filters.$or = [{ name: { $regex: query.name, $options: "i" } }, { username: { $regex: query.name, $options: "i" } }];
    }

    try {
      const currentDate = new Date();
      const twoWeeksLater = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);

      const availableTeachers = await this.scheduleModel.find({
        teacherId: { $exists: true },
        day: {
          $gte: currentDate,
          $lte: twoWeeksLater,
        },
        availableHours: { $ne: [] },
      });

      const availableTeacherIds = availableTeachers.map((schedule) => schedule.teacherId);

      if (availableTeacherIds.length > 0) {
        filters._id = { $in: availableTeacherIds };
      }

      const paginate = await this.userRepository.find(filters, options);

      return {
        status: "success",
        message: "Se han encontrado los usuarios.",
        payload: paginate,
      };
    } catch (error) {
      throw error;
    }
  }

  async findMyProfile() {
    try {
      return {
        status: "success",
        message: "Se ha enviado el email de confirmación correctamente.",
      };
    } catch (error) {
      throw error;
    }
  }

  async findUserProfile() {
    try {
      return {
        status: "success",
        message: "Se ha enviado el email de confirmación correctamente.",
      };
    } catch (error) {
      throw error;
    }
  }

  async updateProfile() {
    try {
      return {
        status: "success",
        message: "Se ha enviado el email de confirmación correctamente.",
      };
    } catch (error) {
      throw error;
    }
  }

  async updatePreferences() {
    try {
      return {
        status: "success",
        message: "Se ha enviado el email de confirmación correctamente.",
      };
    } catch (error) {
      throw error;
    }
  }
}
