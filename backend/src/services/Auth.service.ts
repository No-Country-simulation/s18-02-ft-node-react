import { UserRepository } from "../repositories/User.repository";
import { comparePassword, hashPassword } from "../utils/bcrypt/bcrypt.config";
import { generateJWT, generateJWTRegister, generateJWTEmail, dataEmailJwt, dataRegisterJwt } from "../utils/jwt/jwt";
import { Emails } from "../controllers/Email.controller";
import { LoginType, RegisterType } from "../schemas/user.schemas";
import { AuthorizationError } from "../utils/errors/AuthorizationError";
import { AuthenticationError } from "../utils/errors/AuthenticationError";
import { BadRequestError } from "../utils/errors/BadRequestError";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async sendConfirmationEmail(registerInfo: RegisterType) {
    try {
      const userInDb = await this.userRepository.findOneByEmail(registerInfo.email);
      if (userInDb) {
        throw new AuthorizationError("El email ya esta registrado.");
      }

      registerInfo.password = await hashPassword(registerInfo.password);

      const token = generateJWTRegister(registerInfo);

      const emailParams = {
        name: registerInfo.name,
        email: registerInfo.email,
        token: token,
      };

      Emails.sendConfirmationEmail(emailParams);

      return {
        status: "success",
        message: "Se ha enviado el email de confirmación correctamente.",
      };
    } catch (error) {
      throw error;
    }
  }

  async create(token: string) {
    try {
      const user = dataRegisterJwt(token);
      const userInDb = await this.userRepository.findOneByEmail(user.email);
      if (userInDb) {
        throw new AuthorizationError("El email ya esta registrado.");
      }

      const newUser = await this.userRepository.create(user);

      const jwt = generateJWT({ id: newUser._id });

      const { password, createdAt, updatedAt, _id, ...result } = newUser;

      return {
        status: "success",
        payload: result,
        message: "El usuario ha sido registrado.",
        token: jwt,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(loginInfo: LoginType) {
    try {
      const user = await this.userRepository.findOneByEmail(loginInfo.email);

      if (!user) {
        throw new AuthenticationError("El usuario no existe.");
      }

      const isValid = await comparePassword(loginInfo.password, user.password);
      if (!isValid) {
        throw new BadRequestError("La contraseña es incorrecta");
      }
      const jwt = generateJWT({ id: user._id });

      const { password, createdAt, updatedAt, _id, ...result } = user;

      return {
        status: "success",
        payload: result,
        message: "El usuario ha iniciado sesión.",
        token: jwt,
      };
    } catch (error) {
      throw error;
    }
  }

  async sendResetPasswordEmail(email: string) {
    try {
      const user = await this.userRepository.findOneByEmail(email);
      if (!user) {
        throw new AuthorizationError("El email no esta registrado.");
      }

      const token = generateJWTEmail({ email });
      const emailParams = {
        name: user.name,
        email: user.email,
        token: token,
      };

      Emails.sendResetPasswordEmail(emailParams);

      return {
        status: "success",
        payload: "Se ha enviado el email de cambio de contraseña correctamente.",
      };
    } catch (error) {
      throw error;
    }
  }

  async resetPassword({ token, password }: { token: string; password: string }) {
    try {
      const { email } = dataEmailJwt(token);
      const hashedPassword = await hashPassword(password);
      const updatedUser = await this.userRepository.updateOneByEmail(email, { password: hashedPassword });
      return {
        status: "success",
        message: "Se ha actualizado la contraseña.",
      };
    } catch (error) {
      throw error;
    }
  }
}
