import { z } from "zod";

export const photoValidation = z.object({
  poster_image_url: z
    .string({ required_error: "poster_image_url is required" })
    .url({ message: "Enter valid poster_image_url" }),
  title: z
    .string({ required_error: "title photo is required" })
    .max(100, { message: "title should not be longer than 100 characters" }),
  caption: z
    .string({ required_error: "caption is required" })
    .max(100, { message: "caption should not be longer than 100 characters" }),
});
