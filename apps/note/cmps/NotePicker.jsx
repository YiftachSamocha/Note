export function ColorPalette({ changeColor, colors }) {
    return <section className="picker palette">
        {colors.map(color => {
            return <div key={color} 
                style={{ backgroundColor: color }} onClick={() => changeColor(color)}></div>
        })}

    </section>
}