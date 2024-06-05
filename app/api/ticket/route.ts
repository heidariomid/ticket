import prisma from '@/prisma/db';
import {ticketSchema} from '@/validationSchemas/ticket';
import {getServerSession} from 'next-auth';
import {NextRequest, NextResponse} from 'next/server';
import {authOptions} from '../auth/[...nextauth]/route';

export async function POST(req: NextRequest, res: NextResponse) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({error: 'Unauthorized'}, {status: 401});
	}
	const body = await req.json();
	const validation = ticketSchema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json(validation.error.format(), {status: 400});
	}
	const newTicket = await prisma.ticket.create({
		data: {...body},
	});
	return NextResponse.json(newTicket, {status: 201});
}
