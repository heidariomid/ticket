import UserForm from '@/components/UserForm';
import prisma from '@/prisma/db';

interface Props {
	params: {id: string};
}

const User = async ({params}: Props) => {
	const user = await prisma.user.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});

	if (!user) {
		return (
			<div className='flex justify-center max-w-xs  mt-10 p-2 items-center text-white bg-destructive'>
				User not found
			</div>
		);
	}
	user.password = '';
	return <UserForm user={user} />;
};

export default User;
