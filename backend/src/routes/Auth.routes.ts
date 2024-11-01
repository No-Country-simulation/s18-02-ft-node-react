import { Router } from "express";
import { UserRepository } from "../repositories/User.repository";
import { AuthService } from "../services/Auth.service";
import { AuthController } from "../controllers/Auth.controller";
import { validateBody } from "../middlewares/validations";
import { LoginSchema, ResetPasswordSchema, UserEmailSchema } from "../schemas/user.schemas";
import { RegisterSchema } from "../schemas/user.schemas";
import { authPassport } from "../middlewares/authorization";

const routerAuth = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

routerAuth.get("/current", authPassport, authController.currentSession);
routerAuth.post("/login", validateBody(LoginSchema), authController.login);

routerAuth.post("/register", validateBody(RegisterSchema), authController.registerRequest);
routerAuth.post("/confirm-email/:token", authController.registerConfirmation);

routerAuth.post("/reset-password", validateBody(UserEmailSchema), authController.resetPasswordRequest);
routerAuth.put("/reset-password/:token", validateBody(ResetPasswordSchema), authController.confirmPasswordRequest);

export default routerAuth;
