import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
export function NoteEdit({ editedId, onEditSubmit }) {
    const [input, setInput] = useState('')
    useEffect(() => {
        noteService.get(editedId)
            .then(note => setInput(note.txt))

    }, [])

    function submit() {
        const note = {
            txt: input,
            id: editedId
        }
        noteService.update(note)
            .then(() => onEditSubmit())
    }

    function handleChange({ target }) {
        const { value } = target
        setInput(value)

    }
    return <section>
        <div>
            <label htmlFor="edit"></label>
            <input type="text" id="edit"
                onChange={handleChange} value={input} />
        </div>
        <button onClick={submit}>Submit</button>

    </section>
}