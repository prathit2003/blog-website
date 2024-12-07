import express from "express";
import cors from "cors";
import router from "./routes/route";
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      auth?: { userId: string; email: string };
    }
  }
}

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);


const PORT = 3000;
app.listen(PORT, () => {
  console.log("server started");
})