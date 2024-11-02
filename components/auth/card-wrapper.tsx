'use client'

import React from "react";
import Link from "next/link";

import Social from "./social";

interface CardWrapperProps {
    title: string;
    backButtonLabel: string;
    backButtonUrl: string;
    children?: React.ReactNode;
    notSocial?: boolean;
}

const CardWrapper = ({
                         title,
                         backButtonLabel,
                         backButtonUrl,
                         children,
                         notSocial = false,
                     }: CardWrapperProps) => {
    return (
        <section className="p-6 shadow-sm rounded-xl bg-white w-96">
            <div className="w-full text-center space-y-1">
                <h1 className="text-xl font-bold">🔐 Auth</h1>
                <h3 className="text-sm text-gray-500">{title}</h3>
            </div>

            {children}
            {
                !notSocial && (
                    <Social/>
                )
            }
            <div className="w-full text-center mt-4">
                <Link href={backButtonUrl} className="text-xs font-medium ">
                    {backButtonLabel}
                </Link>
            </div>
        </section>
    );
};

export default CardWrapper;
