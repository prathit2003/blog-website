import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
dotenv.config();
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN || "refresh";
interface AuthPayload {
  userId: string;
  email: string;
}
const tokengen = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization'];
  if (!token) {
    res.status(401).json({ success: false, message: 'access denied. no token provided' });
    return;
  }
  jwt.verify(token, REFRESH_TOKEN_SECRET, (err: any, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'invalid token.' });
    }
    if (decoded && typeof decoded === 'object' && 'userId' in decoded && 'email' in decoded) {
      req.auth = {
        userId: (decoded as JwtPayload & AuthPayload).userId,
        email: (decoded as JwtPayload & AuthPayload).email,
      };
    } else {
      return res.status(403).send('Invalid token structure');
    }
    next();
  })
}


export default tokengen;