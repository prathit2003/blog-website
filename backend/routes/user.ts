import express from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import dotenv from "dotenv";
import { Request, Response } from "express";
import middleware from "../middleware";
import tokengen from "../tokengen";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN || "refresh";
const prisma = new PrismaClient();
const Router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
const signupschema = z.object({
  email: z.string().email({ message: "invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password must be less than 50 characters long" }),
  username: z.string().min(1, { message: "username is required" }),
});

Router.post("/signup", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username } = signupschema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists!");
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshtoken = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      refreshtoken,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: error.errors.map((err) => err.message),
      });
    } else {
      console.error("Internal server error:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
});
const signinschema = z.object({
  email: z.string().email({ message: "invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "password must be less then 50 characters long" }),
});
Router.post("/signin", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = signinschema.parse(req.body);
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "user does not exist. plese sign up",
      });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ success: false, message: "Incorrect password." });
      return;
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshtoken = jwt.sign(
      { userId: user.id, email: user.email },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      success: true,
      message: "Signin successful",
      token,
      refreshtoken,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: error.errors.map((err) => err.message),
      });
    } else {
      console.error("Internal server error:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
});

Router.get(
  "/info",
  middleware,
  async (req: Request, res: Response): Promise<void> => {
    const userid = req.auth?.userId;

    if (!userid) {
      res.status(400).json({ success: false, message: "User ID not found." });
      return;
    }

    try {
      const userInfo = await prisma.user.findUnique({
        where: {
          id: Number(userid),
        },
        select: {
          email: true,
          profilePicture: true,
          username: true,
          posts: true,
        },
      });

      if (!userInfo) {
        res.status(404).json({ success: false, message: "User not found." });
        return;
      }

      res.status(200).json({
        success: true,
        data: userInfo,
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  }
);
Router.get("/token", tokengen, (req: Request, res: Response) => {
  const userid = req.auth?.userId;
  const emailid = req.auth?.email;
  const authtoken = jwt.sign({ userId: userid, email: emailid }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json(authtoken);
});
Router.post(
  "/upload-profile-picture",
  upload.single("profilePicture"),
  middleware,
  async (req: Request, res: Response) => {
    try {
      const userId = req.body.userId;
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }
      const profilePictureUrl = `/uploads/${req.file.filename}`;

      const updatedUser = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: { profilePicture: profilePictureUrl },
      });

      res.status(200).json({
        message: "Profile picture updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating profile picture" });
    }
  }
);

module.exports = Router;

export default Router;
