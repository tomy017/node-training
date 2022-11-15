import express from "express";
import UserController from "../controllers/user-controller";
import { validateDto } from "../middlewares/validate-dto";

const router = express.Router();
const controller = new UserController();
const signupDTO = require("../dtos/signup-dto");
const loginDTO = require("../dtos/login-dto");

router.get("/signup", validateDto(signupDTO), async (req, res) => {
  const result = await controller.signup(req);
  res.json(result);
});

router.post("/login", validateDto(loginDTO), async (req, res, next) => {
  try {
    const result = await controller.login(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
