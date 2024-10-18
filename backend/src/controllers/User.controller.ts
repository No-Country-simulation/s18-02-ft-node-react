import { Request, Response, NextFunction } from "express";
import { InternalServerError } from "../utils/errors/InternalServerError";
import { UserUpdateType, PreferencesUpdateType } from "../schemas/user.schemas";
import { UserService } from "../services/User.service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  myProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  userProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  users = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    try {
      const result = await this.userService.findUsers(query);

      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    const data: UserUpdateType = req.body;
    try {
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  updatePreferences = async (req: Request, res: Response, next: NextFunction) => {
    const data: PreferencesUpdateType = req.body;
    try {
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };
}
