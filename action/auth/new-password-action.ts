'use server'

import {z} from "zod";
import {NewPasswordSchema} from "@/schema";
import {deleteResetPasswordToken, getResetPasswordByToken} from "@/action/auth/service/reset-password-service";
import {getUserByEmail, updateUserPassword} from "@/action/auth/service/auth-service";
import bcrypt from "bcryptjs";


export const newPassword = async (values:z.infer<typeof NewPasswordSchema>) => {
    const validate = NewPasswordSchema.safeParse(values);

    if(!validate.success){
        return {
            error:'Invalid Password',
        }
    }

    const {token}  = validate.data
    if(!token){
        return {
            error:"Missing Token",
        }
    }

    const existResetPwdToken = await getResetPasswordByToken(token)
    if(!existResetPwdToken){
        return {
            error:"Token does not exist",
        }
    }

    const existUser = await getUserByEmail(existResetPwdToken.email)
    if (!existUser) return {
        error: "Email does not exist",
    }

    const hasExpired = new Date(existResetPwdToken.expires) < new Date();
    if(!hasExpired) return {
        error:"Token expired",
    }

    const {password} = validate.data
    const hashPwd = bcrypt.hashSync(password,10)

    await updateUserPassword(existUser.email,hashPwd)
    await deleteResetPasswordToken(existResetPwdToken.id)
    return {
        success:'Password Updated'
    }

}