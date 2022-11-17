import { Request } from "express";
import { PrismaClient, User } from "@prisma/client";
import { HashManager } from "../utils/hash-manager";
import { TokenManager } from "../utils/token-manager";
import { ApiError } from "../error/api-error";
import { UserService } from "../services/user-service";
import { LoginResponseModel } from "../models/login-response-model";
import { SignupResponseModel } from "../models/signup-response-model";

const prisma = new PrismaClient();
const hashManager = new HashManager();
const tokenManager = new TokenManager();

class UserController {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  async signup(req: Request): Promise<SignupResponseModel> {
    const result = await this.userService.signup(req.body);
    return result;
  }

  async login(req: Request): Promise<LoginResponseModel> {
    const result = await this.userService.login(req.body);
    return result;
  }
}

export { UserController };
