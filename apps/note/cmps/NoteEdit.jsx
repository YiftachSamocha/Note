import { noteService } from "../services/note.service.js"
import { ColorPallete } from "./ColorPalette.jsx"

const { useState, useEffect } = React
export function NoteEdit({ editedId, onEditSubmit }) {
    const [input, setInput] = useState('')
    const [color, setColor] = useState('#FFFFFF')
    useEffect(() => {
        noteService.get(editedId)
            .then(note => {
                setInput(note.info.title)
                setColor(note.style)
            })

    }, [])

    function submit() {
        noteService.get(editedId)
            .then(note => {
                note.info.title = input
                note.style = color
                return note
            })
            .then(note => noteService.update(note))
            .then(() => onEditSubmit())

    }

    function handleChange({ target }) {
        const { value } = target
        setInput(value)
    }

    function changeColor(color) {
        setColor(color)

    }
    return <section style={{ backgroundColor: color }}>
        <div>
            <label htmlFor="edit"></label>
            <input type="text" id="edit"
                onChange={handleChange} value={input} />
        </div>
        <button onClick={submit}>Submit</button>
        <ColorPallete changeColor={changeColor} />

    </section>
}