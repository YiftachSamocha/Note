import { NoteList } from "../cmps/NoteList.jsx"
import { NoteFilterType } from "../cmps/NoteFilterType.jsx"
const { useState } = React
export function NoteIndex() {
    const [filterBy, setFilterBy] = useState({ txt: '', type: '' })
    return <section className="note-app">
        <section>
            <NoteFilterType filterBy={filterBy} onFilter={setFilterBy} />
            <NoteList filterBy={filterBy} />
        </section>
    </section>






}
