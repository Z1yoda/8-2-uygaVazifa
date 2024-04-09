import React, { useRef, useState, FormEvent } from "react";
import getData from '../utils/functions';
import './index.css';
import { Todo } from "../types";
import './index.css'

interface Props {
    changeState: (todos: Todo[]) => void;
}

const Form: React.FC<Props> = ({ changeState }) => {
    const [error, setError] = useState<string>('');
    const nameRef = useRef<HTMLInputElement>(null);

    const validate = (): boolean => {
        if (nameRef.current && nameRef.current.value.trim().length < 5) {
            nameRef.current.focus();
            setError("Kamida 5 ta belgidan iborat bo'lishi kerak");
            return false;
        } else {
            setError('');
        }
        return true;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {

        const isValid: boolean = validate();
        if (isValid && nameRef.current) {
            const todo: Todo = {
                name: nameRef.current.value,
                status: 'unchecked',
                id: Date.now()
            };
            let todos: (Todo | null)[] = getData();
            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            // changeState(todos);
            nameRef.current.value = '';
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="field">
                <input ref={nameRef} type="text" placeholder="Enter todo" />
            </div>
{error && <p>{error}</p>}
            <button type="submit">Submit</button>
        </form>
    );
}

export default Form;
