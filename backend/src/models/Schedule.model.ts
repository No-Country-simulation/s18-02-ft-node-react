import mongoose, {
  Document,
  PaginateModel,
  Schema,
  Types,
} from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface ISchedule extends Document {
  _id: Types.ObjectId;
  teacherId: Types.ObjectId;
  startTime: Date;
  endTime: Date;
  isBooked: Boolean;
}

const ScheduleSchema = new Schema<ISchedule>(
  {
    teacherId: {
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
    isBooked: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ScheduleSchema.plugin(paginate);

interface IScheduleModel<T extends Document> extends PaginateModel<T> { }

const ScheduleModel = mongoose.model<ISchedule>(
  "Schedule",
  ScheduleSchema
) as IScheduleModel<ISchedule>;

export default ScheduleModel;
