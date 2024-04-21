import NextAuth from "next-auth"
import github from "next-auth/providers/github"
import google from "next-auth/providers/google"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import async from '../../dashboard/page';

const prisma = new PrismaClient()
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [github,google],
    session:{
        strategy:'jwt'
    },
    callbacks:{
        async signIn({user}){
            console.log(user)
            return true;
        }
    }
})
