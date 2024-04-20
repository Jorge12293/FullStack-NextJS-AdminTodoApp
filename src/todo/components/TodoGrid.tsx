'use client'
import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem"
import * as api from '@/todo/helpers/todo';
import { useRouter } from "next/navigation";
import { toggleTodoUpdate } from "../actions/todo-actions";


interface Props {
    listTodo?:Todo[]
}
export const TodoGrid = ({listTodo=[]}:Props) => {
  const router = useRouter();  

  // const toggleTodo = async(id:string,complete:boolean) =>{
  //   const updateTodo = await api.updateTodo(id,complete);
  //   router.refresh();
  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {
            listTodo.map(todo=>(
                <TodoItem 
                    key={todo.id}  todo={todo} toggleTodo={toggleTodoUpdate}/>
            ))
        }
    </div>
  )
}
