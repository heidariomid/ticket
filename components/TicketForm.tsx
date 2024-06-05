'use client';

import {ticketSchema} from '@/validationSchemas/ticket';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel} from './ui/form';
import {Input} from './ui/input';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from './ui/select';
import {Button} from './ui/button';
import {useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import {Ticket} from '@prisma/client';
import Error from 'next/error';

type TicketFormData = z.infer<typeof ticketSchema>;
interface Props {
	ticket?: Ticket;
}
const TicketForm = ({ticket}: Props) => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const form = useForm<TicketFormData>({
		resolver: zodResolver(ticketSchema),
	});
	const {handleSubmit, control} = form;
	const onSubmit = async (values: TicketFormData) => {
		try {
			setIsSubmitting(true);
			setError('');
			if (ticket) {
				await axios.patch(`/api/ticket/${ticket.id}`, values);
			} else {
				await axios.post('/api/ticket', values);
			}
			setIsSubmitting(false);
			router.push('/tickets');
			router.refresh();
		} catch (error: any) {
			setError(error.response?.data.error || 'An error occurred');
			setIsSubmitting(false);
		}
	};
	const titleRender = ({field}: {field: any}) => (
		<FormItem>
			<FormLabel>Title</FormLabel>
			<FormControl>
				<Input placeholder='Title' {...field} />
			</FormControl>
		</FormItem>
	);
	const statusRender = ({field}: {field: any}) => (
		<FormItem>
			<Select onValueChange={field.onChange} defaultValue={field.value}>
				<FormControl>
					<SelectTrigger>
						<SelectValue placeholder='Status' {...field} />
					</SelectTrigger>
				</FormControl>
				<SelectContent>
					<SelectItem value='OPEN'>Open</SelectItem>
					<SelectItem value='CLOSED'>Closed</SelectItem>
					<SelectItem value='STARTED'>Started</SelectItem>
				</SelectContent>
			</Select>
		</FormItem>
	);
	const priorityRender = ({field}: {field: any}) => (
		<FormItem>
			<Select onValueChange={field.onChange} defaultValue={field.value}>
				<FormControl>
					<SelectTrigger>
						<SelectValue placeholder='Priority' {...field} />
					</SelectTrigger>
				</FormControl>
				<SelectContent>
					<SelectItem value='HIGH'>High</SelectItem>
					<SelectItem value='MEDIUM'>Medium</SelectItem>
					<SelectItem value='LOW'>Low</SelectItem>
				</SelectContent>
			</Select>
		</FormItem>
	);
	const descriptionRender = ({field}: {field: any}) => <SimpleMDE placeholder='Description' {...field} />;
	return (
		<div className='w-full p-4'>
			{error && <div className='bg-red-500 text-white p-2 rounded-md'>{error}</div>}
			<Form {...form}>
				<form className='w-full space-y-8 ' onSubmit={handleSubmit(onSubmit)}>
					<FormField
						name='title'
						control={control}
						defaultValue={ticket?.title}
						render={titleRender}
					/>
					<Controller
						name='description'
						control={control}
						defaultValue={ticket?.description}
						render={descriptionRender}
					/>
					<div className='w-full flex space-x-4 '>
						<FormField
							name='status'
							control={control}
							defaultValue={ticket?.status}
							render={statusRender}
						/>
						<FormField
							name='priority'
							control={control}
							defaultValue={ticket?.priority}
							render={priorityRender}
						/>
					</div>
					<Button type='submit' disabled={isSubmitting}>
						{ticket ? 'Update Ticket' : 'Create Ticket'}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default TicketForm;
