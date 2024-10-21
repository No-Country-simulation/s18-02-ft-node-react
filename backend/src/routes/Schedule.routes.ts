import { Router } from "express";
import { ScheduleRepository } from "../repositories/Schedule.repository";
import { ScheduleService } from "../services/Schedule.service";
import { ScheduleController } from "../controllers/Schedule.controller";
import { validateBody } from "../middlewares/validations";
import { CreateScheduleSchema, UpdateScheduleSchema } from "../schemas/schedule.schemas";
import { authPassport } from "../middlewares/authorization";

const routerSchedule = Router();

const scheduleRepository = new ScheduleRepository();
const scheduleService = new ScheduleService(scheduleRepository);
const scheduleController = new ScheduleController(scheduleService);

// Crear un nuevo Schedule
routerSchedule.post("/", authPassport, validateBody(CreateScheduleSchema), scheduleController.create);

// Obtener un Schedule por ID
routerSchedule.get("/:id", authPassport, scheduleController.getById);

// Obtener los Schedules por ID del profesor
routerSchedule.get("/calendar/:id", authPassport, scheduleController.getSchedulesByTeacher);

// obtener un Schedule por dia
routerSchedule.get("/day/schedule/:id", authPassport, scheduleController.getSchedulesByDay);

// Actualizar un Schedule por ID
routerSchedule.put("/:id", authPassport, validateBody(UpdateScheduleSchema), scheduleController.update);

// Eliminar un Schedule por ID
routerSchedule.delete("/:id", authPassport, scheduleController.delete);

export default routerSchedule;
