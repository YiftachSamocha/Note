export function NotePreview({ note, onDelete }) {
    return <div className="note" >
        <p>{note.txt}</p>
        <button onClick={() => onDelete(note.id)}>X</button>
    </div>
}