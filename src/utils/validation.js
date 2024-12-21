import { z } from "zod"

export const User = z.object({
    email: z.string().email({message: "введите правильный email"}),
    password: z.string()
    .min(8, { message: "Пароль должен содержать не менее 8 символов" })
    .refine(value => /[A-Z]/.test(value), {
      message: "Пароль должен содержать хотя бы одну заглавную букву",
    })
    .refine(value => /[a-z]/.test(value), {
      message: "Пароль должен содержать хотя бы одну строчную букву",
    })
    .refine(value => /\d/.test(value), {
      message: "Пароль должен содержать хотя бы одну цифру",
    }),
  });
  