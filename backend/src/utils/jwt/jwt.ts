import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";
import { Types } from "mongoose";
import { envs } from "../../config/envs/env.config";
import { RegisterType } from "../../schemas/user.schemas";

type UserPayload = {
  id: Types.ObjectId;
};

type EmailPayload = {
  email: string;
};

export const generateJWT = (payload: UserPayload) => {
  const token = jwt.sign(payload, envs.JWT_SECRET, { expiresIn: "12h" });
  return token;
};

export const generateJWTEmail = (payload: EmailPayload) => {
  const token = jwt.sign(payload, envs.JWT_SECRET, { expiresIn: "30m" });
  return token;
};

export const generateJWTRegister = (payload: RegisterType) => {
  const token = jwt.sign(payload, envs.JWT_SECRET, { expiresIn: "30m" });
  return token;
};

export const dataJwt = (token: string) => {
  try {
    const data = jwt.verify(token, envs.JWT_SECRET);
    return data;
  } catch (error) {
    throw error;
  }
};

export const dataRegisterJwt = (token: string) => {
  try {
    const data = jwt.verify(token, envs.JWT_SECRET) as RegisterType;
    return data;
  } catch (error) {
    throw error;
  }
};

export const dataEmailJwt = (token: string) => {
  try {
    const data = jwt.verify(token, envs.JWT_SECRET) as EmailPayload;
    return data;
  } catch (error) {
    throw error;
  }
};
