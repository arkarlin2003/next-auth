
import type {NextAuthConfig} from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import {LoginSchema} from "@/schema";
import {getUserByEmail} from "@/action/auth/service/auth-service";
import bcrypt from "bcryptjs";

export default {
    providers:[
        /**
         * github login
         */
        GitHub({
            clientId:process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITHUB_CLIENT_SECRET,
        }),
        /**
         * google login
         */
        Google({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        }),
        /**
         * credential login
         */
        Credentials({
            async authorize(credentials){
                const validateFields = LoginSchema.safeParse(credentials)

                if(validateFields.success){
                    const {email,password} = validateFields.data

                    const user = await getUserByEmail(email)
                    if(!user || !user?.password) return null;
                    const passwordMatch = await bcrypt.compare(password, user.password)
                    if(passwordMatch) return user;
                }
                return null;
            }
        })
    ],
} satisfies  NextAuthConfig