import { noteService } from "../services/note.service.js"
import { NoteAdd, NoteModify } from "./NoteModify.jsx"
import { NotePreview } from "./NotePreview.jsx"


const { useState, useEffect } = React

export function NoteList({ filterBy }) {
    const [list, setList] = useState([])
    const [editedNote, setEditedNote] = useState('')
    useEffect(() => {
        renderList()
    }, [filterBy])

    function renderList() {
        noteService.query(filterBy)
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

    function onDuplicate(note) {
        const duplicatedNote= {...note, createdAt: new Date()}
        onAddNote(duplicatedNote)
    }

    function isPinnedExist(notes) {
        return notes.some(note => note.isPinned)
    }
    const isExist = isPinnedExist(list)


    if (list.length === 0) return <p className="message-search-fail">We couldn't find any results for your search. Keep trying, and you'll find what you're looking for!</p>




    return <section className="note-list" >
        <NoteModify editedNote={'new'} onModify={onAddNote} />
        {isExist && <p className="pinned-title">Pinned:</p>}
        <section className="list-pinned" style={{ display: isExist ? 'flex' : 'none' }}>
            {list.map(note => {
                if (note.isPinned) return <NotePreview note={note}
                    onDelete={onDeleteNote}
                    onEdit={onEditNote}
                    onChangePinned={renderList}
                    onDuplicate={onDuplicate}
                    key={note.id} />
            })}
        </section>
        {isExist && <p className="pinned-title">Other:</p>}
        <section className="list-unpinned">
            {list.map(note => {
                if (!note.isPinned) return <NotePreview note={note}
                    onDelete={onDeleteNote}
                    onEdit={onEditNote}
                    onChangePinned={renderList}
                    onDuplicate={onDuplicate}
                    key={note.id} />
            })}
        </section>

        {editedNote !== '' && <NoteModify editedNote={editedNote} onModify={onEditSubmit} onChangePinned={renderList} />}
    </section>
}
