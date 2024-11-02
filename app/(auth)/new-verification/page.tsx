import GuestLayout from "@/components/auth/guest-layout";
import CardWrapper from "@/components/auth/card-wrapper";
import EmailVerificationForm from "@/components/auth/email-verification-form";
import {Suspense} from "react";

const NewVerificationPage = () => {

    return (
        <GuestLayout>
            <CardWrapper title={'Email Verification'} backButtonLabel={'back to login'} backButtonUrl={'/login'}
                         notSocial>
                <Suspense fallback={null}>
                    <EmailVerificationForm/>
                </Suspense>
            </CardWrapper>
        </GuestLayout>

    )
}


export default NewVerificationPage