import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes} from "@/routes";
//@ts-ignore
import {NextAuthRequest} from "next-auth/lib";

const {auth} = NextAuth(authConfig)

// @ts-ignore
export default auth((req:NextAuthRequest)  =>{
    const {nextUrl} = req
    const isLogin = !!req.auth
    const isApiAuthRoute  = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if(isApiAuthRoute) return Response.redirect(new URL('/login',nextUrl));

    if(isAuthRoute){
        if(isLogin) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
        return null;
    }

    if(!isLogin && !isPublicRoute){
        return Response.redirect(new URL('/login',nextUrl))
    }

    return null;
})

export const config = {
    matcher:[
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}