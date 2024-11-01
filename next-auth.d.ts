import { type DefaultSession } from "next-auth"

/**
 * next auth types
 */
declare module "next-auth" {
    interface  Session {
    user:USER_ROLES & DefaultSession['user']
    }
}