import { SignupModel } from "../types/signup-model";
import { LoginModel } from "../types/login-model";
import { HashManager } from "../utils/hash-manager";
import { PrismaClient } from "@prisma/client";
import { TokenManager } from "../utils/token-manager";
import { ApiError } from "../error/api-error";

const hashManager = new HashManager();
const prisma = new PrismaClient();
const tokenManager = new TokenManager();

class UserService {
  async signup(body: SignupModel) {
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
      return result;
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
      return token;
    } else {
      throw ApiError.badRequest("Invalid credentials, try again");
    }
  }
}

export { UserService };
