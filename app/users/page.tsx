import {buttonVariants} from '@/components/ui/button';
import Link from 'next/link';

const Users = () => {
	return (
		<div>
			<Link
				className={buttonVariants({
					variant: 'default',
				})}
				href='/users/new'
			>
				New User
			</Link>
		</div>
	);
};

export default Users;
