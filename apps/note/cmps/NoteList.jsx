import { noteService } from "../services/note.service.js"
import { NoteAdd } from "./NoteAdd.jsx"
import { NotePreview } from "./NotePreview.jsx"


const { useState, useEffect } = React


export function NoteList() {
    const [list, setList] = useState([{ txt: 'hey' }])
    useEffect(() => {
        noteService.query()
            .then(notes => setList(notes))
    }, [])

    function deleteNote(noteId) {
        noteService.remove(noteId)
            .then(setList(prevList => prevList.filter(note => note.id !== noteId)))
    }
    function addNote(txt) {
        noteService.add(txt)
            .then(() => {
                return noteService.query()
            })
            .then(notes => {
                setList(notes)
            })
    }


    return <section className="notes-container">
        <NoteAdd onAdd={addNote} />
        {list.map(note => {
            return <NotePreview note={note} onDelete={deleteNote} key={note.id} />
        })}

    </section>
}
