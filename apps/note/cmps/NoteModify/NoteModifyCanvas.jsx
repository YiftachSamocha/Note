import { noteService } from "../../services/note.service.js"
import { ColorPalette } from "../ColorPalette.jsx"

const { useState, useEffect, useRef } = React
export function NoteModifyCanvas({ info, setInfo }) {
    const canvasRef = useRef(null)
    const [color, setColor] = useState('#000000')
    const [size, setSize] = useState('2px')
    const [isPaletteOpen, setIsPaletteOpen] = useState(false)
    const [isSizeEditorOpen, setIsSizeEditorOpen] = useState(false)
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() => {
        if (info.canvas) {
            const img = new Image()
            img.onload = () => {
                const canvas = canvasRef.current
                const context = canvas.getContext('2d')
                context.drawImage(img, 0, 0)
            }
            img.src = info.canvas
        }
    }, [info])



    function changeColor(color) {
        setColor(color)
        setIsPaletteOpen(false)
    }

    function changeSize(size) {
        setSize(size)
        setIsSizeEditorOpen(false)
    }

    function startDraw(event) {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        context.strokeStyle = color
        context.lineWidth = size
        context.lineCap = 'round'

        context.beginPath()
        const { offsetX, offsetY } = event.nativeEvent
        context.moveTo(offsetX, offsetY)
        context.stroke()
        setIsDrawing(true)
    }

    function draw(event) {
        if (!isDrawing) return
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        const { offsetX, offsetY } = event.nativeEvent
        context.lineTo(offsetX, offsetY)
        context.stroke()
        context.moveTo(offsetX, offsetY)
    }

    function endDraw() {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.closePath()
        setIsDrawing(false)
        submitDrawing()
    }

    function submitDrawing() {
        const canvas = canvasRef.current
        const dataUrl = canvas.toDataURL('image/png')
        setInfo({ ...info, canvas: dataUrl })
    }

    function clearDraw() {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    function SizeEditor({ sizes, changeSize }) {
        return <section className="picker size-editor">
            {sizes.map(size => {
                const divSize = size * 3 + 'px'
                return <div onClick={() => changeSize(size)}>
                    <div key={size}
                        style={{ height: divSize, width: divSize }}></div>
                </div>
            })}


        </section>

    }
    return <section className="canvas">
        <div className="canvas-buttons" >
            <div className="color-container">
                <button onClick={() => setIsPaletteOpen(prev => !prev)}><i className="fa-solid fa-palette"></i></button>
                {isPaletteOpen && < ColorPalette changeColor={changeColor} colors={noteService.getCanvasColors()} />}
            </div>
            <div className="size-container">
                <button onClick={() => setIsSizeEditorOpen(prev => !prev)}><i className="fa-solid fa-pencil"></i></button>
                {isSizeEditorOpen && <SizeEditor sizes={noteService.getCanvasSizes()} changeSize={changeSize} />}
            </div>
            <button onClick={clearDraw} ><i className="fa-solid fa-eraser"></i></button>
        </div>
        <canvas
            ref={canvasRef}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            width="450"
            height="220">

        </canvas>

    </section>
}