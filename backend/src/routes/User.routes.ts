import { Router } from "express";
import { authPassport, authRole } from "../middlewares/authorization";
import { validateBody } from "../middlewares/validations";
import { UserUpdateSchema, PreferencesUpdateSchema } from "../schemas/user.schemas";
import { UserController } from "../controllers/User.controller";
import { UserService } from "../services/User.service";
import { UserRepository } from "../repositories/User.repository";

const routerUser = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

routerUser.get("/", userController.users);
routerUser.get("/my-profile", authPassport, userController.myProfile);
routerUser.get("/user-profile", userController.userProfile);

routerUser.put("/profile", validateBody(UserUpdateSchema), authPassport, userController.updateProfile);
routerUser.put("/preferences", authPassport, authRole("teacher"), validateBody(PreferencesUpdateSchema), userController.updatePreferences);

export default routerUser;
