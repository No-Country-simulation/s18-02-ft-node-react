import { Router } from "express";
import { ClassRepository } from "../repositories/Class.repository";
import { ClassService } from "../services/Class.service";
import { ClassController } from "../controllers/Class.controller";
import { validateBody } from "../middlewares/validations";
import { CreateClassSchema, UpdateClassSchema } from "../schemas/class.schema";
import { authPassport } from "../middlewares/authorization";

const routerClass = Router();

const classRepository = new ClassRepository();
const classService = new ClassService(classRepository);
const classController = new ClassController(classService);

// Crear una nueva clase
routerClass.post("/", authPassport, validateBody(CreateClassSchema), classController.create);

// Obtener una clase por ID
routerClass.get("/:id", authPassport, classController.getById);

// Actualizar una clase por ID
routerClass.put("/:id", authPassport, validateBody(UpdateClassSchema), classController.update);

// Eliminar una clase por ID
routerClass.delete("/:id", authPassport, classController.delete);

// Obtener todas las clases de un profesor por su teacherId
routerClass.get("/teacher/:teacherId", authPassport, classController.getAllByTeacherId);

export default routerClass;
