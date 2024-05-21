import { ColorPallete } from "./ColorPalette.jsx"

const { useState } = React

export function NoteAdd({ onAdd }) {
    const [input, setInput] = useState('')
    const [color, setColor] = useState('#FFFFFF')
    const [isPalatteOpen, setIsPalatteOpen] = useState(false)

    function handleChange({ target }) {
        const { value } = target
        setInput(value)
    }

    function changeColor(color) {
        setColor(color)
    }

    const note = {
        txt: input,
        style: color,
    }

    return <section style={{ backgroundColor: color }}>
        <div>
            <label htmlFor="text">Enter text</label>
            <input type="text" id="text" placeholder="Enter text here..."
                onChange={handleChange} value={input} />
        </div>


        <div className="actions">
            <div className="color-container">
                <button onClick={() => setIsPalatteOpen(prev => !prev)}>Color</button>
                {isPalatteOpen && < ColorPallete changeColor={changeColor} />}
            </div>
            <button onClick={() => onAdd(note)}>Add</button>
        </div>


    </section>
}