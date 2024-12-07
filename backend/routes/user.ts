import express from "express";
import { z } from "zod";
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import middleware from "../middleware";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key";
const prisma = new PrismaClient();



const Router = express.Router();
const signupschema = z.object({
  email: z.string().email({ message: "invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }).max(50, { message: "Password must be less than 50 characters long" }),
  firstname: z.string().min(1, { message: "firstname is required" }),
  username: z.string().min(1, { message: "username is required" }),
});

Router.post("/signup", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstname, username } = signupschema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

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
        firstname,
        username
      },
    })
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );


    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: error.errors.map((err) => err.message),
      });
    } else {
      console.error("Internal server error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
})
const signinschema = z.object({
  email: z.string().email({ message: "invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }).max(50, { message: "password must be less then 50 characters long" })

})
Router.post("/signin", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = signinschema.parse(req.body);
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(400).json({ success: false, message: "user does not exist. plese sign up" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ success: false, message: "Incorrect password." });
      return;
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Signin successful",
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: error.errors.map((err) => err.message),
      });
    } else {
      console.error("Internal server error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
})

Router.get("/info", middleware, async (req: Request, res: Response): Promise<void> => {
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
        firstname: true,
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
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});



export default Router;