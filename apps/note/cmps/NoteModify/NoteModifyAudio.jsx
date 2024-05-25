export function NoteModifyAudio({ info, setInfo }) {
    function handleChange({ target }) {
        const file = target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            setInfo(prevInfo => ({ ...prevInfo, audio: '' }))
            reader.onloadend = () => {
                const base64String = reader.result
                setInfo(prevInfo => ({ ...prevInfo, audio: base64String }))
            }
        }
    }
    return <section>
        <input type="file" accept="audio/*"
            onChange={handleChange} id="audio" key={new Date().toISOString()} />
        {info.audio && <audio controls> <source src={info.audio} type="audio/mpeg" /> </audio>}
    </section>


}