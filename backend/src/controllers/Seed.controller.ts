import { Request, Response, NextFunction } from "express";
import { SeedService } from "../services/Seed.service";
import { InternalServerError } from "../utils/errors/InternalServerError";

export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  seedteachers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.seedService.createUsers();

      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };
}
