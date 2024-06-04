import prisma from '@/prisma/db';
import {userSchema} from '@/validationSchemas/user';
import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
interface Props {
	params: {id: string};
}

export async function PATCH(req: NextRequest, {params}: Props) {
	const body = await req.json();
	const validation = userSchema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json(validation.error.format(), {status: 400});
	}
	const user = await prisma.user.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});
	if (!user) {
		return NextResponse.json({message: 'User not found'}, {status: 404});
	}
	if (body?.password && body.password !== '') {
		const hashedPassword = await bcrypt.hash(body.password, 10);
		body.password = hashedPassword;
	} else {
		delete body.password;
	}
	if (user.username !== body.username) {
		const userExists = await prisma.user.findUnique({
			where: {
				username: body.username,
			},
		});
		if (userExists) {
			return NextResponse.json({message: 'Username already exists'}, {status: 400});
		}
	}
	const updateuser = await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			...body,
		},
	});
	return NextResponse.json({
		message: 'user updated successfully',
		data: updateuser,
	});
}

export async function DELETE(req: NextRequest, {params}: Props) {
	const user = await prisma.user.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});
	if (!user) {
		return NextResponse.json({message: 'user not found'}, {status: 404});
	}
	await prisma.user.delete({
		where: {
			id: user.id,
		},
	});
	return NextResponse.json({message: 'user deleted successfully'});
}
