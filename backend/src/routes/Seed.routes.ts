import { Router } from "express";
import { SeedController } from "../controllers/Seed.controller";
import { SeedService } from "../services/Seed.service";

const routerSeed = Router();

const seedService = new SeedService();
const seedController = new SeedController(seedService);

routerSeed.post("/teachers", seedController.seedteachers);

export default routerSeed;
