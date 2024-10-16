import { IUser } from "../models/User.model";

declare namespace Express {
  interface Request {
    user?: IUser;
  }
}
