import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface User {
  id: string;
}

interface AuthRequest extends Request {
  user?: User;
}

interface JwtPayload {
  id: string;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.user = { id: (decoded as JwtPayload).id };
    next();
  });
};

export default authMiddleware;