export function NoteModifyVideo({ info, setInfo }) {
    function handleChange({ target }) {
        const { value } = target
        setInfo({ ...info, url: value })
    }
    return <input type="text" placeholder='Enter YouTube link'
        onChange={handleChange} value={info.url || ''} />
}