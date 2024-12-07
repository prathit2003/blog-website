import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';

interface AuthPayload {
  userId: string;
  email: string;
}

const middleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    res.status(401).json({ success: false, message: 'access denied. no token provided' });
    return
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
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
  });
};

export default middleware;