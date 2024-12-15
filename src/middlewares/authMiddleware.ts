import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Assume "Authorization: Bearer <token>"

  if (!token) {
    res.status(401).json({ message: "Token missing or unauthorized" });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, secret) as { userId: number }; // Ensure the token contains `userId`
    res.locals.userId = decoded.userId; // Attach userId to res.locals
    next(); // Proceed to the next middleware/handler
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
