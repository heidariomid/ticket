'use client';
import {Button} from './ui/button';
import {ChevronFirst, ChevronLast, ChevronLeft, ChevronRight} from 'lucide-react';
import {useRouter, useSearchParams} from 'next/navigation';

interface Props {
	itemCount: number;
	pageSize: number;
	currentPage: number;
}

const Pagination = ({itemCount, pageSize, currentPage}: Props) => {
	const pagesCount = Math.ceil(itemCount / pageSize);
	const searchParams = useSearchParams();
	const router = useRouter();
	if (pagesCount <= 1) return null;
	const changePage = (page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', page.toString());
		router.push('?' + params.toString());
	};
	return (
		<div className='flex justify-between items-center mt-5 mx-auto'>
			<Button variant={'outline'} className='bg-primary'>
				<p>
					Page {currentPage} of {pagesCount}
				</p>
			</Button>
			<div className='flex gap-x-4 '>
				<Button
					className='border-none'
					variant={'outline'}
					disabled={currentPage === 1}
					onClick={() => changePage(1)}
				>
					<ChevronFirst />
				</Button>
				<Button
					className='border-none'
					variant={'outline'}
					disabled={currentPage === 1}
					onClick={() => changePage(currentPage - 1)}
				>
					<ChevronLeft />
				</Button>
				<Button
					className='border-none'
					variant={'outline'}
					disabled={currentPage === pagesCount}
					onClick={() => changePage(currentPage + 1)}
				>
					<ChevronRight />
				</Button>
				<Button
					className='border-none'
					variant={'outline'}
					disabled={currentPage === pagesCount}
					onClick={() => changePage(pagesCount)}
				>
					<ChevronLast />
				</Button>
			</div>
			<div></div>
		</div>
	);
};

export default Pagination;
