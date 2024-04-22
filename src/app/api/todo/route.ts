import prisma from '@/lib/prisma';
import { getUserSessionServer } from '@/modules/auth/actions/auth-actions';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const take = Number(searchParams.get('take') ?? '10');
    const skip = Number(searchParams.get('skip') ?? '0');
    if (isNaN(take)) {
        return NextResponse.json({ message: 'Take must to be number' }, { status: 404 })
    }
    if (isNaN(skip)) {
        return NextResponse.json({ message: 'Take must to be number' }, { status: 404 })
    }
    const listTodo = await prisma.todo.findMany({ take, skip });
    //const listTodo = await prisma.todo.findMany();   
    return NextResponse.json(listTodo);
}



const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),
})
export async function POST(request: Request) {
    const user = await getUserSessionServer();

    if (!user) {
        return NextResponse.json('No Authenticated', { status: 401 })
    }

    try {
        const { description, complete } = await postSchema.validate(await request.json());
        const todo = await prisma.todo.create({
            data: {
                complete,
                description,
                userId: user.id!
            }
        })
        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}

export async function DELETE(request: Request) {
    const user = await getUserSessionServer();

    if (!user) {
        return NextResponse.json('No Authenticated', { status: 401 })
    }
    try {
        await prisma.todo.deleteMany({
            where: { complete: true ,userId:user.id!}
        })
        return NextResponse.json('OK');
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}