import NextAuth from "next-auth"

import authConfig from "@/auth.config"
import {PrismaAdapter} from "@auth/prisma-adapter";
import {db} from "@/lib/db";
import {getUserById} from "@/action/auth/service/auth-service";

export const {handlers, signIn, signOut, auth} = NextAuth({
    callbacks: {
        /**
         * after login ,jwt
         * @param token
         * @param session
         */
        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role
            }

            return session;
        },
        /**
         * after login
         * before seesion
         * @param token
         */
        async jwt({token}) {
            if (!token.sub) return token;

            const existUser = await getUserById(token.sub)

            if (!existUser) return token;

            token.role = existUser.role
            return token;
        },

    },
    adapter: PrismaAdapter(db),
    session: {strategy: 'jwt'},
    ...authConfig
})