export function NoteModifyTitle({ title, setTitle }) {
    
    function handleChange({ target }) {
        const { value } = target
        setTitle(value)
    }

    return <input type="text" placeholder="Enter title"
        onChange={handleChange} value={title} className="input-title" />
}