import express from "express";
import { Request, Response, NextFunction } from "express";
import { PostController } from "../controllers/post-controller";

const postRouter = express.Router();
const controller = new PostController();

postRouter.get(
  "/posts/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.getPosts(+req.params.userId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

export { postRouter };
