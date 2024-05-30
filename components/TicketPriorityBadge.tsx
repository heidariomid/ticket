import {Priority} from '@prisma/client';
import {Badge} from './ui/badge';
import {Circle} from 'lucide-react';

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
		<>
			<Circle
				size={'20px'}
				strokeWidth={0}
				className={`${priorityMap[priority].level >= 1 ? 'fill-amber-500' : 'fill-none '}`}
			/>
			<Circle
				size={'20px'}
				strokeWidth={0}
				className={`${priorityMap[priority].level >= 2 ? 'fill-amber-500' : 'fill-none'}`}
			/>
			<Circle
				size={'20px'}
				strokeWidth={0}
				className={`${priorityMap[priority].level >= 3 ? 'fill-amber-500' : 'fill-none'}`}
			/>
		</>
	);
};

export default TicketPriorityBadge;
