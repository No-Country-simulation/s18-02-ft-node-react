import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/User.model";
import { UserRepository } from "../repositories/User.repository";
import passport from "passport";
import { AuthenticationError } from "../utils/errors/AuthenticationError";
import { AuthorizationError } from "../utils/errors/AuthorizationError";
import { InternalServerError } from "../utils/errors/InternalServerError";

const userRepository = new UserRepository();

export const authPassport = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", (error: any, user: IUser, info: any) => {
    try {
      if (error) {
        return next(new AuthenticationError("There was an error in passport."));
      }

      if (!user) {
        return next(new AuthenticationError("Failed to authenticate the user."));
      }

      req.user = user;
      return next();
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  })(req, res, next);
};

export const authRole = (roleToValidate: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return next(new AuthenticationError("Failed to authenticate the user."));
      }

      if (req.user.role !== roleToValidate) {
        return next(new AuthorizationError(`You need role: ${req.user.role}`));
      }

      return next();
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };
};
