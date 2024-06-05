import Link from 'next/link';
import {Button, buttonVariants} from './ui/button';
import ToggleMode from './ToggleMode';
import {getServerSession} from 'next-auth';
import {authOptions} from '@/app/api/auth/[...nextauth]/route';

const MainNav = async () => {
	const session = await getServerSession(authOptions);
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
						{session ? (
							<Link
								className={buttonVariants({
									variant: 'default',
								})}
								href='/api/auth/signout?callbackUrl=/'
							>
								Logout
							</Link>
						) : (
							<Link
								className={buttonVariants({
									variant: 'default',
								})}
								href='/api/auth/signin'
							>
								Login
							</Link>
						)}

						<ToggleMode />
					</div>
				</div>
			</div>
		</main>
	);
};

export default MainNav;
