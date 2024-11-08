import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { errorHandler } from "../middlewares/errorHandler";
import routerAuth from "./Auth.routes";
import routerClass from "./Class.routes";
import routerUser from "./User.routes";
import routerSeed from "./Seed.routes";

const router = Router();

//ACA VAN TODAS LAS RUTAS
router.use("/api/user", routerUser);
router.use("/api/auth", routerAuth);
router.use("/api/class", routerClass);
router.use("/api/seed", routerSeed);

//404
router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});

//Manejo de Errores
router.use(errorHandler);

export default router;
