import { z } from "zod";

export const createCommentValidation = z.object({
  comment: z
    .string({ required_error: "comment is required" })
    .max(100, { message: "comment should not be longer than 100 characters" }),
  PhotoId: z
    .string({ required_error: "PhotoId is required" })
    .max(100, { message: "PhotoId should not be longer than 100 characters" }),
});

export const updateCommentValidation = z.object({
  comment: z
    .string({ required_error: "comment is required" })
    .max(100, { message: "comment should not be longer than 100 characters" }),
});
