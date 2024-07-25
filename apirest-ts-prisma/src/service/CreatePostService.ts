import { IPostRepository } from "../interfaces/IPostRepository";

class CreatePostService {
  constructor(private PostRepository: IPostRepository) {}

  public async execute(title: string, content: string, authorId: string) {
    const post = await this.PostRepository.create(title, content, authorId);
    return post;
  }
}

export { CreatePostService };
