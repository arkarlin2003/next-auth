
import type {NextAuthConfig} from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import {LoginSchema} from "@/schema";
import {getUserByEmail} from "@/action/auth/service";
import bcrypt from "bcryptjs";

export default {
    providers:[
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