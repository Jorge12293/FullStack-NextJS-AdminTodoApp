import { Todo } from "@prisma/client";

const sleep = (seconds:number=0): Promise<boolean> =>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(true)
        },seconds * 1000 )
    })
}

export const deleteCompleteTodo = async (): Promise<boolean> => {
    await fetch('/api/todo', {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json())
    return true;
}

export const updateTodo = async (id: string, complete: boolean): Promise<Todo> => {
    // await sleep(2); //TODO: Optimized Task 
    const body = { complete };
    return fetchTodo(`/api/todo/${id}`, 'PUT', body);
}

export const createTodo = async (description: string): Promise<Todo> => {
    const body = { description };
    return fetchTodo(`/api/todo`, 'POST', body);
}

const fetchTodo = async (url: string, method: string, body: any): Promise<Todo> => {
    const response = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}