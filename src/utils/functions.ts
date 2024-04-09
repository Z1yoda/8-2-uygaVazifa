import { Todo } from '../types'; // Import the Todo interface

const getData = (): Todo[] => {
    const storedData = localStorage.getItem('todos');
    if (storedData) {
        const parsedData: (Todo | null)[] = JSON.parse(storedData);
        // Filter out null values and ensure the remaining objects are of type Todo
        const todos: Todo[] = parsedData.filter((item): item is Todo => item !== null) as Todo[];
        return todos;
    }
    return []; // Return an empty array if no data is found or if the data is not valid
};

export default getData;
