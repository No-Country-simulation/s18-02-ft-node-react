import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { errorHandler } from "../middlewares/errorHandler";

const router = Router();

//ACA VAN TODAS LAS RUTAS

//404
router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});

//Manejo de Errores
router.use(errorHandler);

export default router;
