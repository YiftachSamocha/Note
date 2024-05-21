import { noteService } from "../services/note.service.js"
const { useState } = React

export function NoteAdd({onAdd}) {
    const [input, setInput] = useState('')

    function handleChange({ target }) {
        const { value } = target
        setInput(value)
    }


    return <section>
        <div>
            <label htmlFor="text">Enter text</label>
            <input type="text" id="text" placeholder="Enter text here..."
                onChange={handleChange} value={input} />
        </div>
        <button onClick={() => onAdd(input)}>Add</button>
    </section>
}