import {Priority} from '@prisma/client';
import {Flame} from 'lucide-react';

const TicketPriorityBadge = ({priority}: {priority: Priority}) => {
	const priorityMap: Record<
		Priority,
		{
			label: string;
			level: 1 | 2 | 3;
		}
	> = {
		HIGH: {label: 'High', level: 3},
		MEDIUM: {label: 'Medium', level: 2},
		LOW: {label: 'Low', level: 1},
	};

	return (
		<div className='flex justify-between'>
			<Flame
				size={'20px'}
				strokeWidth={0}
				className={`${priorityMap[priority].level >= 1 ? 'fill-red-500' : 'fill-none '}`}
			/>
			<Flame
				size={'20px'}
				strokeWidth={0}
				className={`${priorityMap[priority].level >= 2 ? 'fill-red-500' : 'fill-none'}`}
			/>
			<Flame
				size={'20px'}
				strokeWidth={0}
				className={`${priorityMap[priority].level >= 3 ? 'fill-red-500' : 'fill-none'}`}
			/>
		</div>
	);
};

export default TicketPriorityBadge;
