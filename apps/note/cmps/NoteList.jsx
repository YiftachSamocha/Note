import { NotePreview } from "./NotePreview.jsx"

export function NoteList() {
    const demoData = [{ txt: 'hey' }, { txt: 'hey' }, { txt: 'hey' }, { txt: 'hey' }, { txt: 'hey' }]
    return <section className="notes-container">
        {demoData.map(note => {
            return <NotePreview note={note}/>
        })}

    </section>
}
