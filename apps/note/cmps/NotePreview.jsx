import { noteService } from "../services/note.service.js";
import { ColorPalette } from "./ColorPalette.jsx";
import { NoteImg } from "./NoteTypes/NoteImg.jsx";
import { NoteTodos } from "./NoteTypes/NoteTodos.jsx";
import { NoteTxt } from "./NoteTypes/NoteTxt.jsx";
import { NoteVideo } from "./NoteTypes/NoteVideo.jsx";
const { useState, useEffect } = React

export function NotePreview({ note, onDelete, onEdit, onDuplicate, onChangePinned }) {
    const [hover, setHover] = useState(false)
    const [color, setColor] = useState(note.style)
    const [isPinned, setIsPinned] = useState(note.isPinned)
    const [isPaletteOpen, setIsPaletteOpen] = useState(false)

    useEffect(() => {
        setColor(note.style)
        setIsPinned(note.isPinned)
    }, [note])

    function changeColor(newColor) {
        noteService.updateProperty(note.id, 'color', newColor)
            .then(() => {
                setColor(newColor)
                setIsPaletteOpen(false)
                onChangePinned()
            })
    }

    function changeIsPinned() {
        noteService.updateProperty(note.id, 'isPinned', !isPinned)
            .then(() => {
                setIsPinned(!isPinned)
                onChangePinned()
            })

    }
    const isPinnedClass = isPinned ? '' : 'unpinned'

    const buttons = hover ? <div className="buttons" onClick={(event) => event.stopPropagation()}>
        <button onClick={changeIsPinned}><i className={"fa-solid fa-thumbtack " + isPinnedClass}></i></button>
        <button onClick={() => onDuplicate(note)}><i className="fa-regular fa-copy"></i></button>
        <div className="color-container">
            <button onClick={() => setIsPaletteOpen(!isPaletteOpen)}><i className="fa-solid fa-palette"></i></button>
            {isPaletteOpen && <ColorPalette changeColor={changeColor} />}
        </div>
        <button onClick={() => onDelete(note.id)}> <i className="fa-solid fa-trash"></i></button>

    </div>
        : <div className="buttons"></div>
    const blackBorder = color === '#FFFFFF' ? { border: '0.5px solid black' } : {}

    return <div className="note"
        style={{ ...{ backgroundColor: color }, ...blackBorder }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onEdit(note)}>
        <div className="content">
            {note.type === 'txt' && <NoteTxt note={note} />}
            {note.type === 'img' && <NoteImg note={note} />}
            {note.type === 'video' && <NoteVideo note={note} />}
            {note.type === 'todos' && <NoteTodos note={note} />}
        </div>
        {buttons}


    </div>
}