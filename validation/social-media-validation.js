import { z } from "zod";

export const socialMediaValidation = z.object({
  name: z
    .string({ required_error: "name is required" })
    .min(1, { message: "name cannot be empty" })
    .max(100, { message: "name should not be longer than 100 characters" }),
  social_media_url: z
    .string({
      required_error: "social_media_url is required",
    })
    .min(1, { message: "social_media_url cannot be empty" })
    .url({ message: "Enter valid social_media_url" }),
});
