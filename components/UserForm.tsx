'use client';

import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel} from './ui/form';
import {Input} from './ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from './ui/select';
import {Button} from './ui/button';
import {useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import {User} from '@prisma/client';
import {userSchema} from '@/validationSchemas/user';

type UserFormData = z.infer<typeof userSchema>;
interface Props {
	user?: User;
}
const UserForm = ({user}: Props) => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const form = useForm<UserFormData>({
		resolver: zodResolver(userSchema),
	});
	const {handleSubmit, control} = form;
	const onSubmit = async (values: UserFormData) => {
		try {
			setIsSubmitting(true);
			setError('');
			if (user) {
				await axios.patch(`/api/user/${user.id}`, values);
			} else {
				await axios.post('/api/user', values);
			}
			setIsSubmitting(false);
			router.push('/');
			router.refresh();
		} catch (error) {
			setError('An error occurred');
			setIsSubmitting(false);
		}
	};
	const nameRender = ({field}: {field: any}) => (
		<FormItem>
			<FormLabel>Full Name</FormLabel>
			<FormControl>
				<Input placeholder='Enter Full Name' {...field} />
			</FormControl>
		</FormItem>
	);
	const usernameRender = ({field}: {field: any}) => (
		<FormItem>
			<FormLabel>Username</FormLabel>
			<FormControl>
				<Input placeholder='Enter a Username' {...field} />
			</FormControl>
		</FormItem>
	);
	const passwordRender = ({field}: {field: any}) => (
		<FormItem>
			<FormLabel>Password</FormLabel>
			<FormControl>
				<Input
					type='password'
					required={user ? false : true}
					placeholder='Enter a Password'
					{...field}
				/>
			</FormControl>
		</FormItem>
	);
	const rolesRender = ({field}: {field: any}) => (
		<FormItem>
			<Select onValueChange={field.onChange} defaultValue={field.value}>
				<FormControl>
					<SelectTrigger>
						<SelectValue placeholder='Roles' {...field} />
					</SelectTrigger>
				</FormControl>
				<SelectContent>
					<SelectItem value='USER'>User</SelectItem>
					<SelectItem value='TECH'>Tech</SelectItem>
					<SelectItem value='ADMIN'>Admin</SelectItem>
				</SelectContent>
			</Select>
		</FormItem>
	);

	return (
		<div className='w-full p-4'>
			{error && <div className='bg-red-500 text-white p-2 rounded-md'>{error}</div>}
			<Form {...form}>
				<form className='w-full space-y-8 ' onSubmit={handleSubmit(onSubmit)}>
					<FormField name='name' control={control} defaultValue={user?.name} render={nameRender} />
					<FormField
						name='username'
						control={control}
						defaultValue={user?.username}
						render={usernameRender}
					/>
					<FormField name='password' control={control} defaultValue={''} render={passwordRender} />

					<div className='w-full flex space-x-4 '>
						<FormField
							name='role'
							control={control}
							defaultValue={user?.role}
							render={rolesRender}
						/>
					</div>
					<Button type='submit' disabled={isSubmitting}>
						{user ? 'Update User' : 'Create User'}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default UserForm;
