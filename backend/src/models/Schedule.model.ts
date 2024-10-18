import mongoose, { Document, Schema, Types } from "mongoose";

export interface ISchedule extends Document {
  _id: Types.ObjectId;
  teacherId: Schema.Types.ObjectId;
  day: Date;
  availableHours: string[];
  createdAt: Date;
  updatedAt: Date;
  expireAt: Date;
}

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

const ScheduleSchema = new Schema<ISchedule>(
  {
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    day: {
      type: Date,
      required: true,
    },
    availableHours: {
      type: [String],
      enum: timeSlots,
      default: [],
    },
    expireAt: {
      type: Date,
      default: function () {
        return new Date(this.day.getTime() + 1 * 24 * 60 * 60 * 1000);
      },
    },
  },
  {
    timestamps: true,
  }
);

const ScheduleModel = mongoose.model<ISchedule>("Schedule", ScheduleSchema);

export default ScheduleModel;
