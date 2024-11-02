
'use server'

import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};


export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id:id
    }
  })

  return user;
}

export const updateUserEmailVerified = async (email: string) => {
  await db.user.update({
    where: {
      email: email,
    },
    data: {
      email: email,
      emailVerified: new Date()
    }
  })
}