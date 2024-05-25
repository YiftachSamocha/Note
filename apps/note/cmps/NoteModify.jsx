import { noteService } from "../services/note.service.js"
import { ColorPalette } from "./ColorPalette.jsx"
import { NoteModifyAudio } from "./NoteModify/NoteModifyAudio.jsx"
import { NoteModifyImg } from "./NoteModify/NoteModifyImg.jsx"
import { NoteModifyTitle } from "./NoteModify/NoteModifyTitle.jsx"
import { NoteModifyTodos } from "./NoteModify/NoteModifyTodos.jsx"
import { NoteModifyTxt } from "./NoteModify/NoteModifyTxt.jsx"
import { NoteModifyVideo } from "./NoteModify/NoteModifyVideo.jsx"

const { useState, useEffect } = React

export function NoteModify({ editedNote, onModify }) {
    const [title, setTitle] = useState('')
    const [info, setInfo] = useState({ txt: '', ur: '', todos: [{ txt: '', isMarked: false, id: '' }], audio: '' })
    const [type, setType] = useState('txt')
    const [color, setColor] = useState('#FFFFFF')
    const [isPinned, setIsPinned] = useState(false)
    const [isPalatteOpen, setIsPalatteOpen] = useState(false)

    useEffect(() => {
        if (editedNote !== 'new') {
            setType(editedNote.type)
            setColor(editedNote.style)
            setTitle(editedNote.info.title)
            setInfo(editedNote.info)
            setIsPinned(editedNote.isPinned)
        }
    }, [editedNote])

    function handleChangeColor(newColor) {
        setColor(newColor)
        setIsPalatteOpen(false)
    }

    function isChosen(buttonType) {
        return type === buttonType ? 'chosen' : ''
    }

    function onSubmit() {
        const note = editedNote === 'new' ? noteService.getEmptyNote() : editedNote
        if (type === 'video') {
            if (noteService.isValidLink(info.url)) info.url = noteService.convertToEmbedLink(info.url)
            else {
                alert('Please enter a valid YouTube link')
                return
            }
        }
        if (type === 'todos' && info.todos[info.todos.length - 1].txt === '') info.todos = info.todos.slice(0, -1)
        note.style = color
        note.info = { ...info }
        note.info.title = title
        note.type = type
        note.isPinned = isPinned
        onModify(note)
        if (editedNote === 'new') {
            setTitle('')
            setInfo({ txt: '', ur: '', todos: [{ txt: '', isMarked: false, id: '' }], audio: '' })
            setColor('#FFFFFF')
            setIsPinned(false)
        }
    }

    const classType = editedNote === 'new' ? 'note-add' : 'note-edit'
    const isPinnedClass = isPinned ? '' : 'unpinned'

    return <div>
        {editedNote !== 'new' && <div className="overlay" onClick={onSubmit}></div>}
        <section style={{ backgroundColor: color }} className={"note-modify " + classType} >
            <NoteModifyTitle title={title} setTitle={setTitle} />
            {type === 'txt' && <NoteModifyTxt info={info} setInfo={setInfo} />}
            {type === 'img' && <NoteModifyImg info={info} setInfo={setInfo} />}
            {type === 'video' && <NoteModifyVideo info={info} setInfo={setInfo} />}
            {type === 'todos' && <NoteModifyTodos info={info} setInfo={setInfo} />}
            {type === 'audio' && <NoteModifyAudio info={info} setInfo={setInfo} />}

            <div className="buttons">
                <div className="types">
                    <div onClick={() => setType('txt')} className={isChosen('txt')}><i className="fa-solid fa-font"></i></div>
                    <div onClick={() => setType('todos')} className={isChosen('todos')} ><i className="fa-solid fa-list"></i></div>
                    <div onClick={() => setType('video')} className={isChosen('video')}><i className="fa-brands fa-youtube"></i></div>
                    <label htmlFor="image"><div onClick={() => setType('img')} className={isChosen('img')} ><i className="fa-regular fa-image"></i></div></label>
                    <label htmlFor="audio"><div onClick={() => setType('audio')} className={isChosen('audio')} ><i className="fa-solid fa-volume-high"></i></div></label>
                </div>

                <div className="actions">
                    <button onClick={() => setIsPinned(!isPinned)}><i className={"fa-solid fa-thumbtack " + isPinnedClass}></i></button>
                    <div className="color-container">
                        <button onClick={() => setIsPalatteOpen(prev => !prev)}><i className="fa-solid fa-palette"></i></button>
                        {isPalatteOpen && < ColorPalette changeColor={handleChangeColor} />}
                    </div>
                    <button onClick={onSubmit}>{editedNote === 'new' ? 'Add' : 'Edit'}</button>
                </div>
            </div>
        </section>
    </div>
}