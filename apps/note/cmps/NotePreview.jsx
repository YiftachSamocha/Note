import { NoteImg } from "./NoteTypes/NoteImg.jsx";
import { NoteTxt } from "./NoteTypes/NoteTxt.jsx";

export function NotePreview({ note, onDelete, onEdit }) {
    return <div className="note" style={{ backgroundColor: note.style }}>
        {note.type === 'txt' && <NoteTxt note={note} />}
        {note.type === 'img' && <NoteImg note={note} />}
        <button onClick={() => onDelete(note.id)}>X</button>
        <button onClick={() => onEdit(note.id)}>Edit</button>
    </div>
}