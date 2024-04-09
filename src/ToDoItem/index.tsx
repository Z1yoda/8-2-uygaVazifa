import React, { useState } from 'react';
import './index.css';
import { Todo, Props } from '../types';
import edit from '../assets/edit.svg';
import trash from '../assets/trash.svg';

const TodoItem: React.FC<Props> = ({ data, index, deleteTodo, check, todos, setTodos }) => {
    const { name, status, id } = data;
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedName, setEditedName] = useState<string>(name);
    const styleObj: React.CSSProperties = { backgroundColor: index % 2 === 1 ? "lightGray" : "white" };

    const handleDelete = (e:  React.MouseEvent<HTMLButtonElement | HTMLImageElement>): void => {
        e.preventDefault();
        deleteTodo(id);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        check(e.target.checked, id);
    };

    const handleEdit = (): void => {
        setIsEditing(!isEditing);
    };

    const handleEditSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        const updatedTodos: Todo[] = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, name: editedName };
            }
            return todo;
        });

        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        setIsEditing(false);
    };

    // Calculate the count of todos
    const todoCount = todos.length;

    return (
        <div className='item-wrapper' style={styleObj}>
            <div className='check-name'>
                {isEditing ? (
                    <input
                        className='editInput'
                        type='text'
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        autoFocus
                    />
                ) : (
                    <>
                        <input
                            type='checkbox'
                            name=''
                            id={'el_' + id}
                            onChange={handleChange}
                            checked={status === 'checked'}
                        />
                        <label
                            htmlFor={'el_' + id}
                            style={status === 'checked' ? { textDecoration: "line-through" } : {}}
                        >
                            {name}
                        </label>
                    </>
                )}
            </div>
            <div className='actions'>
                {isEditing ? (
                    <>
                        <button className='saveButton' onClick={handleEditSubmit}>Save</button>
                        <img onClick={handleDelete} src={trash} alt="Delete" />
                    </>
                ) : (
                    <>
                        <img src={edit} onClick={handleEdit} alt="Edit" />
                        <img onClick={handleDelete} src={trash} alt="Delete" />
                    </>
                )}
            </div>
        </div>
    );
}

export default TodoItem;
