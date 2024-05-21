import { ColorPallete } from "./ColorPalette.jsx"

const { useState } = React

export function NoteAdd({ onAdd }) {
    const [input, setInput] = useState('')
    const [color, setColor] = useState('#FFFFFF')

    function handleChange({ target }) {
        const { value } = target
        setInput(value)
    }

    function changeColor(color) {
        setColor(color)
    }

    const note= {
        txt: input,
        style: color,
    }

    return <section style={{ backgroundColor: color }}>
        <div>
            <label htmlFor="text">Enter text</label>
            <input type="text" id="text" placeholder="Enter text here..."
                onChange={handleChange} value={input}  />
        </div>

        <button onClick={() => onAdd(note)}>Add</button>
        <ColorPallete changeColor={changeColor} />
    </section>
}