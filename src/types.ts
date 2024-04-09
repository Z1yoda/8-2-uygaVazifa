// types.ts
export interface Todo {
    name: string;
    status: string;
    id: number;
}



export interface Props {
    data: Todo;
    index: number;
    deleteTodo: (id: number) => void;
    check: (checked: boolean, id: number) => void;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
