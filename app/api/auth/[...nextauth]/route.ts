import prisma from '@/prisma/db';
import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				username: {label: 'Username', type: 'text', placeholder: 'Enter your username'},
				password: {label: 'Password', type: 'password', placeholder: 'Enter your password'},
			},
			authorize: async (credentials) => {
				const user = await prisma.user.findUnique({
					where: {
						username: credentials!.username,
					},
				});
				if (!user) return null;

				const matchPassword = await bcrypt.compare(credentials!.password, user.password);
				if (matchPassword) return user;
				return null;
			},
		}),
	],
	callbacks: {
		async jwt({token, account, user}) {
			if (account) {
				token.role = user.role;
			}
			return token;
		},
		session: async ({session, token}) => {
			if (session.user) {
				session.user.role = token.role || 'USER';
			}
			return session;
		},
	},
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
