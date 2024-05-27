import { noteService } from "../../services/note.service.js"

export function NotePreviewTodos({ note, setNote }) {

    function toggleMark({ target }) {
        const { checked, name } = target
        const updatedTodos = note.info.todos.map(todo => {
            if (todo.id === name) {
                return { ...todo, isMarked: checked }
            }
            return todo
        })
        noteService.updateProperty(note.id, 'info', { ...note.info, todos: updatedTodos })
            .then(updatedNote => setNote(updatedNote))

    }

    return <div>
        <ul>
            {note.info.todos.map(todo => {
                return <li key={todo.id}>
                    <p className={todo.isMarked ? 'marked' : ''}>{todo.txt}</p>
                    <input type="checkbox" name={todo.id}
                        checked={todo.isMarked}
                        onChange={toggleMark}
                        onClick={(event) => event.stopPropagation()} />
                </li>

            })}
        </ul>
    </div>
}