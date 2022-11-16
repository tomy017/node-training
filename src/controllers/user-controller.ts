import { Request } from "express";
import { PrismaClient, User } from "@prisma/client";
import { HashManager } from "../utils/hash-manager";
import { TokenManager } from "../utils/token-manager";
import { ApiError } from "../error/api-error";
import { UserService } from "../services/user-service";

const prisma = new PrismaClient();
const hashManager = new HashManager();
const tokenManager = new TokenManager();

class UserController {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  async signup(req: Request): Promise<User> {
    const result = await this.userService.signup(req.body);
    return result;
  }

  async login(req: Request): Promise<string> {
    const result = await this.userService.login(req.body);
    return result;
  }
}

export { UserController };
