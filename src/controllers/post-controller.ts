import { PostService } from "../services/post-service";
import { PostModel } from "../models/post-model";

class PostController {
  postService: PostService;
  constructor() {
    this.postService = new PostService();
  }
  async getPosts(userId: number): Promise<PostModel[]> {
    return await this.postService.getPosts(userId);
  }
}

export { PostController };
