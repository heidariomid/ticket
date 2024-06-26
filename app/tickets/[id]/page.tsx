import prisma from '@/prisma/db';
import TicketDetail from './TicketDetail';

interface Props {
	params: {id: string};
}

const Ticket = async ({params}: Props) => {
	const ticket = await prisma.ticket.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});
	const users = await prisma.user.findMany();

	if (!ticket) {
		return (
			<div className='flex justify-center max-w-xs  mt-10 p-2 items-center text-white bg-destructive'>
				Ticket not found
			</div>
		);
	}

	return (
		<div>
			<TicketDetail ticket={ticket} users={users} />
		</div>
	);
};

export default Ticket;
