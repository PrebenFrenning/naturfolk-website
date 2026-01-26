import { z } from 'zod';

// Membership signup validation schema
export const membershipSignupSchema = z.object({
  membership_type: z.enum(['Hovedmedlem', 'Støttemedlem'], {
    required_error: "Vennligst velg medlemstype"
  }),
  email: z.string()
    .trim()
    .email({ message: "Ugyldig e-postadresse" })
    .min(1, { message: "E-post er påkrevd" }),
  first_name: z.string()
    .trim()
    .min(1, { message: "Fornavn er påkrevd" })
    .max(100, { message: "Fornavn må være mindre enn 100 tegn" }),
  middle_name: z.string()
    .trim()
    .max(100, { message: "Mellomnavn må være mindre enn 100 tegn" })
    .optional(),
  last_name: z.string()
    .trim()
    .min(1, { message: "Etternavn er påkrevd" })
    .max(100, { message: "Etternavn må være mindre enn 100 tegn" }),
  phone: z.string()
    .trim()
    .min(8, { message: "Telefonnummer må være minst 8 siffer" })
    .max(15, { message: "Telefonnummer må være mindre enn 15 siffer" }),
  personnummer: z.string()
    .trim()
    .refine((val) => {
      // For Hovedmedlem: 11-12 digits, for Støttemedlem: 6 digits (we'll validate based on membership_type)
      return /^\d{6,12}$/.test(val);
    }, { message: "Fødselsnummer må være mellom 6 og 12 siffer" }),
  gender: z.enum(['Mann', 'Kvinne', 'Ønsker ikke å oppgi'], {
    required_error: "Vennligst velg kjønn"
  }),
  country: z.string()
    .trim()
    .min(1, { message: "Land er påkrevd" })
    .max(100, { message: "Land må være mindre enn 100 tegn" }),
  address: z.string()
    .trim()
    .min(1, { message: "Adresse er påkrevd" })
    .max(200, { message: "Adresse må være mindre enn 200 tegn" }),
  address_2: z.string()
    .trim()
    .max(200, { message: "Adresse 2 må være mindre enn 200 tegn" })
    .optional(),
  postal_code: z.string()
    .trim()
    .min(4, { message: "Postnummer må være minst 4 siffer" })
    .max(10, { message: "Postnummer må være mindre enn 10 siffer" }),
  city: z.string()
    .trim()
    .min(1, { message: "Poststed er påkrevd" })
    .max(100, { message: "Poststed må være mindre enn 100 tegn" }),
  newsletter_subscribed: z.boolean().default(false),
  how_heard_about_us: z.string()
    .trim()
    .max(1000, { message: "Tekst må være mindre enn 1000 tegn" })
    .optional(),
});

export type MembershipSignupData = z.infer<typeof membershipSignupSchema>;
