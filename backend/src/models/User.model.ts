import mongoose, {
  Document,
  PaginateModel,
  PopulatedDoc,
  Schema,
  Types,
} from "mongoose";
import paginate from "mongoose-paginate-v2";

type UserRole = "TEACHER" | "STUDENT";

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
  createdAt: Date;
  updatedAt: Date;
  classes: PopulatedDoc<Types.ObjectId & Document>[];
  schedules: PopulatedDoc<Types.ObjectId & Document>[];
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
      enum: ["TEACHER", "STUDENT"],
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
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
        default: [],
      },
    ],
    schedules: [
      {
        type: Schema.Types.ObjectId,
        ref: "Schedule",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(paginate);

interface IUserModel<T extends Document> extends PaginateModel<T> {}

const UserModel = mongoose.model<IUser>(
  "User",
  UserSchema
) as IUserModel<IUser>;

export default UserModel;
