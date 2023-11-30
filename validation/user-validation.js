import { z } from "zod";

export const registerUserValidation = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "email not valid" })
    .max(100, { message: "email should not be longer than 100 characters" }),
  full_name: z
    .string({ required_error: "full_name is required" })
    .min(3, { message: "full name must be at least 3 characters" })
    .max(100, { message: "fullname should not be longer than 100 characters" }),
  username: z
    .string({ required_error: "username is required" })
    .min(1, { message: "username at least 1 character long" })
    .max(100, { message: "username should not be longer than 100 characters" }),
  password: z
    .string({ required_error: "password is required" })
    .min(6, { message: "password at least 6 character long" })
    .max(100, { message: "password should not be longer than 100 characters" }),
  profile_image_url: z
    .string({ required_error: "profile_image_url is required" })
    .min(1, { message: "profile_image_url at least 1 character long" })
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
  full_name: z
    .string({ required_error: "full_name is required" })
    .min(3, { message: "full name must be at least 3 characters" })
    .max(100, {
      message: "full_name should not be longer than 100 characters",
    }),
  username: z
    .string({ required_error: "username is required" })
    .min(1, { message: "username at least 1 character long" })
    .max(100, { message: "username should not be longer than 100 characters" }),
  profile_image_url: z
    .string({ required_error: "profile_image_url is required" })
    .min(1, { message: "profile_image_url cannot be empty" })
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
    .min(1, { message: "password cannot be empty" })
    .max(100, { message: "password should not be longer than 100 characters" }),
});
