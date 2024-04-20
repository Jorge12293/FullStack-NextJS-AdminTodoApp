'use server'

import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache";


const sleep = (seconds:number=0): Promise<boolean> =>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(true)
        },seconds * 1000 )
    })
}

export const toggleTodoUpdate = async (id: string, complete: boolean): Promise<Todo> => {
    await sleep(3);
    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
        throw `Todo with id ${id} not found`;
    }

    const updateTodo = await prisma.todo.update({
        where: { id },
        data: { complete }
    });

    revalidatePath('/dashboard/server-todo')

    return updateTodo;
}


export const addTodo = async (description: string) => {
    try {
        const todo = await prisma.todo.create({ data: { description } })
        revalidatePath('/dashboard/server-todo')
        return todo;
    } catch (error) {
        return {
            message: 'Error in create todo'
        }
    }
}


export const deleteTodo = async (): Promise<void> => {

    await prisma.todo.deleteMany({ where: { complete:true } })
    revalidatePath('/dashboard/server-todo')


}