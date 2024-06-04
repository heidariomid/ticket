'use client';
import {useRouter, useSearchParams} from 'next/navigation';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from './ui/select';
import {SelectGroup} from '@radix-ui/react-select';

const statuses: {
	label: string;
	value?: string;
}[] = [
	{label: 'Open/Started'},
	{label: 'Open', value: 'OPEN'},
	{label: 'Started', value: 'STARTED'},
	{label: 'Closed', value: 'CLOSED'},
];

const StatusFilter = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handler = (status: string) => {
		const params = new URLSearchParams(searchParams);
		if (status) {
			params.set('status', status);
		} else {
			params.delete('status');
		}
		router.push('?' + params.toString());
	};
	return (
		<Select onValueChange={handler} defaultValue={searchParams.get('status') || ''}>
			<SelectTrigger className='w-[200px]'>
				<SelectValue placeholder='Status' {...statuses} />
			</SelectTrigger>

			<SelectContent>
				<SelectGroup>
					{statuses.map((status) => (
						<SelectItem key={status.value || '0'} value={status.value || '0'}>
							{status.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default StatusFilter;
