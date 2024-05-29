import {Priority} from '@prisma/client';
import {Badge} from './ui/badge';
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
		<>
			<Flame className={`${priorityMap[priority].level >= 1 ? 'text-amber-500' : 'text-muted'}`} />
			<Flame className={`${priorityMap[priority].level >= 2 ? 'text-amber-500' : 'text-muted'}`} />
			<Flame className={`${priorityMap[priority].level >= 3 ? 'text-amber-500' : 'text-muted'}`} />
		</>
	);
};

export default TicketPriorityBadge;
