import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/errors/CustomError";
import { ZodError } from "zod";
import { MongooseError } from "mongoose";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";

export const errorHandler: ErrorRequestHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    return res.status(error.StatusCode).json(error.serialize());
  }

  if (error instanceof ZodError) {
    const zodErrorMessage = error.message || "Validation Error";
    const zodErrors = error.errors.length > 0 ? error.errors : [{ message: zodErrorMessage }];

    return res.status(400).json({
      status: "error",
      payload: zodErrorMessage,
      errors: zodErrors,
    });
  }

  if (error instanceof MongooseError) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "error",
        payload: "Validation error in database",
        errors: (error as any).errors,
      });
    } else if (error.name === "CastError") {
      return res.status(400).json({
        status: "error",
        payload: "Invalid data type",
        error: error,
      });
    } else {
      return res.status(500).json({
        status: "error",
        payload: error.message || "Database error occurred",
        error: error,
      });
    }
  }

  if (error instanceof NotBeforeError) {
    return res.status(403).json({
      status: "error",
      payload: error.message || "Jwt Error.",
      error: `No before Date: ${error.date}`,
    });
  } else if (error instanceof TokenExpiredError) {
    return res.status(401).json({
      status: "error",
      payload: error.message || "Jwt Error.",
      error: error,
    });
  }

  const genericErrorMessage = error.message || "Internal Server Error";

  console.log(error.stack);
  return res.status(500).json({ status: "error", payload: genericErrorMessage });
};
