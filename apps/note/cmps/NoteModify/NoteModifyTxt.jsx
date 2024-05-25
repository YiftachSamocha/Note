export function NoteModifyTxt({ info, setInfo }) {
    
    function handleChange({ target }) {
        const { value } = target
        setInfo({ ...info, txt: value })
    }

    return <input type="text" placeholder='Enter text'
        onChange={handleChange} value={info.txt || ''} />
}