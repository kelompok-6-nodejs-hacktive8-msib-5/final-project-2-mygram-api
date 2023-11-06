import { z } from "zod";

export const registerUserValidation = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "email not valid" })
    .max(100, { message: "email should not be longer than 100 characters" }),
  full_name: z
    .string({ required_error: "full_name is required" })
    .max(100, { message: "fullname should not be longer than 100 characters" }),
  username: z
    .string({ required_error: "username is required" })
    .max(100, { message: "username should not be longer than 100 characters" }),
  password: z
    .string({ required_error: "password is required" })
    .max(100, { message: "password should not be longer than 100 characters" }),
  profile_image_url: z
    .string({ required_error: "profile_image_url is required" })
    .url({ message: "Enter valid profile_image_url" }),
  age: z
    .number({
      required_error: "age is required",
      invalid_type_error: "age must be number",
    })
    .max(100, { message: "Enter valid age" }),
  phone_number: z.number({
    required_error: "phone_number is required",
    invalid_type_error: "phone_number must be number",
  }),
});

export const updateUserValidation = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "email not valid" })
    .max(100, { message: "email should not be longer than 100 characters" }),
  full_name: z.string({ required_error: "full_name is required" }).max(100, {
    message: "full_name should not be longer than 100 characters",
  }),
  username: z
    .string({ required_error: "username is required" })
    .max(100, { message: "username should not be longer than 100 characters" }),
  profile_image_url: z
    .string({ required_error: "profile_image_url is required" })
    .url({ message: "Enter valid profile_image_url" }),
  age: z
    .number({
      required_error: "age is required",
      invalid_type_error: "age must be number",
    })
    .max(100, { message: "Enter valid age" }),
  phone_number: z.number({
    required_error: "phone_number is required",
    invalid_type_error: "Enter valid phone_number",
  }),
});

export const loginUserValidation = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "email not valid" })
    .max(100, { message: "email should not be longer than 100 characters" }),
  password: z
    .string({ required_error: "password is required" })
    .max(100, { message: "password should not be longer than 100 characters" }),
});
