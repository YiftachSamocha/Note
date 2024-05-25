export function NoteModifyImg({ info, setInfo }) {

    function handleChange({ target }) {
        const file = target.files[0]
        const imageUrl = URL.createObjectURL(file)
        const img = new Image()
        img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)
            const dataUrl = canvas.toDataURL('image/png')
            setInfo({ ...info, url: dataUrl })

        }
        img.src = imageUrl
    }

    return <section className="add-info">
        <input type="file" accept="image/*"
            onChange={handleChange} id="image" />
        {info.url && <img src={info.url} />}
    </section>


}