import { auth } from "@/app/api/auth/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { User } from "next-auth";


export const getUserSessionServer = async():Promise<User | undefined> =>{
    const session = await auth();
    return session?.user;
}

export const signEmailPassword = async (email:string,password:string) => {
    if(!email || !password) return; 
    const user = await prisma.user.findUnique({where:{email}})
    if(!user){
        const dbUser = await createUser(email,password);
        return dbUser;
    }
    if(!bcrypt.compareSync(password,user.password ?? '')){
        return null
    }
    return user;
}

const createUser = async (email:string, password:string) => {
    const user = await prisma.user.create({
        data:{
            email:email,
            password: bcrypt.hashSync(password),
            name: email.split('@')[0]
        }
    });
    return user;
}