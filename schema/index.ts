import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string({
    message: "Password is required!ß",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(3, {
    message: "Name is required!",
  }),
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string({
    message: "Password is required!ß",
  }),
});


export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  })
})