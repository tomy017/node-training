import { Request } from "express";
import { PrismaClient, User } from "@prisma/client";
import { HashManager } from "../utils/hash-manager";
import { TokenManager } from "../utils/token-manager";
import { ApiError } from "../error/api-error";

const prisma = new PrismaClient();
const hashManager = new HashManager();
const tokenManager = new TokenManager();

class UserController {
  async signup(req: Request): Promise<User> {
    const { firstname, lastname, email, password } = req.body;
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
  }

  async login(req: Request): Promise<string> {
    const { email, password } = req.body;
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

export { UserController };
