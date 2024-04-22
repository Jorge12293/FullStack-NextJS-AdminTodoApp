import NextAuth from "next-auth"
import github from "next-auth/providers/github"
import google from "next-auth/providers/google"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import credentials from "next-auth/providers/credentials"
import { register } from "module"
import { signEmailPassword } from "@/modules/auth/actions/auth-actions"

enum CredentialsInputs {
    Email = 'email',
    Password = 'password'
}

const prisma = new PrismaClient()
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [

        credentials({
            name: "Domain Account",
            credentials: {
                email: { label: "Username", type: "email ", placeholder: "user@google.com" },
                password: { label: "Password", type: "password", placeholder: "*********" },
            },
            async authorize(credentials: Partial<Record< CredentialsInputs , unknown>>, req:Request) {
                const email = credentials[CredentialsInputs.Email] as string;
                const password = credentials[CredentialsInputs.Password] as string;
                if (!email || !password) return null;
                // No must create user
                const user = await signEmailPassword(email, password);
                console.log({user})
                if (user) {
                    return user;
                }
                return null;
            }
        }),
        github,
        google,
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            //console.log({ user })
            return true;
        },
        async jwt({ token, user, account, profile }) {
            //console.log({ token })

            const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } })
            // if(dbUser?.isActive === false){
            //   throw Error('User not active')      
            // }
            token.roles = dbUser?.roles ?? ['no-roles']
            token.id = dbUser?.id ?? 'no-uuid'

            return token;
        },
        async session({ session, token, user }) {
            if (session && session.user) {
                session.user.roles = token.roles;
                session.user.id = token.id;
            }
            return session;
        }

    }
})


