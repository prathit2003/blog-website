import express, { Router } from "express";
import middleware from "../middleware";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";

const router = express.Router();
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(
        new Error("invalid file type. only JPEG, PNG, and pdf allowed.")
      );
    }
  },
});
router.delete(
  "/delete",
  middleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.query;
      const post = await prisma.post.findUnique({ where: { id: Number(id) } });

      if (!post) {
        res.status(404).json({ success: false, message: "Post not found" });
        return;
      }
      await prisma.comment.deleteMany({
        where: { postId: Number(id) },
      });
      await prisma.like.deleteMany({
        where: { postId: Number(id) },
      });
      await prisma.post.delete({
        where: { id: Number(id) },
      });

      res
        .status(200)
        .json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
      console.log("error deleting blog");
    }
  }
);
router.post(
  "/post",
  middleware,
  upload.array("media"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const files = req.files as Express.Multer.File[];
      const userId = req.auth?.userId as string;
      const { title, content, published, tags } = req.body;

      const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
      const isPublished = published === "true";
      if (!title || !content || !userId || !Array.isArray(parsedTags)) {
        res.status(400).json({
          success: false,
          message: "Invalid inputs, some fields are missing",
        });
        return;
      }

      const tagData = parsedTags.map((tag: string) => ({
        where: { name: tag },
        create: { name: tag },
      }));

      const media =
        files?.map((file) => ({
          name: file.originalname,
          mimeType: file.mimetype,
          data: file.buffer,
        })) || [];

      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          published: isPublished,
          authorId: parseInt(userId),
          media,
          tags: {
            connectOrCreate: tagData,
          },
        },
        include: { tags: true },
      });

      await Promise.all(
        parsedTags.map((tag: string) =>
          prisma.tag.update({
            where: { name: tag },
            data: { usageCount: { increment: 1 } },
          })
        )
      );

      res.status(200).json({ success: true, post: newPost });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to create post" });
    }
  }
);

router.put(
  "/update",
  middleware,
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.query;
    const { title, content, published, tags } = req.body;

    try {
      if (!title || !content || !id || !Array.isArray(tags)) {
        res.status(500).json({
          success: false,
          message: "Invalid inputs, some input fields are missing",
        });
        return;
      }

      const post = await prisma.post.findUnique({ where: { id: Number(id) } });

      if (!post) {
        res.status(404).json({ success: false, message: "Post not found" });
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
        },
        include: {
          author: {
            select: {
              username: true,
              profilePicture: true,
            },
          },
          tags: true,
          likes: true,
          comments: true,
        },
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
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to update post",
      });
    }
  }
);

router.get(
  "/get-blogs",
  middleware,
  async (req: Request, res: Response): Promise<void> => {
    const userid = req.auth?.userId;
    try {
      const post = await prisma.post.findMany({
        where: { published: true },
        take: 10,
        include: {
          author: {
            select: {
              username: true,
              profilePicture: true,
            },
          },
          tags: true,
          likes: true,
          comments: true,
        },
      });
      const shuffledPosts = post.sort(() => 0.5 - Math.random());
      if (!shuffledPosts) {
        res.status(200).json({ message: "no post available" });
      }
      const blogids = await prisma.like.findMany({
        where: {
          authorId: Number(userid),
        },
      });
      let blogIds = blogids.map((post) => post.postId);
      const response = {
        blogIds,
        shuffledPosts,
      };
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "failed to fetch blogs" });
    }
  }
);

router.get(
  "/profiles",
  middleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const top5post = await prisma.post.findMany({
        take: 5,
        orderBy: {
          likes: {
            _count: "desc",
          },
        },
        select: {
          author: {
            select: {
              username: true,
              profilePicture: true,
            },
          },
        },
      });
      res.status(200).json(top5post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/trending",
  middleware,
  async (req: Request, res: Response): Promise<void> => {
    const userid = req.auth?.userId;
    try {
      const top10post = await prisma.post.findMany({
        take: 5,
        orderBy: {
          likes: {
            _count: "desc",
          },
        },
        include: {
          author: {
            select: {
              username: true,
              profilePicture: true,
            },
          },
          tags: true,
          likes: true,
          comments: true,
        },
      });
      const blogids = await prisma.like.findMany({
        where: {
          authorId: Number(userid),
        },
      });
      let blogIds = blogids.map((post) => post.postId);
      const response = {
        blogIds,
        top10post,
      };
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
);
router.get(
  "/my-blogs",
  middleware,
  async (req: Request, res: Response): Promise<void> => {
    const userid = req.auth?.userId;
    try {
      const post = await prisma.post.findMany({
        where: { authorId: Number(userid) },
        include: {
          author: {
            select: {
              username: true,
              profilePicture: true,
            },
          },
          tags: true,
          likes: true,
          comments: true,
        },
      });
      const blogids = await prisma.like.findMany({
        where: {
          authorId: Number(userid),
        },
      });
      let blogIds = blogids.map((post) => post.postId);
      const response = {
        blogIds,
        post,
      };
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
);

router.post(
  "/searchblogs",
  middleware,
  async (req: Request, res: Response): Promise<void> => {
    const { word } = req.body;
    console.log("Search word received:", word);

    try {
      const response = await prisma.post.findMany({
        where: {
          title: {
            contains: word,
            mode: "insensitive",
          },
        },
        include: {
          author: {
            select: {
              username: true,
              profilePicture: true,
            },
          },
          tags: true,
          likes: true,
          comments: true,
        },
      });
      console.log("Prisma query result:", response);
      res.status(200).json({ response });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
);

router.post(
  "/gettitles",
  middleware,
  async (req: Request, res: Response): Promise<void> => {
    const { title } = req.body;
    if (!title) {
      res.status(400).json({ message: "Title is required for search" });
      return;
    }
    try {
      const posts = await prisma.post.findMany({
        where: {
          title: {
            contains: title,
            mode: "insensitive",
          },
        },
      });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error });
      console.log(error);
    }
  }
);

router.post(
  "/:PostId/updatelikes",
  middleware,
  async (req: Request, res: Response): Promise<void> => {
    const { PostId } = req.params;
    const authorId = Number(req.auth?.userId);

    if (isNaN(authorId) || isNaN(Number(PostId))) {
      res.status(400).json({ message: "Invalid PostId or authorId" });
      return;
    }

    try {
      const existingLike = await prisma.like.findUnique({
        where: {
          authorId_postId: {
            authorId,
            postId: Number(PostId),
          },
        },
      });

      if (existingLike) {
        await prisma.like.delete({
          where: {
            authorId_postId: {
              authorId,
              postId: Number(PostId),
            },
          },
        });
      } else {
        await prisma.like.create({
          data: {
            authorId,
            postId: Number(PostId),
          },
        });
      }
      const blogids = await prisma.like.findMany({
        where: {
          authorId,
        },
      });
      let blogIds = blogids.map((post) => post.postId);
      const post = await prisma.post.findUnique({
        where: {
          id: Number(PostId),
        },
        include: {
          author: {
            select: { username: true },
          },
          tags: true,
          likes: true,
          comments: true,
        },
      });

      if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
      }
      const response = {
        blogIds,
        post,
      };
      res.status(200).json(response);
    } catch (err) {
      console.error("Error updating likes:", err);
      res.status(500).send({ message: "Error updating likes", error: err });
    }
  }
);

router.post(
  "/:postId/updatecomments",
  middleware,
  async (req: Request, res: Response): Promise<void> => {
    const userid = req.auth?.userId;
    const { postId } = req.params;
    const { content } = req.body;
    try {
      const comment = await prisma.comment.create({
        data: {
          content,
          authorId: Number(userid),
          postId: parseInt(postId),
        },
      });
      const post = await prisma.post.findUnique({
        where: {
          id: parseInt(postId),
        },
        include: {
          author: {
            select: {
              username: true,
              profilePicture: true,
            },
          },
          tags: true,
          likes: true,
          comments: true,
        },
      });
      res.status(201).json(post);
    } catch (err) {
      res.status(500).send({ message: "error updating comments", err });
    }
  }
);

export default router;
