import {z} from 'zod';

export const ticketSchema = z.object({
	title: z.string().min(3, 'title is required').max(100, 'title is too long'),
	description: z.string().min(3, 'description is required').max(1000),
	status: z.string().min(1, 'Status').optional(),
	priority: z.string().min(1, 'Priority').optional(),
});
