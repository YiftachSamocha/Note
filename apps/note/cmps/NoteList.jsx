import { noteService } from "../services/note.service.js"
import { NoteAdd } from "./NoteAdd.jsx"
import { NotePreview } from "./NotePreview.jsx"
import { NoteEdit } from "./NoteEdit.jsx"

const { useState, useEffect } = React

export function NoteList() {
    const [list, setList] = useState([{ txt: 'hey' }])
    const [editedId, setEditedId] = useState('')
    useEffect(() => {
        noteService.query()
            .then(notes => setList(notes))
    }, [])



    function onDeleteNote(noteId) {
        noteService.remove(noteId)
            .then(setList(prevList => prevList.filter(note => note.id !== noteId)))
    }
    function onAddNote(note) {
        noteService.add(note)
            .then(() => {
                return noteService.query()
            })
            .then(notes => {
                setList(notes)
            })
    }

    function onEditNote(noteId) {
        setEditedId(noteId)

    }
    function onEditSubmit() {
        return noteService.query()
            .then(notes => {
                onEditNote('')
                setList(notes)
            })

    }

    return <section className="notes-container">
        <NoteAdd onAdd={onAddNote} />
        {list.map(note => {
            return <NotePreview note={note} onDelete={onDeleteNote} onEdit={onEditNote} key={note.id} />
        })}
        {editedId !== '' && <NoteEdit editedId={editedId} onEditSubmit={onEditSubmit} />}
      

    </section>
}
