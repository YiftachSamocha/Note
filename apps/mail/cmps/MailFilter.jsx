const { useState, useEffect } = React

export function MailFilter({ folder, filterBy, onFilter, onSetToggleMenu }) {
    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy, ...folder})

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target}) {
        const { name, value } = target

        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value}))
    }

    return <section className="mail-filter">
        <div className="search-box">
            <button class="toggle-menu-btn" type="button" onClick={(ev) => onSetToggleMenu(ev, true)}>☰</button>
            <label htmlFor="txt"><img src="./assets/img/search.png"/></label>
            <input value={filterByToEdit.txt} onChange={handleChange} name="txt" type="text" placeholder="Search" id="txt"/>
        </div>

        <select name="readStatus" onChange={handleChange}>
            <option value="">All</option>
            <option value="read">Read Mails</option>
            <option value="unread">Unread Mails</option>
        </select>
    </section>
}