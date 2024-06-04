import prisma from '@/prisma/db';
import {userSchema} from '@/validationSchemas/user';
import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
export async function POST(req: NextRequest, res: NextResponse) {
	const body = await req.json();
	const validation = userSchema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json(validation.error.format(), {status: 400});
	}
	const dulicateUser = await prisma.user.findUnique({
		where: {
			username: body.username,
		},
	});
	if (dulicateUser) {
		return NextResponse.json({message: 'Username already exists'}, {status: 400});
	}
	const hashedPassword = await bcrypt.hash(body.password, 10);
	body.password = hashedPassword;
	const newUser = await prisma.user.create({
		data: {...body},
	});
	return NextResponse.json(newUser, {status: 201});
}
