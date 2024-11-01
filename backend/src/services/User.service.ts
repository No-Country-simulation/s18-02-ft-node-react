import { UserRepository } from "../repositories/User.repository";
import { ClassRepository } from "../repositories/Class.repository";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { IUser } from "../models/User.model";
import { PreferencesUpdateType, UserUpdateType } from "../schemas/user.schemas";
import { DatabaseError } from "../utils/errors/DatabaseError";
import { cloudinary } from "../config/cloudinary/cloudinary";
import { UploadApiResponse } from "cloudinary";

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

export interface CloudinaryResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: Date;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder?: string;
  display_name?: string;
  access_mode: string;
  overwritten: boolean;
  original_filename: string;
  api_key: string;
}

type WeekDays = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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

  async findMyProfile(user: IUser) {
    try {
      if (!user) {
        throw new BadRequestError("El usuario no existe");
      }

      const userClasses = await this.userRepository.findClassesByUsername(user.username);

      if (user.role === "teacher") {
        const teacherProfilePayload = {
          name: user.name,
          username: user.username,
          avatar: user.avatar,
          id: user._id,
          email: user.email,
          role: user.role,
          subjects: user.subjects,
          description: user.description,
          birthday: user.birthday,
          classPrice: user.classPrice,
          classMode: user.classMode,
          schedulePreferences: user.schedulePreferences,
          classes: userClasses,
        };

        return {
          status: "success",
          message: "Se ha encontrado el profile del profesor.",
          payload: teacherProfilePayload,
        };
      }

      const studentProfilePayload = {
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        id: user._id,
        role: user.role,
        description: user.description,
        birthday: user.birthday,
        classes: userClasses,
      };

      return {
        status: "success",
        message: "Se ha encontrado el profile del estudiante",
        payload: studentProfilePayload,
      };
    } catch (error) {
      throw error;
    }
  }

  async findUserProfile(username: string) {
    try {
      const user = await this.userRepository.findOneByUsername(username);

      if (!user) {
        throw new BadRequestError("El usuario no existe");
      }

      const userClasses = await this.userRepository.findClassesByUsername(user.username);

      const filteredClasses = userClasses.map((cls) => cls.date);

      if (user.role === "teacher") {
        const teacherProfilePayload = {
          name: user.name,
          username: user.username,
          avatar: user.avatar,
          id: user._id,
          role: user.role,
          subjects: user.subjects,
          description: user.description,
          birthday: user.birthday,
          classPrice: user.classPrice,
          classMode: user.classMode,
          schedulePreferences: user.schedulePreferences,
          reservedDates: filteredClasses,
        };

        return {
          status: "success",
          message: "Se ha encontrado el profile del profesor.",
          payload: teacherProfilePayload,
        };
      }

      const studentProfilePayload = {
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        id: user._id,
        role: user.role,
        description: user.description,
        birthday: user.birthday,
      };

      return {
        status: "success",
        message: "Se ha encontrado el profile del estudiante",
        payload: studentProfilePayload,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(user: IUser, data: UserUpdateType) {
    try {
      const updatedUser = await this.userRepository.updateOneById(user._id, data);

      if (!updatedUser) {
        throw new DatabaseError();
      }

      const userClasses = await this.userRepository.findClassesByUsername(user.username);

      if (updatedUser.role === "teacher") {
        const teacherProfilePayload = {
          name: user.name,
          username: user.username,
          avatar: user.avatar,
          id: user._id,
          email: user.email,
          role: user.role,
          subjects: user.subjects,
          description: user.description,
          birthday: user.birthday,
          classPrice: user.classPrice,
          classMode: user.classMode,
          schedulePreferences: user.schedulePreferences,
          classes: userClasses,
        };

        return {
          status: "success",
          message: "Se ha actualizado el profile del profesor.",
          payload: teacherProfilePayload,
        };
      }

      const studentProfilePayload = {
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        id: user._id,
        role: user.role,
        description: user.description,
        birthday: user.birthday,
        classes: userClasses,
      };

      return {
        status: "success",
        message: "Se ha actualizado el profile del estudiante",
        payload: studentProfilePayload,
      };
    } catch (error) {
      throw error;
    }
  }

  async updatePreferences(user: IUser, data: PreferencesUpdateType) {
    try {
      const updateData = { schedulePreferences: data };

      const updatedUser = await this.userRepository.updateOneById(user._id, updateData);
      if (!updatedUser) {
        throw new DatabaseError();
      }

      return {
        status: "success",
        message: "Las preferencias han sido actualizadas correctamente.",
      };
    } catch (error) {
      throw error;
    }
  }

  async updateAvatar(user: IUser, photo: Express.Multer.File) {
    try {
      const uploadResult: CloudinaryResponse = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          {
            upload_preset: "tatrade_profile",
            public_id: `${user.email}`,
            use_filename: true,
            overwrite: true,
            transformation: [{ width: 250, height: 250, gravity: "faces", crop: "thumb" }, { radius: "max" }],
          },
          (error, result: UploadApiResponse | undefined) => {
            if (error) return reject(error);
            resolve(result as unknown as CloudinaryResponse);
          }
        );
        uploadStream.end(photo.buffer);
      });
      user.avatar = uploadResult!.url;
      await user.save();
      return { status: "success", message: "El avatar ha sido actualizado", payload: user };
    } catch (error) {
      throw error;
    }
  }
}
