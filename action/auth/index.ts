'use server'

import {LoginSchema, RegisterSchema} from "@/schema";
import { z } from "zod";
import { getUserByEmail } from "./service";
import {db} from "@/lib/db";
import bcrypt from "bcryptjs"
import {AuthError} from "@auth/core/errors";
import {signIn} from "@/auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";

export const createUser = async (values: z.infer<typeof RegisterSchema>) => {
  const validated = RegisterSchema.safeParse(values);

  if (validated.success) {
    const { email, name, password } = validated.data;

    const hashPwd = await bcrypt.hashSync(password, 10);

    const existUser = await getUserByEmail(email);

    if (existUser) return {
      error: "Email already exist",
    };

    await db.user.create({
      data:{
        email:email,
        name:name,
        password:hashPwd,
      }
    })

    return {
      success: "user created successfully",
    }
  } else {
    return {
      error:"Invail Fields!"
    };
  }
};


export const loginUser = async (values: z.infer<typeof LoginSchema>) => {
  const validated = LoginSchema.safeParse(values);
  if (validated.success) {
    const { email, password } = validated.data;
    try {
      await signIn("credentials",{
        email,
        password,
        redirectTo:DEFAULT_LOGIN_REDIRECT
      });
    }catch(err) {
      if(err instanceof AuthError){
        switch (err.type) {
          case "CredentialsSignin":
            return {
              error:"Invalid Credentials",
            }
          default:
            return {
              error:"Something went wrong",
            }
        }
      }
      throw err;
    }
  }else{
    return {
      error: "Invail Fields!"
    }
  }
}