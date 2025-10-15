import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const signupSchema = loginSchema.extend({
  name: z.string().min(2).max(100),
});

export type login = z.infer<typeof loginSchema>;
export type signup = z.infer<typeof signupSchema>;
