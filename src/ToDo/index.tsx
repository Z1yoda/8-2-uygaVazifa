import React, { useEffect, useState } from "react";
import Form from "../Form";
import ToDoItem from "../ToDoItem";
import getData from "../utils/functions";
import "./index.css";
import type { Todo } from "../types";

const ToDo = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const data = getData();
        setTodos(data);
        setCount(data.length); // Set initial count
    }, []);

    useEffect(() => {
        // Update count whenever todos change
        setCount(todos.length);
    }, [todos]);

    function handleDelete(id: number): void {
        const todosDel = todos.filter((todo) => todo.id !== id);
        setTodos(todosDel);
        localStorage.setItem("todos", JSON.stringify(todosDel));
    }

    function handleCheck(status: boolean, id: number): void {
        const todosList = todos.map((todo) => {
            if (todo.id === id) {
                todo.status = status ? "checked" : "unchecked";
            }
            return todo;
        });
        setTodos(todosList);
        localStorage.setItem("todos", JSON.stringify(todosList));
    }

    return (
        <div className="todo-wrapper">
            <div className='header'>
                <h4>Todos({count})</h4>
            </div>
            <div className="form-todo-wrapper">
                <Form changeState={setTodos} />
                {todos.map((todo, index) => (
                    <ToDoItem
                        check={handleCheck}
                        deleteTodo={handleDelete}
                        index={index + 1}
                        key={index}
                        data={todo}
                        todos={todos}
                        setTodos={setTodos}
                    />
                ))}
            </div>
        </div>
    );
}

export default ToDo;
