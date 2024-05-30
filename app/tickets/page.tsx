import prisma from '@/prisma/db';
import DataTable from './DataTable';
import Link from 'next/link';
import {buttonVariants} from '@/components/ui/button';

const Tickets = async () => {
	const tickets = await prisma.ticket.findMany();
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
		</div>
	);
};

export default Tickets;
