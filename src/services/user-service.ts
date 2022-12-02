import { UserModel } from "../models/user-model";
import { LoginModel } from "../models/login-model";
import { HashManager } from "../utils/hash-manager";
import { PrismaClient } from "@prisma/client";
import { TokenManager } from "../utils/token-manager";
import { ApiError } from "../error/api-error";
import { createLoginResponse } from "../models/login-response-model";
import { createSignupResponseModel } from "../models/signup-response-model";

const hashManager = new HashManager();
const prisma = new PrismaClient();
const tokenManager = new TokenManager();
const USERS_PER_PAGE = 20;

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

  async getUsers(params: Record<string, any>) {
    const page = params.page;
    const usersToSkip = (page - 1) * USERS_PER_PAGE;

    const results = await prisma.userProfile.findMany({
      skip: usersToSkip,
      take: USERS_PER_PAGE,
    });
    return results;
  }
}

export { UserService };
