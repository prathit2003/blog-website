import express, { Router } from "express";
import middleware from "../middleware";
import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import multer from 'multer';


const router = express.Router();
const prisma = new PrismaClient();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("invalid file type. only JPEG, PNG, and pdf allowed."));
    }
  },
});
router.post("/post", middleware, upload.array("media"), async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    const userId = req.auth?.userId as string;
    const { title, content, published, tags } = req.body;

    const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
    const isPublished = published === "true";
    if (!title || !content || !userId || !Array.isArray(parsedTags)) {
      res.status(400).json({ success: false, message: "Invalid inputs, some fields are missing" });
      return;
    }

    const tagData = parsedTags.map((tag: string) => ({
      where: { name: tag },
      create: { name: tag },
    }));

    const media = files?.map((file) => ({
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
        likes: 0,
        comments: 0,
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
    res.status(500).json({ success: false, message: "Failed to create post" });
  }
});

router.put("/update", middleware, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.query;
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
    const response = await prisma.post.findMany({
      where: { authorId: Number(userid) }
      ,
      include: {
        author: {
          select: { username: true },
        },
        tags: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
})

router.post("/searchblogs", middleware, async (req: Request, res: Response): Promise<void> => {
  const { word } = req.body;
  console.log("Search word received:", word);

  try {
    const response = await prisma.post.findMany({
      where: {
        title: {
          contains: word,
          mode: "insensitive",
        }
      },
      include: {
        author: {
          select: { username: true },
        },
        tags: true,
      },
    });
    console.log("Prisma query result:", response);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(500);
  }

});

router.post("/gettitles", middleware, async (req: Request, res: Response): Promise<void> => {
  const { title } = req.body;
  try {
    const response = await prisma.post.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        }
      },
      orderBy: { likes: 'desc' },
      select: {
        title: true,
      }
    })
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
})

router.get("/updatelikes", middleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.query;
    const response = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        likes: { increment: 1 },
      }
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send({ message: "error updating likes", err });
  }
});
router.get("/updatecomments", middleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.query;
    const response = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        comments: { increment: 1 },
      }
    })
  } catch (err) {
    res.status(500).send({ message: "error updating comments", err });
  }
})

export default router;
