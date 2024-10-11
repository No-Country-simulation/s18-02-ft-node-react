import { Types } from "mongoose";
import UserModel, { IUser } from "../models/User.model";
import { RegisterType } from "../schemas/user.schemas";

type OptionsType = {
  page: number;
  limit: number;
  select?: string;
  populate?: { path: string; select?: string }[];
};

type Query = {
  subject?: string;
  [key: string]: any;
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

  async find(query: Query | {}, options: OptionsType) {
    try {
      return await this.userModel.paginate(query, options);
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

  async findOneByEmail(email: string | Types.ObjectId): Promise<IUser | null> {
    try {
      return await this.userModel.findOne({ email }).select("-password");
    } catch (error) {
      throw error;
    }
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
