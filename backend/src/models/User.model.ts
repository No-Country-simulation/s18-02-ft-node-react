import mongoose, { Document, PaginateModel, PopulatedDoc, Schema, Types } from "mongoose";
import paginate from "mongoose-paginate-v2";

type UserRole = "teacher" | "student";
type ClassMode = "remoto" | "presencial";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;
  subjects: string[];
  description: string;
  birthday: Date;
  classPrice: number;
  classMode: ClassMode;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["teacher", "student"],
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    subjects: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    birthday: {
      type: Date,
      default: null,
    },
    classPrice: {
      type: Number,
      default: null,
    },
    classMode: {
      type: String,
      enum: ["remoto", "presencial"],
      default: "remoto",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(paginate);

interface IUserModel<T extends Document> extends PaginateModel<T> {}

const UserModel = mongoose.model<IUser>("User", UserSchema) as IUserModel<IUser>;

export default UserModel;
