'use server'
import {z} from "zod";
import {RegisterSchema} from "@/schema";
import bcrypt from "bcryptjs";
import {getUserByEmail} from "@/action/auth/service/auth-service";
import {db} from "@/lib/db";
import {generateVerificationToken} from "@/action/auth/service/verification-token-service";
import {sendVerificationToken} from "@/lib/mail";

export const createUser = async (values: z.infer<typeof RegisterSchema>) => {
    const validated = RegisterSchema.safeParse(values);

    if (validated.success) {
        const {email, name, password} = validated.data;

        const hashPwd = await bcrypt.hashSync(password, 10);

        const existUser = await getUserByEmail(email);

        if (existUser) return {
            error: "Email already exist",
        };

        const user = await db.user.create({
            data: {
                email: email,
                name: name,
                password: hashPwd,
            }
        })

        const generateToken = await generateVerificationToken(user.email)

        await sendVerificationToken(generateToken.email, generateToken.token)
        return {
            success: "user created successfully",
        }
    } else {
        return {
            error: "Invail Fields!"
        };
    }
};
