import passport from "passport";
import strategyJWT from "./strategies/jwt.strategy";

// import UserModel, { IUser } from "../../models/User.model";
// import { UserRepository } from "../../repositories/User.repository";

// const userRepo = new UserRepository();
// declare global {
//   namespace Express {
//     interface User extends IUser {}
//   }
// }

export const initializePassport = () => {
  passport.use("jwt", strategyJWT);

  passport.serializeUser((user: any, done: (err: any, id?: string) => void) => {
    done(null, user.id.toString());
  });

  passport.deserializeUser(
    async (id: string, done: (err: any, user?: any | null) => void) => {
      try {
        // const user = await UserModel.findById(id)
        // done(null, user);
      } catch (err) {
        done(err);
      }
    }
  );
};
