import z from 'zod';

export const UserSignUpValidator = z.object({
  userName: z.string().min(3).max(10),
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string().min(10).max(10),
});

export const UserLoginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});