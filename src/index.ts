import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import adminRoutes from "./routes/adminRoutes";
import publicRoutes from "./routes/publicRoutes"
import errorHandler from "./middlewares/errorHandler";

// Load environment variables from .env
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

// Parse JSON bodies
app.use(express.json());

// Check database connectivity on startup
async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process with an error code
  }
}
// Run the database connection check
checkDatabaseConnection();

// Use admin routes
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);

// Use the global error handler middleware
app.use(errorHandler); // Attach error handler at the end of all routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
