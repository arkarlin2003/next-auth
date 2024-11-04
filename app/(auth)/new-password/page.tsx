import GuestLayout from "@/components/auth/guest-layout";
import CardWrapper from "@/components/auth/card-wrapper";
import NewPasswordForm from "@/components/auth/new-password-form";
import {Suspense} from "react";


const NewPasswordPage = () => {
    return (
        <GuestLayout>
            <CardWrapper title={'New Password'} backButtonLabel={'back to login'} backButtonUrl={'/login'} notSocial>
                <Suspense fallback={null}>
                    <NewPasswordForm/>
                </Suspense>
            </CardWrapper>
        </GuestLayout>
    )
}

export default NewPasswordPage