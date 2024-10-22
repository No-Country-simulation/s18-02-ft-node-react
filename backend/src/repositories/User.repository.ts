import { Types } from "mongoose";
import UserModel, { IUser } from "../models/User.model";
import { RegisterType, UserUpdateType } from "../schemas/user.schemas";
import { IClass } from "../models/Class.model";

type OptionsType = {
  page: number;
  limit: number;
  select: string;
};

type Query = {
  subject?: string;
  name?: string;
};

export class UserRepository {
  constructor(private readonly userModel = UserModel) {}

  async create(data: RegisterType): Promise<IUser> {
    try {
      return await this.userModel.create(data);
    } catch (error) {
      throw error;
    }
  }

  async find(filters: any | {}, options: OptionsType) {
    try {
      return await this.userModel.paginate(filters, options);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string | Types.ObjectId): Promise<IUser | null> {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<IUser | null> {
    try {
      return await this.userModel.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  async findOneByUsername(username: string): Promise<IUser | null> {
    try {
      return await this.userModel.findOne({ username });
    } catch (error) {
      throw error;
    }
  }

  async findClassesByUsername(username: string): Promise<IClass[]> {
    const userWithClasses = await this.userModel
      .findOne({ username })
      .select("classes")
      .populate("classes") // Esto debería poblar las clases con IClass[]
      .exec();

    if (userWithClasses && userWithClasses.classes) {
      // Asegúrate de que el tipo de classes sea IClass[]
      return userWithClasses.classes as IClass[]; // Aquí es donde se hace la conversión
    }

    return []; // Regresar un array vacío si no se encuentra el usuario
  }

  async updateOneById(id: string | Types.ObjectId, data: Partial<IUser>): Promise<IUser | null> {
    try {
      return await this.userModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async updateOneByEmail(email: string | Types.ObjectId, data: Partial<IUser>): Promise<IUser | null> {
    try {
      return await this.userModel.findOneAndUpdate({ email }, data, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async deleteUserById(id: string | Types.ObjectId): Promise<IUser | null> {
    try {
      return await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteuserByEmail(email: string | Types.ObjectId): Promise<IUser | null> {
    try {
      return await this.userModel.findOneAndDelete({ email });
    } catch (error) {
      throw error;
    }
  }
}
