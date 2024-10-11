import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifiedCallback } from "passport-jwt";
import { Request } from "express";
import { envs } from "../../envs/env.config";
import UserModel from "../../../models/User.model";

type TokenPayload = {
  id: string;
};

const tokenExtractor = (req: Request): string | null => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
};

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([tokenExtractor]),
  secretOrKey: envs.JWT_SECRET,
};

const strategyJWT = new JwtStrategy(options, async (payload: TokenPayload, done: VerifiedCallback) => {
  try {
    const user = await UserModel.findById(payload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

export default strategyJWT;
