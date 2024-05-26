export function NotePreviewImg({note}){
    return <div>
        <h2>{note.info.title}</h2>
        <img src={note.info.img} />
    </div>
}