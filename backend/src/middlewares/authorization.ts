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
        return next(new InternalServerError());
      }

      if (!user) {
        return next(new AuthenticationError("No se a podido identificar al usuario."));
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
        return next(new AuthenticationError("No se a podido identificar al usuario."));
      }

      if (req.user.role !== roleToValidate) {
        return next(new AuthorizationError(`Necesitas el role: ${req.user.role}`));
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
