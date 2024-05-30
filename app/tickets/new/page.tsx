import dynamic from 'next/dynamic';
const TicketForm = dynamic(() => import('@/components/TicketForm'), {ssr: false});
const NewTicket = () => {
	return (
		<div>
			<div className='w-full flex justify-center mb-4 '>
				<h1 className='text-2xl rounded-md font-semibold text-slate-950 bg-primary   w-fit px-3 py-1'>
					New Ticket
				</h1>
			</div>
			<TicketForm />
		</div>
	);
};

export default NewTicket;
