import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { errorHandler } from "../middlewares/errorHandler";
import routerAuth from "./Auth.routes";
import routerSchedule from "./Schedule.routes";
import routerClass from "./Class.routes";
import routerUser from "./User.routes";

const router = Router();

//ACA VAN TODAS LAS RUTAS
router.use("/api/user", routerUser);
router.use("/api/auth", routerAuth);
router.use("/api/schedule", routerSchedule);
router.use("/api/class", routerClass);

//404
router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});

//Manejo de Errores
router.use(errorHandler);

export default router;
