import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
    await prisma.todo.deleteMany(); // delete * from todo
    await prisma.user.deleteMany(); // delete * from todo

    //await prisma.todo.deleteMany({where:{complete:true}}); // delete * from todo with where

    const user = await prisma.user.create({
        data: {
            name:'User Test',
            email: 'test@gmail.com',
            password: bcrypt.hashSync('123456'),
            roles: ['admin', 'client', 'root'],
            todos: {
                create: [
                    { description: 'Piedra del alma' },
                    { description: 'Piedra del poder', complete: true },
                    { description: 'Piedra del tiempo' },
                    { description: 'Piedra del espacio', complete: true },
                    { description: 'Piedra del realida' },
                ]
            }
        }
    })

    console.log({user})

    // Many queries
    // await prisma.todo.createMany({
    //     data: [
    //         {description: 'Piedra del alma'},
    //         {description: 'Piedra del poder',complete:true},
    //         {description: 'Piedra del tiempo'},
    //         {description: 'Piedra del espacio',complete:true},
    //         {description: 'Piedra del realida'},
    //     ]
    // })

    // 1 query
    // const todo = await prisma.todo.create({
    //     data: {description: 'Seed of Test'}
    // });


    return NextResponse.json({ message: 'Seed Executed' })
}