'use client';
import {Ticket, User} from '@prisma/client';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from './ui/select';

interface Props {
	ticket: Ticket;
	users: User[];
}

const AssignedTicket = ({ticket, users}: Props) => {
	const [isAssigning, setIsAssigning] = useState(false);
	const [error, setError] = useState('');

	const handler = async (userId: string) => {
		try {
			setError('');
			setIsAssigning(true);

			await axios
				.patch(`/api/ticket/${ticket.id}`, {
					assignedToUserId: userId === '0' ? null : userId,
				})
				.catch((error) => {
					setError('Unable to assign ticket');
				});

			setIsAssigning(false);
		} catch (error) {
			setError('An error occurred');
			setIsAssigning(false);
		}
	};
	return (
		<>
			{error && <div className='bg-red-500 text-white p-2 rounded-md'>{error}</div>}

			<Select
				onValueChange={handler}
				defaultValue={ticket.assignedToUserId?.toString() || '0'}
				disabled={isAssigning}
			>
				<SelectTrigger className='w-[200px]'>
					<SelectValue
						placeholder='Select User'
						defaultValue={ticket.assignedToUserId?.toString() || '0'}
					/>
				</SelectTrigger>

				<SelectContent>
					<SelectItem value='0'>Unassigned</SelectItem>
					{users.map((user) => (
						<SelectItem key={user.id} value={user.id.toString()}>
							{user.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</>
	);
};

export default AssignedTicket;
