import mongoose, {
  Document,
  PaginateModel,
  Schema,
  Types,
} from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface IClass extends Document {
  _id: Types.ObjectId;
  teacherId: Types.ObjectId;
  scheduleId: Types.ObjectId;
  studentId: Types.ObjectId;
  startTime: Date;
  endTime: Date;
  subject: String;
  isPaid: Boolean;
  isCompleted: Boolean;
  status: String;
}

const ClassSchema = new Schema<IClass>(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    scheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ClassSchema.plugin(paginate);

interface IClassModel<T extends Document> extends PaginateModel<T> { }

const ClassModel = mongoose.model<IClass>(
  "Class",
  ClassSchema
) as IClassModel<IClass>;

export default ClassModel;
