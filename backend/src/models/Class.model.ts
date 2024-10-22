import mongoose, { Document, PaginateModel, Schema, Types } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface IClass extends Document {
  _id: Types.ObjectId;
  teacherId: Types.ObjectId;
  studentId: Types.ObjectId;
  date: Date;
  endTime: Date;
  subject: String;
  isPaid: Boolean;
  status: String;
}

const ClassSchema = new Schema<IClass>(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "cancelled"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ClassSchema.plugin(paginate);

interface IClassModel<T extends Document> extends PaginateModel<T> {}

const ClassModel = mongoose.model<IClass>("Class", ClassSchema) as IClassModel<IClass>;

export default ClassModel;
