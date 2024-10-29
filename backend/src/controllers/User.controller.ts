import { Request, Response, NextFunction } from "express";
import { InternalServerError } from "../utils/errors/InternalServerError";
import { AuthenticationError } from "../utils/errors/AuthenticationError";
import { UserUpdateType, PreferencesUpdateType } from "../schemas/user.schemas";
import { UserService } from "../services/User.service";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { IUser } from "../models/User.model";

export class UserController {
  constructor(private readonly userService: UserService) {}

  myProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;

    try {
      if (!user) {
        return new AuthenticationError("No se a podido auntenticar al usuario");
      }

      const result = await this.userService.findMyProfile(user);

      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  userProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;

    try {
      if (!username) {
        throw new BadRequestError("No se a proporcionado un username");
      }
      const result = await this.userService.findUserProfile(username);

      res.send(result);
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
    const user = req.user as IUser;
    try {
      if (!user) {
        return new AuthenticationError("No se a podido auntenticar al usuario");
      }

      const result = await this.userService.updateProfile(user, data);

      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  updatePreferences = async (req: Request, res: Response, next: NextFunction) => {
    const data: PreferencesUpdateType = req.body;
    const user = req.user as IUser;
    try {
      if (!user) {
        return new AuthenticationError("No se a podido auntenticar al usuario");
      }
      const result = await this.userService.updatePreferences(user, data);

      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;
    const user = req.user as IUser;
    try {
      if (!user) {
        return new AuthenticationError("No se a podido auntenticar al usuario");
      }

      if (!file) {
        return new BadRequestError("No se ha proporcionado una imagen valida.");
      }
      const result = await this.userService.updateAvatar(user, file);

      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };
}
