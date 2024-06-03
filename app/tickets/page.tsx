import prisma from '@/prisma/db';
import DataTable from './DataTable';
import Link from 'next/link';
import {buttonVariants} from '@/components/ui/button';
import Pagination from '@/components/Pagination';
interface Props {
	searchParams: {page: string};
}

const Tickets = async ({searchParams}: Props) => {
	const pageSize = 10;
	const page = parseInt(searchParams.page) || 1;
	const ticketCount = await prisma.ticket.count();
	const tickets = await prisma.ticket.findMany({
		skip: (page - 1) * pageSize,
		take: pageSize,
	});
	return (
		<div>
			<Link
				className={buttonVariants({
					variant: 'default',
				})}
				href='/tickets/new'
			>
				New Ticket
			</Link>
			<DataTable tickets={tickets} />
			<Pagination itemCount={ticketCount} pageSize={pageSize} currentPage={page} />
		</div>
	);
};

export default Tickets;
