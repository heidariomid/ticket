import {z} from 'zod';

export const userSchema = z.object({
	name: z.string().min(3, 'name is required').max(100, 'name is too long'),
	username: z.string().min(3, 'username is required').max(100, 'username is too long'),
	password: z
		.string()
		.min(6, 'password must be at least 6 characters')
		.max(100, 'password is too long')
		.optional()
		.or(z.literal('')),
	role: z.string().min(1, 'role is required').optional(),
});
