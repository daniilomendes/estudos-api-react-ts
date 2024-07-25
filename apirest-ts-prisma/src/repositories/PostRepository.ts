import { IPostRepository } from "../interfaces/IPostRepository";
import { Post } from "@prisma/client";
import prismaClient from "../prisma";

class PostRepository implements IPostRepository {
  public async create(
    title: string,
    content: string,
    authorId: string
  ): Promise<Post> {
    const post = await prismaClient.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    return post;
  }
}

export { PostRepository };
