import { Request, Response, NextFunction } from "express";

import { InternalServerError } from "../utils/errors/InternalServerError";
import { AuthorizationError } from "../utils/errors/AuthorizationError";
import { LoginType, RegisterType } from "../schemas/user.schemas";
import { AuthService } from "../services/Auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    const data: LoginType = req.body;

    try {
      const result = await this.authService.login(data);

      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  registerRequest = async (req: Request, res: Response, next: NextFunction) => {
    const data: RegisterType = req.body;
    try {
      const result = await this.authService.sendConfirmationEmail(data);
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  registerConfirmation = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    try {
      const result = await this.authService.create(token);
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  resetPasswordRequest = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    try {
      const result = await this.authService.sendResetPasswordEmail(email);
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  confirmPasswordRequest = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
      const result = await this.authService.resetPassword({ token, password });
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  currentSession = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    try {
      if (!user) {
        throw new AuthorizationError("No hay sesion activa.");
      }

      const userPayload = {
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        id: user._id,
        role: user.role,
      };

      res.send({
        status: "success",
        payload: userPayload,
      });
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };
}
