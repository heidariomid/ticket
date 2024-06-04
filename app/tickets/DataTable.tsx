import TicketPriorityBadge from '@/components/TicketPriorityBadge';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Ticket} from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import {SearchParams} from './page';
import {localDateFormater} from '@/utils/localDateFormater';
import {ChevronDown} from 'lucide-react';

interface Props {
	tickets: Ticket[];
	searchParams: SearchParams;
}

const DataTable = ({tickets, searchParams}: Props) => {
	return (
		<div className='w-full mt-5'>
			<div className='rounded-md sm:border '>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>
								<Link href={{query: {...searchParams, orderBy: 'title'}}}>
									Title
									{searchParams.orderBy === 'title' && (
										<ChevronDown size={18} className='inline' />
									)}
								</Link>
							</TableHead>
							<TableHead>Description</TableHead>

							<TableHead>
								<div className='flex justify-center'>
									<Link href={{query: {...searchParams, orderBy: 'status'}}}>
										Status
										{searchParams.orderBy === 'status' && (
											<ChevronDown size={18} className='inline' />
										)}
									</Link>
								</div>
							</TableHead>
							<TableHead>
								<div className='flex justify-center'>
									<Link href={{query: {...searchParams, orderBy: 'priority'}}}>
										Priority
										{searchParams.orderBy === 'priority' && (
											<ChevronDown size={18} className='inline' />
										)}
									</Link>
								</div>
							</TableHead>
							<TableHead>
								<div className='flex justify-center'>
									<Link href={{query: {...searchParams, orderBy: 'createdAt'}}}>
										Created At
										{searchParams.orderBy === 'createdAt' && (
											<ChevronDown size={18} className='inline' />
										)}
									</Link>
								</div>
							</TableHead>
							<TableHead>
								<div className='flex justify-center'>
									<Link href={{query: {...searchParams, orderBy: 'updatedAt'}}}>
										Updated At
										{searchParams.orderBy === 'updatedAt' && (
											<ChevronDown size={18} className='inline' />
										)}
									</Link>
								</div>
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
