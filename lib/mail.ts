import { Resend } from 'resend';

const resend = new Resend('re_AZyX6oTL_2uKJCkopqngP8TpPYf7VyeCG');


export const sendVerificationToken = async (email:string,token:string) => {
    const confirmLink = `http://localhost:3000/new-verification?token=${token}`
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'arkarlin486@gmail.com',
            subject: 'Hello World',
            html: `<p>Congrats on sending your <a href="${confirmLink}">link</a>!</p>`
        })
        return {
            success:"Confirmation sent mail!",
        };
    }catch (error) {
        return {
            error: error,
        }
    }

}


export const sendResetPasswordToken = async (email:string,token:string) => {
    const confirmLink = `http://localhost:3000/reset-password?token=${token}`
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'arkarlin486@gmail.com',
            subject: 'Hello World',
            html: `<p>Congrats on sending your <a href="${confirmLink}">link</a>!</p>`
        })
        return {
            success:"Confirmation sent mail!",
        };
    }catch (error) {
        return{
            error: error,
        }
    }
}