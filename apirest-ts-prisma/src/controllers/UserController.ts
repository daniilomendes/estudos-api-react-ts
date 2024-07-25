import { Request, Response } from "express";
import prismaClient from "../prisma";

export default {
  async createUser(request: Request, response: Response) {
    try {
      const { name, email } = request.body;
      const userExist = await prismaClient.user.findUnique({
        where: { email },
      });

      if (userExist) {
        return response.json({
          error: true,
          message: "Erro: Usuário já existe!",
        });
      }

      const user = await prismaClient.user.create({
        data: {
          name,
          email,
        },
      });

      return response.json({
        error: false,
        message: "Sucesso: Usuário cadastrado com sucesso!",
        user,
      });
    } catch (error) {
      return response.json({ message: error.message });
    }
  },
};
