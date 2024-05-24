import { noteService } from "../services/note.service.js"
import { NoteAdd, NoteModify } from "./NoteModify.jsx"
import { NotePreview } from "./NotePreview.jsx"


const { useState, useEffect } = React

export function NoteList() {
    const [list, setList] = useState([])
    const [editedNote, setEditedNote] = useState('')
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

    function onEditNote(note) {
        setEditedNote(note)
    }

    function onEditSubmit(note) {
        return noteService.update(note)
            .then(() => {
                return noteService.query()
            })
            .then(notes => {
                setEditedNote('')
                setList(notes)
            })

    }


    if (list.length === 0) return null

    return <section className="note-list" >
        <NoteModify editedNote={'new'} onModify={onAddNote} />
        <section className="notes-container">
            {list.map(note => {
                return <NotePreview note={note} onDelete={onDeleteNote} onEdit={onEditNote} />
            })}
        </section>
        {editedNote !== '' && <NoteModify editedNote={editedNote} onModify={onEditSubmit} />}
    </section>
}
