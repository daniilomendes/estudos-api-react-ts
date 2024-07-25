import { Request, Response } from "express";
import prismaClient from "../prisma";
import { CreatePostService } from "../service/CreatePostService";
import { PostRepository } from "../repositories/PostRepository";

export default {
  async createPost(request: Request, response: Response) {
    try {
      const { title, content, authorId } = request.body;

      const createPost = new CreatePostService(new PostRepository());

      const post = await createPost.execute(title, content, authorId);

      return response.json({
        error: false,
        message: "Sucesso: Post cadastrado com sucesso!",
        post,
      });
    } catch (error) {
      return response.json({ message: error.message });
    }
  },

  async listPost(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const post = await prismaClient.post.findUnique({
        where: {
          id,
        },
      });

      if (!post) {
        return response.json({
          error: true,
          message: "Error: Post não encontrado!",
        });
      }

      return response.json({
        error: false,
        post,
      });
    } catch (error) {
      return response.json({ message: error.message });
    }
  },

  async updatePost(request: Request, response: Response) {
    try {
      const { id, title, content } = request.body;

      const postExists = await prismaClient.post.findUnique({
        where: {
          id,
        },
      });

      if (!postExists) {
        return response.json({
          error: true,
          message: "Error: Post não encontrado!",
        });
      }

      const post = await prismaClient.post.update({
        where: {
          id: request.body.id,
        },
        data: {
          title,
          content,
        },
      });

      return response.json({
        error: false,
        message: "Sucesso: Post atualizado com sucesso!",
        post,
      });
    } catch (error) {
      return response.json({ message: error.message });
    }
  },

  async deletePost(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const postExists = await prismaClient.post.findUnique({
        where: {
          id,
        },
      });

      if (!postExists) {
        return response.json({
          error: true,
          message: "Error: Post não encontrado!",
        });
      }

      const post = await prismaClient.post.delete({
        where: {
          id: request.params.id,
        },
      });

      return response.json({
        error: false,
        message: "Sucesso: Post deletado com sucesso!",
        post,
      });
    } catch (error) {
      return response.json({ message: error.message });
    }
  },
};
