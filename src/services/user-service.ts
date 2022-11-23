import { UserModel } from "../models/user-model";
import { LoginModel } from "../models/login-model";
import { HashManager } from "../utils/hash-manager";
import { PrismaClient } from "@prisma/client";
import { TokenManager } from "../utils/token-manager";
import { ApiError } from "../error/api-error";
import { createLoginResponse } from "../models/login-response-model";
import { createSignupResponseModel } from "../models/signup-response-model";
import prisma from "../../prisma/client";

const hashManager = new HashManager();
const tokenManager = new TokenManager();

class UserService {
  async signup(body: UserModel) {
    try {
      const { firstname, lastname, email, password } = body;
      const hashedPassword = await hashManager.getHash(password);
      const result = await prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          password: hashedPassword,
        },
      });
      const response = createSignupResponseModel(result);
      return response;
    } catch (error) {
      throw ApiError.badRequest("User already registered");
    }
  }

  async login(body: LoginModel) {
    const { email, password } = body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw ApiError.badRequest("User not found");
    }

    const comparedResult = await hashManager.compareHash(
      password,
      user.password
    );

    if (comparedResult) {
      const token = tokenManager.getToken(email);
      const response = createLoginResponse(user, token);
      return response;
    } else {
      throw ApiError.badRequest("Invalid credentials, try again");
    }
  }
}

export { UserService };
