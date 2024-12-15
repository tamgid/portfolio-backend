import { z } from "zod";

// Zod schema for registration validation
export const registerSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Username must be at least 6 characters long" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(10, { message: "Password must be at least 10 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    }), // \W matches any non-alphanumeric character
});

// Zod schema for login validation
export const loginSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Username must be at least 6 characters long" }),
  password: z
    .string()
    .min(10, { message: "Password must be at least 10 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    }), // \W matches any non-alphanumeric character
});

// Zod schema for admin details validation
export const adminDetailsSchema = z.object({
  admin_firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(30, { message: "First name must be less than 30 characters" }),
  admin_lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(30, { message: "Last name must be less than 30 characters" }),
  admin_linkedin_url: z
    .string()
    .url({ message: "Invalid LinkedIn URL" })
    .optional(),
  admin_twitter_url: z
    .string()
    .url({ message: "Invalid Twitter URL" })
    .optional(),
  admin_instagram_url: z
    .string()
    .url({ message: "Invalid Instagram URL" })
    .optional(),
  admin_facebook_url: z
    .string()
    .url({ message: "Invalid Facebook URL" })
    .optional(),
  admin_github_url: z
    .string()
    .url({ message: "Invalid GitHub URL" })
    .optional(),
  admin_short_introduction: z
    .string()
    .min(1, { message: "Short introduction is required" })
    .max(500, { message: "Introduction must be less than 500 characters" }),
  admin_city: z
    .string()
    .min(1, { message: "City is required" })
    .max(100, { message: "City must be less than 100 characters" }),
  admin_country: z
    .string()
    .min(1, { message: "Country is required" })
    .max(100, { message: "Country must be less than 100 characters" }),
  admin_street_address: z
    .string()
    .min(1, { message: "Street address is required" })
    .max(100, { message: "Street address must be less than 100 characters" }),
  admin_phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(20, { message: "Phone number must be less than 20 digits" }),
  admin_free_from_day: z
    .string()
    .min(1, { message: "Free from day is required" }),
  admin_free_to_day: z.string().min(1, { message: "Free to day is required" }),
  admin_free_from_time: z
    .string()
    .min(1, { message: "Free from time is required" }),
  admin_free_to_time: z
    .string()
    .min(1, { message: "Free to time is required" }),

  // Role validation
  role_name: z.enum(["admin", "user"], {
    message: 'Role must be either "admin" or "user"',
  }),
});
