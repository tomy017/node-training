import { PrismaClient } from "@prisma/client";
import { ApiError } from "../error/api-error";
const prisma = new PrismaClient();

class PostService {
  async getPosts(userId: number) {
    try {
      const results = await prisma.userProfile.findUniqueOrThrow({
        where: {
          id: userId,
        },
        include: {
          posts: true,
        },
      });
      return results.posts;
    } catch (error) {
      throw ApiError.badRequest("User not found");
    }
  }
}

export { PostService };
