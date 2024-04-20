import prisma from "@/lib/prisma";
import { NewTodo } from "@/todo/components/NewTodo";
import { TodoGrid } from "@/todo/components/TodoGrid";

export default async function RestTodoPage() {
    const listTodo = await prisma.todo.findMany({ orderBy: { description: 'asc' } });
    return (
        <div>
            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo />
            </div>
            <TodoGrid listTodo={listTodo}/>
        </div>
    );
}