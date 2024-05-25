export function NotePreviewAudio({ note }) {
    return <div>
        <h2>{note.info.title}</h2>
        <audio controls> <source src={note.info.audio} type="audio/mpeg" /></audio>
    </div>
}