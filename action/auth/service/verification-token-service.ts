'use server'

import {db} from "@/lib/db";
import {v4 as uuidv4} from 'uuid';

/**
 * getVerificationToken with email
 * @param email
 */
export const getVerificationTokenByEmail = async (email: string) => {
    const verificationToken = await db.verificationToken.findFirst({
        where: {
            email: email,
        }
    })
    return verificationToken;
}

/**
 * getVerificationToken with token
 * @param token
 */
export const getVerificationTokenByToken = async (token: string) => {
    const verificationToken = await db.verificationToken.findFirst({
        where: {
            token: token
        }
    })

    return verificationToken;
}

/**
 * delete verificationtoken
 * @param id
 */
export const deleteVerificationToken = async (id: string) => {
    await db.verificationToken.delete({
        where: {
            id: id
        }
    })
}

/**
 * generateverificationtoken
 * @param email
 */
export const generateVerificationToken = async (email: string) => {
    const newToken = uuidv4()
    const newExpire = new Date(new Date().getTime() + 3600 * 1000)

    const existVerificationToken = await getVerificationTokenByEmail(email)
    if (existVerificationToken) {
        await deleteVerificationToken(existVerificationToken.id)
    }

    const newVerificationToken = await db.verificationToken.create({
        data: {
            email,
            token: newToken,
            expires: newExpire
        }
    })

    return newVerificationToken
}