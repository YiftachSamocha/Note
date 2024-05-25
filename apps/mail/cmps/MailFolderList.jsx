const { useState, useEffect } = React

export function MailFolderList({ folder, onSetFolder }) {
    // console.log(filterBy)
    // const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    // useEffect(() => {
    //     onFilter(filterByToEdit)
    // }, [filterByToEdit])

    // function handleChange({ target}) {
    //     const { name, value } = target

    //     setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value}))
    // }
    

    // function onSetFolder({ target }) {
    //     setFolder(target.value)
    // }

    return (
        <section className="mail-folder">
            <select name="status" onChange={ onSetFolder }>
                <option value="inbox">Inbox</option>
                <option value="starred">Starred</option>
                <option value="sent">Sent</option>
                <option value="drafts">Drafts</option>
                <option value="trash">Trash</option>
            </select>
        </section>
    )
}