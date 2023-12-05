import { z } from "zod";

export const photoValidation = z.object({
  poster_image_url: z
    .string({ required_error: "poster_image_url is required" })
    .min(3, { message: "profile_image_url must be at least 3 characters" })
    .url({ message: "Enter valid poster_image_url" }),
  title: z
    .string({ required_error: "title photo is required" })
    .min(1, { message: "title cannot be empty" })
    .max(100, { message: "title should not be longer than 100 characters" }),
  caption: z
    .string({ required_error: "caption is required" })
    .min(1, { message: "caption cannot be empty" })
    .max(100, { message: "caption should not be longer than 100 characters" }),
});
