import z from 'zod';

export const DishValidator = z.object({
    title: z.string().min(1),
    price: z.number().min(1),
    description: z.string().min(1),
    category: z.string().min(1),
    image: z.string().min(1),
});