export function NotePreviewAudio({ note }) {
    const audio = LZString.decompressFromUTF16(note.info.audio)
    return <div>
        <audio controls> <source src={audio} type="audio/mpeg" /></audio>
    </div>
}