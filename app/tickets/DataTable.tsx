import TicketPriorityBadge from '@/components/TicketPriorityBadge';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {localDateFormater} from '@/utils/LocalDateFormater';
import {Ticket} from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface Props {
	tickets: Ticket[];
}

const DataTable = ({tickets}: Props) => {
	return (
		<div className='w-full mt-5'>
			<div className='rounded-md sm:border '>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Title</TableHead>
							<TableHead>Description</TableHead>

							<TableHead>
								<div className='flex justify-center'>Status</div>
							</TableHead>
							<TableHead>
								<div className='flex justify-center'>Priority</div>
							</TableHead>
							<TableHead>
								<div className='flex justify-center'>Created At</div>
							</TableHead>
							<TableHead>
								<div className='flex justify-center'>Updated At</div>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tickets &&
							tickets.map((ticket) => (
								<TableRow key={ticket.id}>
									<TableCell>{ticket.id}</TableCell>
									<TableCell>
										<Link href={`/tickets/${ticket.id}`} target='_blank'>
											{ticket.title}
										</Link>
									</TableCell>
									<TableCell>{ticket.description}</TableCell>
									<TableCell>
										<div className='flex justify-center'>
											<TicketStatusBadge status={ticket.status} />
										</div>
									</TableCell>
									<TableCell>
										<div className='flex justify-center'>
											<TicketPriorityBadge priority={ticket.priority} />
										</div>
									</TableCell>
									<TableCell>{localDateFormater(ticket.createdAt)}</TableCell>
									<TableCell>{localDateFormater(ticket.updatedAt)}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default DataTable;
