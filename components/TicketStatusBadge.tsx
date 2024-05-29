import {Status} from '@prisma/client';
import {Badge} from './ui/badge';

const TicketStatusBadge = ({status}: {status: Status}) => {
	const statusMap: Record<
		Status,
		{
			label: string;
			color: 'bg-red-500' | 'bg-green-500' | 'bg-yellow-500';
			hoverColor: 'bg-red-600' | 'bg-green-600' | 'bg-yellow-600';
		}
	> = {
		OPEN: {label: 'Open', color: 'bg-green-500', hoverColor: 'bg-green-600'},
		STARTED: {label: 'Started', color: 'bg-yellow-500', hoverColor: 'bg-yellow-600'},
		CLOSED: {label: 'Closed', color: 'bg-red-500', hoverColor: 'bg-red-600'},
	};

	return (
		<Badge
			className={` text-background ${statusMap[status].color} hover:${statusMap[status].hoverColor} hover:cursor-pointer`}
		>
			{statusMap[status].label}
		</Badge>
	);
};

export default TicketStatusBadge;
