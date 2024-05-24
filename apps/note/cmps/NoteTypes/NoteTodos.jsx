import { noteService } from "../../services/note.service.js"
const { useState, useEffect } = React


export function NoteTodos({ note }) {
    const [todos, setTodos] = useState(note.info.todos)

    useEffect(() => {
        setTodos(note.info.todos)
    }, [note.info.todos])

    function toggleMark({ target }) {
        const { checked, name } = target
        const updatedTodos = todos.map(todo => {
            if (todo.id === name) {
                return { ...todo, isMarked: checked }
            }
            return todo
        })
        noteService.updateProperty(note.id, 'info', { todos: updatedTodos })
        setTodos(updatedTodos)
    }


    return <div>
        <h2>{note.info.title}</h2>
        <ul>
            {note.info.todos.map(todo => {
                const currTodo = todos.find(t => t.id === todo.id);
                return <li key={currTodo.txt}>
                    <p className={currTodo.isMarked ? 'marked' : ''}>{currTodo.txt}</p>
                    <input type="checkbox" name={currTodo.id}
                        checked={currTodo.isMarked}
                        onChange={toggleMark}
                        onClick={(event) => event.stopPropagation()} />
                </li>

            })}
        </ul>
    </div>
}