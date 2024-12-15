import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as adminModel from "../models/adminModel";
import * as adminValidation from "../validation/adminValidation";
import { z } from "zod"; // Add this import at the top of the file


export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, email, password } = req.body;

  // Input validation with Zod
  try {
    adminValidation.registerSchema.parse({ username, email, password });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: error.errors.map((e) => e.message).join(", ") });
      return;
    }
    return next(error); // Pass other errors to the next middleware
  }

  try {
    // Check if the username already exists
    const existingUser = await adminModel.findUserByUsername(username);
    if (existingUser) {
      res.status(409).json({ message: "Username already exists" });
      return;
    }

    // Check if the email already exists
    const existingEmail = await adminModel.findUserByEmail(email);
    if (existingEmail) {
      res.status(409).json({ message: "Email already exists" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await adminModel.createUser(username, email, hashedPassword);

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;

  // Input validation with Zod
  try {
    adminValidation.loginSchema.parse({ username, password });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: error.errors.map((e) => e.message).join(", ") });
      return;
    }
    return next(error);
  }

  try {
    // Find user by username
    const user = await adminModel.findUserByUsername(username);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Compare password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Ensure JWT_SECRET is defined
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET environment variable is not set");
    }

    // Create JWT token with additional claims
    const token = jwt.sign(
      { userId: user.id }, // Token payload
      secret,
      {
        expiresIn: "1h", // Expiration time
        issuer: "portfolio", // Issuer claim (optional)
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


export const addAdminDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Retrieve userId from res.locals (set by the authentication middleware)
  const { userId } = res.locals;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized: User not authenticated" });
    return;
  }

  // Validate the incoming admin details
  try {
    adminValidation.adminDetailsSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: error.errors.map((e) => e.message).join(", ") });
      return;
    }
    next(error);
    return;
  }

  try {
    const adminData = {
      ...req.body,
      user_id: userId, // Add the `userId` from res.locals to associate the admin with the user
    };

    // Insert into the database
    const createdAdmin = await adminModel.createAdmin(adminData, userId);

    res.status(201).json({
      message: "Admin details added successfully",
      admin: createdAdmin,
    });
  } catch (error) {
    console.error(error);
    next(error); // Pass error to the error-handling middleware
  }
};

//Checking role is important for any other crud operation. But i am not doing this for post api of adding admin details. As, any user admin or normal user can add details if he logged in by only validating the token.
