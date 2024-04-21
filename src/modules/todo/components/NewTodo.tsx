'use client';

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import * as api from '@/todo/helpers/todo';
import { useRouter } from "next/navigation";
import { addTodo, deleteTodo } from "../actions/todo-actions";

export const NewTodo = () => {
  const router = useRouter(); 
  const [description, setDescription] = useState<string>('');


  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length === 0) return;
    //await api.createTodo(description);
    await addTodo(description)
    setDescription('')
    //router.refresh();
  }


  const deleteCompleted = async() => {
    await api.deleteCompleteTodo();
    router.refresh();
  }


  return (
    <form onSubmit={onSubmit} className='flex w-full'>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none
            focus:border-sky-500 transition-all"
        placeholder="What needs to be done?" />

      <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 
          text-white hover:bg-sky-700 transition-all">
        Create
      </button>

      <span className='flex flex-1'></span>

      <button
         onClick={ () => deleteTodo() }
        type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white
            hover:bg-red-700 transition-all">
        <IoTrashOutline />
        <span className="ml-2">Delete Task Completed</span>
      </button>
    </form>
  )
}