import { PrismaClient } from "@prisma/client";
import { HashManager } from "../utils/hash-manager";

const prisma = new PrismaClient();
const hashManager = new HashManager();

class UserController {
  async signup(req, res) {
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
    res.json(result);
  }
}

export default UserController;
