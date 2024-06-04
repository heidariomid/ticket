import {Ticket, User} from '@prisma/client';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import TicketPriorityBadge from '@/components/TicketPriorityBadge';
import {localDateFormater} from '@/utils/localDateFormater';
import Link from 'next/link';
import {buttonVariants} from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import DeleteButton from './DeleteButton';
import AssignedTicket from '@/components/AssignedTicket';

interface Props {
	ticket: Ticket;
	users: User[];
}

const TicketDetail = ({ticket, users}: Props) => {
	return (
		<div className='lg:grid lg:grid-cols-4'>
			<Card className='mx-4 mb-4 lg:col-span-3'>
				<CardHeader>
					<div className='flex justify-between mb-10'>
						<TicketStatusBadge status={ticket.status} />

						<TicketPriorityBadge priority={ticket.priority} />
					</div>
					<CardTitle>{ticket.title}</CardTitle>
					<CardDescription className='flex space-x-5'>
						<span className='text-gray-500 '>Created at:</span>

						{localDateFormater(ticket.createdAt)}

						<span className='text-gray-500'>Updated at:</span>
						{localDateFormater(ticket.updatedAt)}
					</CardDescription>
				</CardHeader>
				<CardContent className='prose dark:prose-invert'>
					<ReactMarkdown>{ticket.description}</ReactMarkdown>
				</CardContent>
				<div className='m-4 flex  gap-2'>
					<AssignedTicket ticket={ticket} users={users} />
					<Link
						className={buttonVariants({
							variant: 'default',
						})}
						href={`/tickets/edit/${ticket.id}`}
					>
						Edit Ticket
					</Link>
					<DeleteButton ticketId={ticket.id} />
				</div>
			</Card>
		</div>
	);
};

export default TicketDetail;
