import { RegisterSchema } from "@/schema";
import { z } from "zod";
import { getUserByEmail } from "./service";

export const createUser = async (values: z.infer<typeof RegisterSchema>) => {
  const validated = RegisterSchema.safeParse(values);

  if (validated.success) {
    const { email, name, password } = validated.data;

    const existUser = await getUserByEmail(email);

    if (existUser) return "Already User Exist!";

    console.log(values);
  } else {
    return "Error";
  }
};
