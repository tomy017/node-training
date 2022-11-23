import { RequestHandler, Request, Response, NextFunction } from "express";
import { ApiError } from "../error/api-error";

function validateDto(schema): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.validate(req.body);
      req.body = validatedBody;
      next();
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  };
}

export { validateDto };
