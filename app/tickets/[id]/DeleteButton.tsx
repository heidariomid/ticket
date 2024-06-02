'use client';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {buttonVariants} from '@/components/ui/button';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

const DeleteButton = ({ticketId}: {ticketId: number}) => {
	const router = useRouter();
	const [error, setError] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);
	const handler = async () => {
		try {
			setIsDeleting(true);
			setError('');
			await axios.delete(`/api/ticket/${ticketId}`);
			setIsDeleting(false);
			router.push('/tickets');
			router.refresh();
		} catch (error) {
			setError('An error occurred');
			setIsDeleting(false);
		}
	};

	return (
		<>
			{error && (
				<div className='bg-red-500 text-white p-2 rounded-md absolute top-[50%] right-[50%]'>
					{error}
				</div>
			)}

			<AlertDialog>
				<AlertDialogTrigger
					disabled={isDeleting}
					className={buttonVariants({
						variant: 'destructive',
					})}
				>
					Delete Ticket
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your ticket.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							disabled={isDeleting}
							onClick={handler}
							className={buttonVariants({
								variant: 'destructive',
							})}
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default DeleteButton;
