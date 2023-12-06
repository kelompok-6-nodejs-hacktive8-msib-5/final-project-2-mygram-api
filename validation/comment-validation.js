import { z } from "zod";

export const createCommentValidation = z.object({
  comment: z
    .string({ required_error: "comment is required" })
    .min(1, "comment cannot be empty")
    .max(100, { message: "comment should not be longer than 100 characters" }),
  PhotoId: z
    .string({ required_error: "PhotoId is required" })
    .min(1, "PhotoId cannot be empty")
    .max(100, { message: "PhotoId should not be longer than 100 characters" }),
});

export const updateCommentValidation = z.object({
  comment: z
    .string({ required_error: "comment is required" })
    .min(1, "comment cannot be empty")
    .max(100, { message: "comment should not be longer than 100 characters" }),
});
