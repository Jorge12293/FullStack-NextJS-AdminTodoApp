export const dynamic = 'force-dynamic';
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodo } from "@/modules/todo/components/NewTodo";
import { TodoGrid } from "@/modules/todo/components/TodoGrid";

export default async function RestTodoPage() {
    const listTodo = await prisma.todo.findMany({ orderBy: { description: 'asc' } });
    return (
        <div className="mt-5">
            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo />
            </div>
            <TodoGrid listTodo={listTodo}/>
        </div>
    );
}

