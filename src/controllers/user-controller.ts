import { Request } from "express";
import { UserService } from "../services/user-service";
import { LoginResponseModel } from "../models/login-response-model";
import { SignupResponseModel } from "../models/signup-response-model";

class UserController {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  async signup(req: Request): Promise<SignupResponseModel> {
    return await this.userService.signup(req.body);
  }

  async login(req: Request): Promise<LoginResponseModel> {
    return await this.userService.login(req.body);
  }
}

export { UserController };
