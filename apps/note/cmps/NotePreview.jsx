export function NotePreview({ note, onDelete, onEdit }) {
    return <div className="note" style={{ backgroundColor: note.style }}>
        <p>{note.info.title}</p>
        <button onClick={() => onDelete(note.id)}>X</button>
        <button onClick={() => onEdit(note.id)}>Edit</button>
    </div>
}