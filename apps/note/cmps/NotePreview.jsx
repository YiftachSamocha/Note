import { noteService } from "../services/note.service.js";
import { ColorPalette } from "./ColorPalette.jsx";
import { NotePreviewAudio } from "./NotePreview/NotePreviewAudio.jsx";
import { NotePreviewCanvas } from "./NotePreview/NotePreviewCanvas.jsx";
import { NotePreviewImg } from "./NotePreview/NotePreviewImg.jsx";
import { NotePreviewMap } from "./NotePreview/NotePreviewMap.jsx";
import { NotePreviewTodos } from "./NotePreview/NotePreviewTodos.jsx";
import { NotePreviewTxt } from "./NotePreview/NotePreviewTxt.jsx";
import { NotePreviewVideo } from "./NotePreview/NotePreviewVideo.jsx";

const { useState } = React

export function NotePreview({ note, onDelete, onEdit, onDuplicate, onChangePinned }) {
    const [currNote, setCurrNote] = useState(note)
    const [hover, setHover] = useState(false)
    const [isPinned, setIsPinned] = useState(note.isPinned)
    const [isPaletteOpen, setIsPaletteOpen] = useState(false)

    function changeIsPinned() {
        noteService.updateProperty(note.id, 'isPinned', !isPinned)
            .then(updatedNote => {
                setIsPinned(!isPinned)
                setCurrNote(updatedNote)
                onChangePinned()

            })
    }

    function changeColor(color) {
        setIsPaletteOpen(false)
        noteService.updateProperty(currNote.id, 'style', color)
            .then(updatedNote => setCurrNote(updatedNote))

    }

    function mailNote(note) {
        

    }
    const isPinnedClass = isPinned ? 'pinned' : ''

    const buttons = hover ? <div className="buttons" onClick={(event) => event.stopPropagation()}>
        <button onClick={changeIsPinned}><i className={"fa-solid fa-thumbtack " + isPinnedClass}></i></button>
        <button onClick={() => mailNote(note)}><i className="fa-regular fa-envelope"></i></button>
        <button onClick={() => onDuplicate(note)}><i className="fa-regular fa-copy"></i></button>
        <div className="color-container">
            <button onClick={() => setIsPaletteOpen(!isPaletteOpen)}><i className="fa-solid fa-palette"></i></button>
            {isPaletteOpen && <ColorPalette changeColor={changeColor} colors={noteService.getNoteColors()} />}
        </div>
        <button onClick={() => onDelete(note.id)}> <i className="fa-solid fa-trash"></i></button>

    </div>
        : <div className="buttons"></div>
    const blackBorder = currNote.style === '#FFFFFF' ? { border: '0.2px solid black' } : {}

    return <div className="note"
        style={{ ...{ backgroundColor: currNote.style }, ...blackBorder }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onEdit(currNote)}>
        <div className="content">
            <h2>{currNote.info.title}</h2>
            {currNote.type === 'txt' && <NotePreviewTxt note={currNote} />}
            {currNote.type === 'img' && <NotePreviewImg note={currNote} />}
            {currNote.type === 'video' && <NotePreviewVideo note={currNote} />}
            {currNote.type === 'todos' && <NotePreviewTodos note={currNote} setNote={setCurrNote} />}
            {currNote.type === 'audio' && <NotePreviewAudio note={currNote} />}
            {currNote.type === 'map' && <NotePreviewMap note={currNote} />}
            {currNote.type === 'canvas' && <NotePreviewCanvas note={currNote} />}
        </div>
        {buttons}


    </div>
}