import dynamic from 'next/dynamic';
const UserForm = dynamic(() => import('@/components/UserForm'), {ssr: false});
import {getServerSession} from 'next-auth';
import {authOptions} from '@/app/api/auth/[...nextauth]/route';

const NewUser = async () => {
	const session = await getServerSession(authOptions);

	if (session?.user.role !== 'ADMIN') {
		return <div className='text-destructive'>Admin access required.</div>;
	}
	return (
		<div>
			<div className='w-full flex justify-center mb-4 '>
				<h1 className='text-2xl rounded-md font-semibold text-slate-950 bg-primary   w-fit px-3 py-1'>
					New User
				</h1>
			</div>
			<UserForm />
		</div>
	);
};

export default NewUser;
