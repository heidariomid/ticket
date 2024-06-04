import prisma from '@/prisma/db';
import DataTable from './DataTable';
import Link from 'next/link';
import {buttonVariants} from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';
import {Status, Ticket} from '@prisma/client';
export interface SearchParams {
	page: string;
	status: Status;
	orderBy: keyof Ticket;
}

const Tickets = async ({searchParams}: {searchParams: SearchParams}) => {
	const pageSize = 10;
	const page = parseInt(searchParams.page) || 1;

	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
	let where = {};
	if (status) {
		where = {status};
	} else {
		where = {
			NOT: [{status: 'CLOSED' as Status}],
		};
	}

	const tickets = await prisma.ticket.findMany({
		where,
		skip: (page - 1) * pageSize,
		take: pageSize,
		orderBy: searchParams.orderBy && {[searchParams.orderBy]: 'desc'},
	});
	const ticketCount = await prisma.ticket.count({where});
	return (
		<div>
			<div className='flex justify-between '>
				<Link
					className={buttonVariants({
						variant: 'default',
					})}
					href='/tickets/new'
				>
					New Ticket
				</Link>
				<StatusFilter />
			</div>
			<DataTable tickets={tickets} searchParams={searchParams} />
			<Pagination itemCount={ticketCount} pageSize={pageSize} currentPage={page} />
		</div>
	);
};

export default Tickets;
