import { Request, Response, NextFunction } from "express";

// Error handling middleware
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack); // Log the error stack to the console

  // Check if the error has a specific status code
  const statusCode = err.statusCode || 500; // Default to 500 if no status code is provided
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    message: message,
    error: err.isOperational ? err.message : "Internal Server Error", // Hide internal errors in production
  });
};

export default errorHandler;
