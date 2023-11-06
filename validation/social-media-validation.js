import { z } from "zod";

export const socialMediaValidation = z.object({
  name: z
    .string({ required_error: "name is required" })
    .max(100, { message: "name should not be longer than 100 characters" }),
  social_media_url: z
    .string({
      required_error: "social_media_url is required",
    })
    .url({ message: "Enter valid social_media_url" }),
});
