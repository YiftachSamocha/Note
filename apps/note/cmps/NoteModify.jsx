import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"
import { ColorPalette } from "./ColorPalette.jsx"

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


    function handleChangeTitle({ target }) {
        const { value } = target
        setTitle(value)
    }

    function handleChangeTxt({ target }) {
        const { value } = target
        setInfo({ ...info, txt: value })
    }


    function handleChangeImg({ target }) {
        const file = target.files[0]
        const imageUrl = URL.createObjectURL(file)
        const img = new Image()
        img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)
            const dataUrl = canvas.toDataURL('image/png')
            setType('img')
            setInfo({ ...info, url: dataUrl })

        }
        img.src = imageUrl
    }

    function handleChangeVideo({ target }) {
        const { value } = target
        setInfo({ ...info, url: value })
    }


    function handleChangeTodos({ target }) {
        const { value, name, type, checked } = target
        const changedType = type === 'text' ? 'txt' : 'isMarked'
        const changedValue = changedType === 'txt' ? value : checked
        const todoNum = Number(name)
        setInfo(prevInfo => {
            const newTodos = [...prevInfo.todos]
            newTodos[todoNum] = { ...newTodos[todoNum], [changedType]: changedValue }
            if (todoNum === newTodos.length - 1) {
                newTodos.push({ txt: '', isMarked: false, id: utilService.makeId(3) })
            }
            return { ...prevInfo, todos: newTodos }
        })
    }

    function handleChangeAudio({ target }) {
        const file = target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            setInfo(prevInfo => ({ ...prevInfo, audio: '' }))
            reader.onloadend = () => {
                const base64String = reader.result
                setInfo(prevInfo => ({ ...prevInfo, audio: base64String }))
            }
        }
    }


    function handleChangeColor(newColor) {
        setColor(newColor)
        setIsPalatteOpen(false)
    }


    function isChosen(buttonType) {
        return type === buttonType ? 'chosen' : ''
    }



    function createInput() {
        let input
        switch (type) {
            case 'txt':
                input = <input type="text" placeholder='Enter text'
                    onChange={handleChangeTxt} value={info.txt || ''} />
                break
            case 'img':
                input = [<input type="file" accept="image/*"
                    onChange={handleChangeImg} id="image" />]
                if (info.url) input.push(<img src={info.url} />)

                break
            case 'video':
                input = <input type="text" placeholder='Enter YouTube link'
                    onChange={handleChangeVideo} value={info.url || ''} />
                break
            case 'todos':
                let todosInputs = []
                for (var i = 0; i < info.todos.length; i++) {
                    const todoInput = <div key={i}>
                        <input
                            type="text"
                            placeholder='Enter Item'
                            name={i.toString()}
                            onChange={handleChangeTodos}
                            value={info.todos[i] && info.todos[i].txt ? info.todos[i].txt : ''}
                            className={info.todos[i] && info.todos[i].isMarked ? 'marked' : ''} />
                        <input type="checkbox"
                            checked={info.todos[i].isMarked}
                            onChange={handleChangeTodos}
                            name={i.toString()} />
                    </div>


                    todosInputs.push(todoInput)
                }

                input = <div className="todos-inputs">{todosInputs}</div>
                break
            case 'audio':
                input = [<input type="file" accept="audio/*"
                    onChange={handleChangeAudio} id="audio" key={new Date().toISOString()} />]
                if (info.audio) input.push(<audio controls> <source src={info.audio} type="audio/mpeg" /> </audio>)
                break


        }
        return input
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

            <input type="text" placeholder="Enter title"
                onChange={handleChangeTitle} value={title} className="input-title" />
            {createInput()}

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