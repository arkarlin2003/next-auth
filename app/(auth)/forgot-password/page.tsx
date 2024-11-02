import GuestLayout from "@/components/auth/guest-layout";
import CardWrapper from "@/components/auth/card-wrapper";
import ResetPasswordForm from "@/components/auth/reset-password-form";

const ResetPassword = () => {
    return (
        <GuestLayout>
            <CardWrapper title={'Forgot Password'} backButtonLabel={'back to login'} backButtonUrl={'/login'} notSocial>
                <ResetPasswordForm/>
            </CardWrapper>
        </GuestLayout>
    )
}

export default ResetPassword