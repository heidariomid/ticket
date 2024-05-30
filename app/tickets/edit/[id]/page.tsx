import prisma from '@/prisma/db';
import dynamic from 'next/dynamic';
const TicketForm = dynamic(() => import('@/components/TicketForm'), {ssr: false});

interface Props {
	params: {id: string};
}

const EditTicket = async ({params}: Props) => {
	const ticket = await prisma.ticket.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});

	if (!ticket) {
		return (
			<div className='flex justify-center max-w-xs  mt-10 p-2 items-center text-white bg-destructive'>
				Ticket not found
			</div>
		);
	}

	return (
		<div>
			<div className='w-full flex justify-center mb-4 '>
				<h1 className='text-2xl rounded-md font-semibold text-slate-950 bg-primary   w-fit px-3 py-1'>
					Edit Ticket
				</h1>
			</div>
			<TicketForm ticket={ticket} />
		</div>
	);
};

export default EditTicket;
