import { noteService } from "../services/note.service.js"

export function ColorPallete({ changeColor }) {
    const colors = noteService.getColors()
    return <section>
        {colors.map(color => {
            return <div key={color} className="color"
                style={{ backgroundColor: color }} onClick={() => changeColor(color)}>{color}</div>
        })}

    </section>
}