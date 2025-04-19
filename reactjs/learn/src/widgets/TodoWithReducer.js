import { useState, useReducer, act } from "react";
import { useTheme } from "../context/useTheme";
import { useParams } from "react-router-dom";

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
    const initialState = {
        todos: initialTodos
    }
    const TodoAction = {
        TOGGLE_TODO: "TOGGLE_TODO",
        ADD_TODO: "ADD_TODO",
        REMOVE_TODO: "REMOVE_TODO"
    }

    const [ todoText, setTodoText] = useState("");
    const { id } = useParams();


    const reducer = (state, action) => {
        switch (action.type) {
            case TodoAction.ADD_TODO:
                setTodoText("");
                return {
                    ...state,
                    todos: [
                        ...state.todos,
                        {
                            id: state.todos.length + 1,
                            description: action.description,
                            status: Status.Pending,
                        },
                    ],
                };

            case TodoAction.TOGGLE_TODO:
                return {
                    ...state,
                    todos: state.todos.map((todo) =>
                        todo.id === action.id
                            ? { ...todo, status: todo.status === Status.Completed ? Status.Pending : Status.Completed }
                            : todo
                    ),
                };

            case TodoAction.REMOVE_TODO:
                return {
                    ...state,
                    todos: state.todos.filter((todo) => todo.id !== action.id),
                };

            default:
                return state;
        }
    }

    const [ state, dispatch ] = useReducer(reducer, initialState);
    const { state: themeState } = useTheme();

    return (
        <div className="flex flex-col items-center min-h-screen justify-center">
            <h1 className="font-bold text-2xl">Todo List - {id}</h1>
            <div className="flex space-x-4 p-10">
                <input className="border-b border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" value={todoText} onChange={(e) => setTodoText(e.target.value)} />
                <button className="bg-red-500 rounded-lg p-2 hover:bg-blue-500" onClick={() => dispatch({type: TodoAction.ADD_TODO, description: todoText})}>Add</button>
            </div>
            <ul>
                {state.todos?.map(todo => (
                    <div className="flex items-center space-x-10 my-5 py-2 border-b border-gray-300" key={todo.id}>
                        <input type="checkbox" checked={todo.status === Status.Completed} onChange={() => dispatch({type: TodoAction.TOGGLE_TODO, id: todo.id})}></input>
                        <li key={todo.id} style={{textDecoration: todo.status === Status.Completed ? 'line-through' : 'none'}}>
                            {todo.description} - {todo.status}
                        </li>
                        <button className="bg-red-500 rounded-lg p-2 hover:bg-blue-500" onClick={() => dispatch({type: TodoAction.REMOVE_TODO, id: todo.id})}>Delete</button>
                    </div>
                ))}
            </ul>
            <h2>Current Theme: {themeState.theme}</h2>
        </div>
    )
}