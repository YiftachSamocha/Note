import { noteService } from "../services/note.service.js"
import { ColorPalette } from "./ColorPalette.jsx"

const { useState } = React

export function NoteAdd({ onAdd }) {
    const [title, setTitle] = useState('')
    const [info, setInfo] = useState({ txt: '', ur: '', todos: [{ txt: '', isMarked: false }] })
    const [type, setType] = useState('txt')
    const [color, setColor] = useState('#FFFFFF')
    const [isPalatteOpen, setIsPalatteOpen] = useState(false)


    function handleChangeTitle({ target }) {
        const { value } = target
        setTitle(value)
    }

    function handleChangeTxt({ target }) {
        const { value } = target
        setInfo({ txt: value })
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
            setInfo({ url: dataUrl })

        }
        img.src = imageUrl
    }

    function handleChangeVideo({ target }) {
        const { value } = target
        setInfo({ url: value })
    }


    function handleChangeTodos({ target }) {
        const { value, name } = target
        const todoNum = Number(name)
        setInfo(prevInfo => {
            const newTodos = [...prevInfo.todos]
            newTodos[todoNum] = { ...newTodos[todoNum], txt: value }
            if (todoNum === newTodos.length - 1) {
                newTodos.push({ txt: '', isMarked: false })
            }
            return { ...prevInfo, todos: newTodos };
        });
    }


    function handleChangeColor(color) {
        setColor(color)
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
                    const todoInput = <input
                        type="text"
                        placeholder='Enter Item'
                        name={i.toString()}
                        onChange={handleChangeTodos}
                        value={info.todos[i] && info.todos[i].txt ? info.todos[i].txt : ''}
                        key={i} />
                    todosInputs.push(todoInput)
                }

                input = <div className="todos-inputs">{todosInputs}</div>

        }
        return input
    }



    function onSubmit() {
        const note = noteService.getEmptyNote()
        if (type === 'video') {
            if (noteService.isValidLink(info.url)) info.url = noteService.convertToEmbedLink(info.url)
            else {
                alert('Please enter a valid YouTube link')
                return
            }
        }
        if (type === 'todos') info.todos = info.todos.slice(0, -1)
        note.style = color
        note.info = {
            title,
            ...info
        }
        note.type = type
        onAdd(note)
        setTitle('')
        setInfo({ txt: '', ur: '', todos: [{ txt: '', isMarked: false }] })
        setColor('#FFFFFF')

    }

    return <section style={{ backgroundColor: color }} className="note-add">


        <input type="text" placeholder="Enter title"
            onChange={handleChangeTitle} value={title} className="input-title" />
        {createInput()}

        <div className="buttons">
            <div className="types">
                <div onClick={() => setType('txt')} className={isChosen('txt')}>Text</div>
                <div onClick={() => setType('todos')} className={isChosen('todos')} ><i className="fa-solid fa-list"></i></div>
                <div onClick={() => setType('video')} className={isChosen('video')}><i className="fa-brands fa-youtube"></i></div>
                <label htmlFor="image"><div onClick={() => setType('img')} className={isChosen('img')} ><i className="fa-regular fa-image"></i></div></label>


            </div>

            <div className="actions">
                <div className="color-container">
                    <button onClick={() => setIsPalatteOpen(prev => !prev)}><i className="fa-solid fa-palette"></i></button>
                    {isPalatteOpen && < ColorPalette changeColor={handleChangeColor} />}
                </div>
                <button onClick={onSubmit}>Add</button>
            </div>
        </div>




    </section>
}