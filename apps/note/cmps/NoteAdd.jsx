import { noteService } from "../services/note.service.js"
import { ColorPallete } from "./ColorPalette.jsx"

const { useState, useEffect, useRef } = React

export function NoteAdd({ onAdd }) {
    const [title, setTitle] = useState('')
    const [info, setInfo] = useState('')
    const [type, setType] = useState('txt')
    const [todos, setTodos] = useState('')
    const [color, setColor] = useState('#FFFFFF')
    const [isPalatteOpen, setIsPalatteOpen] = useState(false)


    function handleChangeTitle({ target }) {
        const { value } = target
        setTitle(value)
    }

    function handleChangeInfo({ target }) {
        const { value } = target
        let info = ''
        switch (type) {
            case 'txt':
                info = { txt: value }
                break
            case 'video':
                const embedUrl = convertToEmbedLink(value)
                info = { url: embedUrl }
                break
            case 'todos':
                handleChangeTodos(target)
                break

        }
        setInfo(info)
    }

    function handleChangeColor(color) {
        setColor(color)
        setIsPalatteOpen(false)
    }

    let placeholder = ''
    switch (type) {
        case 'txt':
            placeholder = 'Enter text'
            break
        case 'video':
            placeholder = 'Enter YouTube link'
            break
        case 'todos':
            placeholder = 'Enter item'
            break
    }
    function isChosen(buttonType) {
        return type === buttonType ? 'chosen' : ''
    }

    function convertToEmbedLink(youtubeUrl) {
        let videoId = youtubeUrl.split('v=')[1] || youtubeUrl.split('/')[3]
        const ampersandPosition = videoId.indexOf('&')
        if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition)
        }
        return `https://www.youtube.com/embed/${videoId}`
    }

    function createNote() {
        const note = noteService.getEmptyNote()
        note.style = color
        note.info = {
            title,
            ...info
        }
        note.type = type
        return note
    }

    function getImage({ target }) {
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
            setInfo(() => {
                return { url: dataUrl }
            })

        }
        img.src = imageUrl
    }


    // const containerRef = useRef(null)

    // useEffect(() => {
    //     const inputs = containerRef.current.querySelectorAll('input');
    // }, [])
    // function handleChangeTodos(target) {

    //     const lastInput = inputs[inputs.length - 1]
    //     if (target === lastInput) {
    //         setTodos(todos => {
    //             return todos + <input type="text" placeholder={placeholder} />
    //         })
    //     }
    //     setType('todos')
    //     const todo = { txt: target.value, isMarked: false }
    //     setInfo(todo)
    // }








    return <section style={{ backgroundColor: color }}>

        <div className="content">
            <input type="text" placeholder="Enter title"
                onChange={handleChangeTitle} value={title} />
            <input type="text" placeholder={placeholder}
                onChange={handleChangeInfo} value={info.txt} />
        </div>

        <div className="types">
            <div onClick={() => setType('txt')} className={isChosen('txt')}>Txt</div>
            <div onClick={() => setType('todos')} className={isChosen('todos')} >Todo</div>
            <div onClick={() => setType('video')} className={isChosen('video')}>Video</div>
            <input type="file" accept="image/*" onChange={getImage} className={isChosen('image')} />

        </div>


        <div className="actions">
            <div className="color-container">
                <button onClick={() => setIsPalatteOpen(prev => !prev)}>Color</button>
                {isPalatteOpen && < ColorPallete changeColor={handleChangeColor} />}
            </div>
            <button onClick={() => onAdd(createNote())}>Add</button>
        </div>


    </section>
}