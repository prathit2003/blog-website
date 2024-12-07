import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import middleware from "../middleware";


const Router = express.Router();
const prisma = new PrismaClient();
Router.get('/postlist', middleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      select: {
        title: true,
        content: true,
        authorId: true,
        createdAt: true,
        updatedAt: true,
      },
      take: 10,
    })
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "error while fetching posts " });
  }
})
export default Router;