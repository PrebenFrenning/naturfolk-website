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
  registrationDeadline: z.string().optional(),
});

export const contactSchema = z.object({
  firstName: z.string()
    .trim()
    .min(2, { message: "Fornavn må være minst 2 tegn" })
    .max(100, { message: "Fornavn må være kortere enn 100 tegn" }),
  lastName: z.string()
    .trim()
    .min(2, { message: "Etternavn må være minst 2 tegn" })
    .max(100, { message: "Etternavn må være kortere enn 100 tegn" }),
  email: z.string()
    .trim()
    .email({ message: "Skriv inn en gyldig e-postadresse" })
    .max(255, { message: "E-postadressen er for lang" }),
  subject: z.string()
    .trim()
    .min(5, { message: "Emnet må være minst 5 tegn" })
    .max(200, { message: "Emnet må være kortere enn 200 tegn" }),
  message: z.string()
    .trim()
    .min(10, { message: "Meldingen må være minst 10 tegn" })
    .max(5000, { message: "Meldingen må være kortere enn 5000 tegn" }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
