'use client'

import React from "react";
import {Button} from "@/components/ui/button";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {socialLogin} from "@/action/auth/social-action";

const Social = () => {
    const onClick =  async (provider: 'google' | 'github') => {
         await socialLogin(provider);
    }
    return (
        <div className="w-full flex gap-2 mt-5">
            <Button variant={"outline"} className="w-full" onClick={() => onClick('google')}>
                <FcGoogle/>
            </Button>
            <Button variant={"outline"} className="w-full" onClick={() => onClick('github')}>
                <FaGithub/>
            </Button>
        </div>
    );
};

export default Social;
