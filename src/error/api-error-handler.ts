import { Request, Response, NextFunction } from "express";
import httpsStatatus from "http-status";
import { ApiError } from "./api-error";

function apiErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  if (err instanceof ApiError) {
    return res.status(err.code).json(err.message);
  }
  return res
    .status(httpsStatatus.INTERNAL_SERVER_ERROR)
    .json("Something went wrong");
}

export { apiErrorHandler };
