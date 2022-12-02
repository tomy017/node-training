import express from "express";
import { Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/user-controller";
import { validateDto } from "../middlewares/validate-dto";
import signupDTO from "../dtos/signup-dto";
import loginDTO from "../dtos/login-dto";
import { nextTick } from "process";

const userRouter = express.Router();
const controller = new UserController();

userRouter.post(
  "/signup",
  validateDto(signupDTO),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.signup(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  "/login",
  validateDto(loginDTO),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.login(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get("/users", async (req: Request, res: Response) => {
  const result = await controller.getUsers(req);
  res.json(result);
});

export { userRouter };
