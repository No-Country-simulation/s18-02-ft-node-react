import mongoose, { Document, PaginateModel, Schema, Types, PopulatedDoc } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { TimeSlot } from "../schemas/user.schemas";
import { IClass } from "./Class.model";

type UserRole = "teacher" | "student";
type ClassMode = "remoto" | "presencial";

const timeSlots = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

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
  classPrice: number | null;
  classMode: ClassMode;
  createdAt: Date;
  updatedAt: Date;
  classes: PopulatedDoc<IClass>[];
  schedulePreferences: {
    monday: TimeSlot[];
    tuesday: TimeSlot[];
    wednesday: TimeSlot[];
    thursday: TimeSlot[];
    friday: TimeSlot[];
    saturday: TimeSlot[];
    sunday: TimeSlot[];
  };
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
    classes: [
      {
        type: Types.ObjectId,
        ref: "Class",
        default: [],
      },
    ],
    classPrice: {
      type: Number,
      default: null,
    },
    classMode: {
      type: String,
      enum: ["remoto", "presencial"],
      default: "remoto",
    },
    schedulePreferences: {
      type: {
        monday: { type: [String], enum: timeSlots, default: [] },
        tuesday: { type: [String], enum: timeSlots, default: [] },
        wednesday: { type: [String], enum: timeSlots, default: [] },
        thursday: { type: [String], enum: timeSlots, default: [] },
        friday: { type: [String], enum: timeSlots, default: [] },
        saturday: { type: [String], enum: timeSlots, default: [] },
        sunday: { type: [String], enum: timeSlots, default: [] },
      },
      default: {},
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
