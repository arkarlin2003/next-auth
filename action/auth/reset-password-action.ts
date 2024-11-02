
import {z} from 'zod';
import {ResetPasswordSchema} from "@/schema";
import {generateResetPasswordToken} from "@/action/auth/service/reset-password-service";
import {sendResetPasswordToken} from "@/lib/mail";
import {getUserByEmail} from "@/action/auth/service/auth-service";

export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const validate = ResetPasswordSchema.safeParse(values);

    if (!validate.success) {
        return {
            error: 'Invalid Email!'
        }
    }

    const {email} = validate.data
    const existResetPassword = await getUserByEmail(email)

    if (!existResetPassword) return {error: "Email does not exist"};

    const resetPasswordToken = await generateResetPasswordToken(email)
    return await sendResetPasswordToken(resetPasswordToken?.email, resetPasswordToken?.token)

}