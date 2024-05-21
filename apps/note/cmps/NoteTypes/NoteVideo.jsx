export function NoteVideo({note}){
    return <div>
        <h2>{note.info.title}</h2>
        <iframe src={note.info.url} ></iframe>
    </div>
}

//title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen