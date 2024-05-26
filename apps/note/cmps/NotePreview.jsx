import { noteService } from "../services/note.service.js";
import { ColorPalette } from "./ColorPalette.jsx";
import { NotePreviewAudio } from "./NotePreview/NotePreviewAudio.jsx";
import { NotePreviewCanvas } from "./NotePreview/NotePreviewCanvas.jsx";
import { NotePreviewImg } from "./NotePreview/NotePreviewImg.jsx";
import { NotePreviewMap } from "./NotePreview/NotePreviewMap.jsx";
import { NotePreviewTodos } from "./NotePreview/NotePreviewTodos.jsx";
import { NotePreviewTxt } from "./NotePreview/NotePreviewTxt.jsx";
import { NotePreviewVideo } from "./NotePreview/NotePreviewVideo.jsx";

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
    const isPinnedClass = isPinned ? 'pinned' : ''

    const buttons = hover ? <div className="buttons" onClick={(event) => event.stopPropagation()}>
        <button onClick={changeIsPinned}><i className={"fa-solid fa-thumbtack " + isPinnedClass}></i></button>
        <button onClick={() => onDuplicate(note)}><i className="fa-regular fa-copy"></i></button>
        <div className="color-container">
            <button onClick={() => setIsPaletteOpen(!isPaletteOpen)}><i className="fa-solid fa-palette"></i></button>
            {isPaletteOpen && <ColorPalette changeColor={changeColor} colors={noteService.getNoteColors()} />}
        </div>
        <button onClick={() => onDelete(note.id)}> <i className="fa-solid fa-trash"></i></button>

    </div>
        : <div className="buttons"></div>
    const blackBorder = color === '#FFFFFF' ? { border: '0.2px solid black' } : {}

    return <div className="note"
        style={{ ...{ backgroundColor: color }, ...blackBorder }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onEdit(note)}>
        <div className="content">
            <h2>{note.info.title}</h2>
            {note.type === 'txt' && <NotePreviewTxt note={note} />}
            {note.type === 'img' && <NotePreviewImg note={note} />}
            {note.type === 'video' && <NotePreviewVideo note={note} />}
            {note.type === 'todos' && <NotePreviewTodos note={note} />}
            {note.type === 'audio' && <NotePreviewAudio note={note} />}
            {note.type=== 'map' && <NotePreviewMap note={note}/>}
            {note.type=== 'canvas' && <NotePreviewCanvas note={note}/> }
        </div>
        {buttons}


    </div>
}