export function NoteModifyAudio({ info, setInfo }) {

    function handleChange({ target }) {
        const file = target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                const base64String = reader.result
                setInfo({ ...info, audio: base64String })

            }
        }
    }
    console.log('NoteModifyAudio Rendered with info:', info)
    return <section className="add-info">
        <input type="file" accept="audio/*"
            onChange={handleChange} id="audio" />
        {info.audio && <audio controls>
            <source src={info.audio} type="audio/mpeg" />
        </audio>}
    </section>


}