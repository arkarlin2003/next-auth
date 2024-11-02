'use client'

import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import AuthError from "@/components/auth/auth-error";
import AuthSuccess from "@/components/auth/auth-success";
import {Button} from "@/components/ui/button";
import React, {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {ResetPasswordSchema} from "@/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {resetPassword} from "@/action/auth/reset-password-action";


const ResetPasswordForm = () => {
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: ""
        }
    })

    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
        setSuccess("");
        setError("")
        startTransition(async () => {
            const data = await resetPassword(values)
            if (data?.error) {
                setError(data.error as string);
            }
            if (data?.success) {
                setSuccess(data.success as string);
            }
        })
    }
    return (
        <div className='mt-5'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="example@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <AuthError message={error}/>
                    <AuthSuccess message={success}/>

                    <Button disabled={isPending} type="submit" className="w-full">
                        Send Email
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ResetPasswordForm