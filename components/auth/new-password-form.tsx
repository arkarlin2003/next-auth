'use client'

import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import AuthError from "@/components/auth/auth-error";
import AuthSuccess from "@/components/auth/auth-success";
import {Button} from "@/components/ui/button";
import React, {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {NewPasswordSchema} from "@/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {newPassword} from "@/action/auth/new-password-action";
import {useSearchParams} from "next/navigation";


const NewPasswordForm = () => {
    const searchQuery = useSearchParams()
    const token =searchQuery.get("token")

    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
            token: token
        }
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setSuccess("");
        setError("")
        startTransition(async () => {
            const data = await newPassword(values)
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
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="********" {...field} type={'password'} />
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

export default NewPasswordForm