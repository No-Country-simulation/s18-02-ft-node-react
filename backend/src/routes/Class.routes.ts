import { Router } from "express";
import { ClassRepository } from "../repositories/Class.repository";
import { ClassService } from "../services/Class.service";
import { ClassController } from "../controllers/Class.controller";
import { validateBody } from "../middlewares/validations";
import { ReserveClassSchema, BlockDateSchema, UpdateClassStatusSchema } from "../schemas/class.schema";
import { authPassport, authRole } from "../middlewares/authorization";
import { UserRepository } from "../repositories/User.repository";

const routerClass = Router();

const classRepository = new ClassRepository();
const userRepository = new UserRepository();
const classService = new ClassService(classRepository, userRepository);
const classController = new ClassController(classService);

routerClass.get("/", authPassport, classController.getClasses);
routerClass.get("/:id", authPassport, classController.getClass);
routerClass.post("/", authPassport, authRole("student"), validateBody(ReserveClassSchema), classController.reserveClass);
routerClass.put("/block", authPassport, authRole("teacher"), validateBody(BlockDateSchema), classController.blockDate);
routerClass.put("/status", authPassport, validateBody(UpdateClassStatusSchema), classController.updateClassStatus);

export default routerClass;
