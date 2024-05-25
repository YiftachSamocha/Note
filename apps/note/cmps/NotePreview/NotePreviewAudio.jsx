export function NotePreviewAudio({ note }) {
    const audio = LZString.decompressFromUTF16(note.info.audio)
    return <div>
        <h2>{note.info.title}</h2>
        <audio controls> <source src={audio} type="audio/mpeg" /></audio>
    </div>
}