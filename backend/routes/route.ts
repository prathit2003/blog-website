import express from "express";
import userRouter from "./user";
import blogsRouter from "./blog";
import homeRouter from "./dashboard";
const router = express.Router();

router.use("/user", userRouter);
router.use("/blogs", blogsRouter);
router.use("/home", homeRouter);


export default router;
