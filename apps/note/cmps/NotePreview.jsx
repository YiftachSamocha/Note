import { NoteImg } from "./NoteTypes/NoteImg.jsx";
import { NoteTodos } from "./NoteTypes/NoteTodos.jsx";
import { NoteTxt } from "./NoteTypes/NoteTxt.jsx";
import { NoteVideo } from "./NoteTypes/NoteVideo.jsx";

export function NotePreview({ note, onDelete, onEdit }) {
    return <div className="note" style={{ backgroundColor: note.style }}>
        {note.type === 'txt' && <NoteTxt note={note} />}
        {note.type === 'img' && <NoteImg note={note} />}
        {note.type === 'video' && <NoteVideo note={note} />}
        {note.type === 'todos' && <NoteTodos note={note}/>}
        <button onClick={() => onDelete(note.id)}>X</button>
        <button onClick={() => onEdit(note.id)}>Edit</button>
    </div>
}