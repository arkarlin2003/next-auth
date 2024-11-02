'use client'

import Image from "next/image";
import Loading from "@/public/fade-stagger-circles.svg";
import AuthError from "@/components/auth/auth-error";
import AuthSuccess from "@/components/auth/auth-success";
import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {emailVerification} from "@/action/auth/verification-action";


const EmailVerificationForm = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get("token");
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const handleVerification = useCallback(async () => {
        setError("");
        setSuccess("");
        const data = await emailVerification(token!)
        if (data?.error) {
            setError(data.error)
        }
        if (data?.success) {
            setSuccess(data.success)
        }
    }, [token])

    useEffect(() => {
        handleVerification()
    }, [handleVerification]);
    return (
        <div className='my-3'>
            {
                !error && !success && (
                    <Image src={Loading} alt={'loading...'} className='mx-auto' width={70} height={70}/>
                )
            }
            <AuthError message={error}/>
            <AuthSuccess message={success}/>
        </div>
    )
}

export default EmailVerificationForm;