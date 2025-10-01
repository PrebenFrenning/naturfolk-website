import { z } from 'zod';

// Post validation schema
export const postSchema = z.object({
  title: z.string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title must be less than 200 characters" }),
  slug: z.string()
    .trim()
    .min(1, { message: "Slug is required" })
    .max(200, { message: "Slug must be less than 200 characters" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug must contain only lowercase letters, numbers, and hyphens" }),
  excerpt: z.string()
    .max(500, { message: "Excerpt must be less than 500 characters" })
    .optional(),
  content: z.string()
    .min(1, { message: "Content is required" })
    .max(50000, { message: "Content must be less than 50,000 characters" }),
});

// Event validation schema
export const eventSchema = z.object({
  title: z.string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title must be less than 200 characters" }),
  description: z.string()
    .min(1, { message: "Description is required" })
    .max(10000, { message: "Description must be less than 10,000 characters" }),
  location: z.string()
    .max(200, { message: "Location must be less than 200 characters" })
    .optional(),
  organizedBy: z.string()
    .max(100, { message: "Organizer name must be less than 100 characters" })
    .optional(),
  price: z.string()
    .max(50, { message: "Price must be less than 50 characters" })
    .optional(),
  ticketLink: z.string()
    .url({ message: "Must be a valid URL" })
    .optional()
    .or(z.literal('')),
  facebookLink: z.string()
    .url({ message: "Must be a valid URL" })
    .optional()
    .or(z.literal('')),
  whatToBring: z.string()
    .max(5000, { message: "What to bring must be less than 5,000 characters" })
    .optional(),
  maxParticipants: z.number()
    .int()
    .positive()
    .max(10000, { message: "Max participants must be less than 10,000" })
    .optional(),
});
