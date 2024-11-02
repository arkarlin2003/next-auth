import {
    deleteVerificationToken,
    getVerificationTokenByToken
} from "@/action/auth/service/verification-token-service";
import {getUserByEmail, updateUserEmailVerified} from "@/action/auth/service/auth-service";

export const emailVerification = async(token:string) => {
    const existToken = await getVerificationTokenByToken(token)
    if (!existToken) return {
        error: "Token does not exist",
    }

    const expired = new Date(existToken.expires) < new Date();

    if(expired){
        return {
            error:"Token has expired",
        }
    }

    const existUser = await getUserByEmail(existToken.email)
    if (!existUser) return {error: "Email does not exist"};

    await updateUserEmailVerified(existUser.email)
    await deleteVerificationToken(existToken.id)
    return {
        success: "Email verified",
    }
}