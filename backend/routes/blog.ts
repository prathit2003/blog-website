import express, { Router } from "express";
import middleware from "../middleware";
import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const router = express.Router();
const prisma = new PrismaClient();
const app = express();

router.post("/post", middleware, async (req: Request, res: Response): Promise<void> => {
  const userId = req.auth?.userId as string;
  const { title, content, published, tags } = req.body;
  if (!title || !content || !userId || !Array.isArray(tags)) {
    res.status(400).json({ success: false, message: 'invalid inputs,some feilds are missing' })
    return;
  }
  try {
    const tagData = tags.map((tag: string) => ({
      where: { name: tag },
      create: { name: tag },
    }));
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published: published ?? false,
        authorId: parseInt(userId),
        likes: 0,
        comments: 0,
        tags: {
          connectOrCreate: tagData,
        },
      },
      include: { tags: true },
    });
    await Promise.all(
      tags.map((tag: string) =>
        prisma.tag.update({
          where: { name: tag },
          data: { usageCount: { increment: 1 } },
        })
      )
    );
    res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to create post' });
    return;
  }
})

router.put("/update", middleware, async (req: Request, res: Response): Promise<void> => {
  const id = req.auth?.userId;
  const { title, content, published, tags } = req.body;
  try {
    if (!title || !content || !id || Array.isArray(tags)) {
      res.status(500).json({
        success: false, message: "invalid inputs, some input feilds are missing"
      });
      return;
    }
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });

    if (!post) {
      res.status(404).json({ success: false, message: 'Post not found' });
      return;
    }
    const tagData = tags.map((tag: string) => ({
      where: { name: tag },
      create: { name: tag },
    }));
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        published: published ?? post.published,
        tags: {
          connectOrCreate: tagData,
        },
      }
    });
    await Promise.all(
      tags.map((tag: string) =>
        prisma.tag.update({
          where: { name: tag },
          data: { usageCount: { increment: 1 } },
        })
      )
    );
    res.status(200).json({ success: true, post: updatedPost });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update post' });
  }
});

router.get("/get-blogs", middleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const Response = await prisma.post.findMany({
      where: { published: true },
      take: 10,
      include: {
        author: {
          select: { username: true },
        },
        tags: true,
      },
    })
    const shuffledPosts = Response.sort(() => 0.5 - Math.random());
    if (!shuffledPosts) {
      res.status(200).json({ message: "no post available" });
    }
    res.status(200).json(shuffledPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'failed to fetch blogs' });
  }
});

router.get("/profiles", middleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await prisma.post.findMany({
      where: { published: true },
      orderBy: { likes: 'desc' },
      take: 5,
      select: {
        authorId: true,
        author: {
          select: {
            username: true,
          },
        },
      }
    })
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
})

router.get("/trending", middleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await prisma.post.findMany({
      where: { published: true },
      orderBy: { likes: 'desc' },
      take: 5,
      include: {
        author: {
          select: { username: true },
        },
        tags: true,
      },
    })
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
})
router.get("/my-blogs", middleware, async (req: Request, res: Response): Promise<void> => {
  const userid = req.auth?.userId;
  try {
    const response = await prisma.post.findMany({ where: { authorId: Number(userid) } });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
})

export default router;
