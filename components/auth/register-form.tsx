"use client";

import React, {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {RegisterSchema} from "@/schema";
import AuthSuccess from "@/components/auth/auth-success";
import AuthError from "@/components/auth/auth-error";
import {createUser} from "@/action/auth/register-action"

const RegisterForm = () => {
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof RegisterSchema>) {
        startTransition(async () => {
            setSuccess("");
            setError("")
            const data  = await createUser(values);
            if (data.error) {
                setError(data.error as string);
            } else {
                setSuccess(data.success as string);
                form.reset()
            }
        })
    }

    return (
        <div className="mt-3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="your name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="........." {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <AuthError message={error}/>
                    <AuthSuccess message={success}/>
                    <Button disabled={isPending} type="submit" className="w-full">
                        {
                            isPending ? (
                                <svg className="animate-spin h-5 border-2 rounded-full w-5" viewBox="0 0 24 24">
                                </svg>
                            ) : 'Register'
                        }
                    </Button>

                </form>
            </Form>
        </div>
    );
};

export default RegisterForm;
