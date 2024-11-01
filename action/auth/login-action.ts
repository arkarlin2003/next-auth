// 'use server'

import {z} from "zod";
import {LoginSchema} from "@/schema";
import {signIn} from "@/auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {AuthError} from "@auth/core/errors";
import {getUserByEmail} from "@/action/auth/service/auth-service";
import {generateVerificationToken} from "@/action/auth/service/verification-token-service";
import {sendVerificationToken} from "@/lib/mail";

/**
 * login
 * @param values
 */
export const loginUser = async (values: z.infer<typeof LoginSchema>) => {
    const validated = LoginSchema.safeParse(values);
    if (validated.success) {
        const { email, password } = validated.data;

        const existUser = await getUserByEmail(email);

        if(existUser?.email && !existUser?.emailVerified){
            const verificationToken = await generateVerificationToken(email)
            const response = await sendVerificationToken(verificationToken.email, verificationToken.token)
            return response;
        }
        console.log('hi')
        try {
            await signIn("credentials",{
                email,
                password,
                redirectTo:DEFAULT_LOGIN_REDIRECT
            });
        }catch(err) {
            if(err instanceof AuthError){
                switch (err.type) {
                    case "CredentialsSignin":
                        return {
                            error:"Invalid Credentials",
                        }
                    default:
                        return {
                            error:"Something went wrong",
                        }
                }
            }
            throw err;
        }
    }else{
        return {
            error: "Invail Fields!"
        }
    }
}