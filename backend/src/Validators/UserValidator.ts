import z from 'zod';

export const UserSignUpValidator = z.object({
  userName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const UserLoginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});