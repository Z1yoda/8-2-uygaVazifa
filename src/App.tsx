import { useState } from "react";
import "./App.css";

function App() {
  const [inputVal, setInputVal] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedName, setEditedName] = useState<string>("")
  
  const handleSubmit = () => {
    setTodos((prev) => [...prev, inputVal]);
    setInputVal("")
  }

  return (
    <div className="todo-wrapper">
      <div className="header">
        <h1>To Do List</h1>
      </div>
      <div className="form-todo-wrapper">
        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            <input
              type="text"
              placeholder="Enter todo..."
              required
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
            />
          </div>
          <button className="submit">Submit</button>
        </form>
        <div className="item-wrapper">
          {
            todos && todos.map((el) => (
                <div className="check-name">
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
                            id={'el_' }
                            // onChange={handleChange}
                            checked={status === 'checked'}
                        />
                        <label
                            htmlFor={'el_' }
                            // style={status === 'checked' ? { textDecoration: "line-through" } : {}}
                        >
                            {inputVal}
                        </label>
                    </>
                )}
          </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
