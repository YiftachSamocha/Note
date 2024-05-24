import { noteService } from "../services/note.service.js"
import { NoteAdd, NoteModify } from "./NoteModify.jsx"
import { NotePreview } from "./NotePreview.jsx"


const { useState, useEffect } = React

export function NoteList() {
    const [list, setList] = useState([])
    const [editedNote, setEditedNote] = useState('')
    useEffect(() => {
        renderList()
    }, [])

    function renderList() {
        noteService.query()
            .then(notes => setList(notes))
    }

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

    function isPinnedExist(notes) {
        return notes.some(note => note.isPinned)
    }
    const isExist = isPinnedExist(list)


    if (list.length === 0) return null



    return <section className="note-list" >
        <NoteModify editedNote={'new'} onModify={onAddNote} />
        {isExist && <p className="pinned-title">Pinned:</p>}
        <section className="list-pinned">
            {list.map(note => {
                if (note.isPinned) return <NotePreview note={note} onDelete={onDeleteNote} onEdit={onEditNote} />
            })}
        </section>
        {isExist && <p className="pinned-title">Other:</p>}
        <section className="list-unpinned">
            {list.map(note => {
                if (!note.isPinned) return <NotePreview note={note} onDelete={onDeleteNote} onEdit={onEditNote} onChangePinned={renderList} />
            })}
        </section>

        {editedNote !== '' && <NoteModify editedNote={editedNote} onModify={onEditSubmit} onChangePinned={renderList} />}
    </section>
}
