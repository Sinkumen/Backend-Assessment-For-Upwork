/* eslint-disable no-void */
import { Request, Response, NextFunction } from "express";
import {
  UniqueConstraintError,
  ValidationError,
  ConnectionError,
} from "sequelize";
import ErrorResponse from "../utils/error-response.utils";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;

  if (err instanceof ErrorResponse) {
    error = err;
  } else {
    error = new ErrorResponse(
      err?.message || "An unexpected error occurred. Please try again later",
      500
    );
  }

  if (err instanceof UniqueConstraintError) {
    error = new ErrorResponse(err.errors[0].message, 400);
  } else if (err instanceof ValidationError) {
    error = new ErrorResponse(err.message, 400);
  } else if (err instanceof ConnectionError) {
    error = new ErrorResponse(
      "Failed to connect to database. Please try again later.",
      500
    );
    console.error(`Database Connection Error:`, err);
  }

  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error";
  const stackTrace = err.stack || "";

  if (statusCode === 500) {
    const errorDetails = {
      message: errorMessage,
      url: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
      stack: stackTrace,
    };
  }

  res.status(statusCode).json({ success: false, message: errorMessage });
};

const urlNotFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new ErrorResponse(`URL ${req.originalUrl} not found 🤷‍♂️`, 404);
  return next(new ErrorResponse(error.message, error.statusCode));
};

export { errorHandler, urlNotFound };
