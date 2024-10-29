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
import {LoginSchema} from "@/schema";
import {loginUser} from "@/action/auth";
import AuthError from "@/components/auth/auth-error";

const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof LoginSchema>) {
        setError('')
        startTransition(async () => {
            const data = await loginUser(values)
            if (data?.error) {
                setError(data?.error as string);
            }
        })
    }

    return (
        <div className="mt-3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                    <Button disabled={isPending} type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default LoginForm;
