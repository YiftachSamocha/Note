import { noteService } from "../services/note.service.js"
import { NotePreview } from "./NotePreview.jsx"

const { useState, useEffect } = React


export function NoteList() {
    const [list, setList] = useState([{txt: 'hey'}])
    useEffect(() => {
        noteService.query()
            .then(notes => setList(notes))
    }, [])


    return <section className="notes-container">
        {list.map(note => { 
            return <NotePreview note={note} key={note.txt} />
        })}

    </section>
}
