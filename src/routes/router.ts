import express from "express";
import UserController from "../controllers/user-controller";
import { validateDto } from "../middlewares/validate-dto";

const router = express.Router();
const controller = new UserController();
const userDto = require("../dtos/user-dto");

router.get("/signup", validateDto(userDto), (req, res) => {
  controller.signup(req, res);
});

export default router;
