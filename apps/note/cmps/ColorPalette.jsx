import { noteService } from "../services/note.service.js"

export function ColorPallete({ changeColor }) {
    const colors = noteService.getColors()
    return <section className="palatte">
        {colors.map(color => {
            return <div key={color} 
                style={{ backgroundColor: color }} onClick={() => changeColor(color)}></div>
        })}

    </section>
}