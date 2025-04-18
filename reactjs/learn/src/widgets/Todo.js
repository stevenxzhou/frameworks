import { useState } from "react";

export default function Todo() {

    const Status = {
        Completed: "Completed",
        Pending: "Pending"
    } 

    const initialTodos = [{
        id: 1,
        description: 'First Todo',
        status: Status.Completed
    }, {
        id: 2, 
        description: 'Second Todo',
        status: Status.Pending
    }]

    const [ todos, setTodos ] = useState(initialTodos);
    const [ todoText, setTodoText] = useState("");


    const addTodo = function() {
        let id = todos.length + 1;

        let newTodo = {
            id: id,
            description: todoText,
            status: Status.Pending
        }

        todos.push(newTodo);
        setTodoText("");
    }

    const removeTodo = function(id) {
        let filtered = todos.filter(todo=>todo.id != id);
        setTodos(filtered);

    }

    return (
        <div className="flex flex-col items-center min-h-screen justify-center">
            <h1 className="font-bold text-2xl">Todo List</h1>
            <div className="flex space-x-4 p-10">
                <input className="border-b border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" value={todoText} onChange={(e) => setTodoText(e.target.value)} />
                <button className="bg-red-500 rounded-lg p-2 hover:bg-blue-500" onClick={addTodo}>Add</button>
            </div>
            <ul>
                {todos?.map(todo => (
                    <div className="flex items-center space-x-10 my-5 py-2 border-b border-gray-300">
                        <li key={todo.id}>
                            {todo.description} - {todo.status}
                        </li>
                        <button className="bg-red-500 rounded-lg p-2 hover:bg-blue-500" onClick={(e)=>removeTodo(todo.id)}>Delete</button>
                    </div>
                ))}
            </ul>
        </div>
    )
}