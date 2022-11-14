import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

class UserController {
  async signup (req, res) {
    const { firstname, lastname, email, password } = req.body;
    const result = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password
      }
    })
    res.json(result);
  }
}

export default UserController;