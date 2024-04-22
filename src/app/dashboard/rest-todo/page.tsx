export const dynamic = 'force-dynamic';
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { getUserSessionServer } from "@/modules/auth/actions/auth-actions";
import { NewTodo } from "@/modules/todo/components/NewTodo";
import { TodoGrid } from "@/modules/todo/components/TodoGrid";
import { redirect } from "next/navigation";

export default async function RestTodoPage() {
    const user = await getUserSessionServer();
    if(!user) return redirect('/api/auth/signin');
    const listTodo = await prisma.todo.findMany({
        where:{userId:user.id}, 
        orderBy: { description: 'asc' } }
    );
    return (
        <div className="mt-5">
            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo />
            </div>
            <TodoGrid listTodo={listTodo}/>
        </div>
    );
}

