import { noteService } from "../services/note.service.js";
import { ColorPalette } from "./ColorPalette.jsx";
import { NoteImg } from "./NoteTypes/NoteImg.jsx";
import { NoteTodos } from "./NoteTypes/NoteTodos.jsx";
import { NoteTxt } from "./NoteTypes/NoteTxt.jsx";
import { NoteVideo } from "./NoteTypes/NoteVideo.jsx";
const { useState } = React

export function NotePreview({ note, onDelete, onEdit }) {
    const [hover, setHover] = useState(false)
    const [color, setColor] = useState(note.style)
    const [isPaletteOpen, setIsPaletteOpen] = useState(false)
    function changeColor(color) {
        noteService.update(note.id, 'color', color)
            .then(() => {
                setColor(color)
                setIsPaletteOpen(false)
            })
    }

    const buttons = hover ? <div className="buttons">
        <button onClick={() => onDelete(note.id)}> <i className="fa-solid fa-trash"></i></button>
        <div className="color-container">
            <button onClick={() => setIsPaletteOpen(!isPaletteOpen)}><i className="fa-solid fa-palette"></i></button>
            {isPaletteOpen && <ColorPalette changeColor={changeColor} />}
        </div>


    </div> : <div className="buttons"></div>


    return <div className="note"
        style={{ backgroundColor: color }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
        <div className="content">
            {note.type === 'txt' && <NoteTxt note={note} />}
            {note.type === 'img' && <NoteImg note={note} />}
            {note.type === 'video' && <NoteVideo note={note} />}
            {note.type === 'todos' && <NoteTodos note={note} />}
        </div>
        {buttons}


    </div>
}