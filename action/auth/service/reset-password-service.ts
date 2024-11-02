'use server'

import {db} from "@/lib/db";
import {v4 as uuidv4} from 'uuid';

export const getResetPasswordByEmail = async (email: string) => {
    const resetPassword = await db.resetPasswordVerificationToken?.findFirst({
        where: {
            email,
        }
    })

    return resetPassword;
}

export const getResetPasswordByToken = async (token: string) => {
    const resetPassword = await db.resetPasswordVerificationToken.findFirst({
        where:{
            token
        }
    })

    return resetPassword;
}

export const deleteResetPasswordToken = async (id: string) => {
    await db.resetPasswordVerificationToken.delete({
        where:{
            id
        }
    })
}

export const generateResetPasswordToken = async (email: string) => {
    const newToken = uuidv4()
    const expireDate = new Date(new Date().getTime() + 3600 * 1000)

    const existResetPasswordToken = await getResetPasswordByEmail(email)
    if(existResetPasswordToken) {
        await deleteResetPasswordToken(existResetPasswordToken.id)
    }

    const newResetPasswordToken = await db.resetPasswordVerificationToken?.create({
        data: {
            email,
            expires:expireDate,
            token: newToken,
        }
    })

    return newResetPasswordToken
}