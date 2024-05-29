import Link from 'next/link';
import {Button} from './ui/button';
import ToggleMode from './ToggleMode';

const MainNav = () => {
	return (
		<main className='flex flex-col items-center border-b mb-5 px-5 py-3 '>
			<div className='max-w-6xl w-full'>
				<div className='flex justify-between '>
					<div className='flex items-center gap-10'>
						<Link href='/'>Dashboard</Link>
						<Link href='/tickets'>Tickets</Link>
						<Link href='/users'>Users</Link>
					</div>
					<div className='flex items-center gap-5'>
						<Button>
							<Link href='/login'>Login</Link>
						</Button>
						<ToggleMode />
					</div>
				</div>
			</div>
		</main>
	);
};

export default MainNav;
