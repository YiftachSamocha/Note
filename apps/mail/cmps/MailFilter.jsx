const { useState, useEffect, useRef } = React

export function MailFilter({ filterBy, onFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    // const readMail = useRef('')

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target}) {
        const { name, value } = target

        // switch (name) {
        //     case 'readStatus':
        //         readMail.current = (readMail.current === 'read' || readMail.current === '') ? 'unread' : 'read'
        //         value = readMail.current
        //         break;
        //     case 'txt':
        //         value = target.value
        // }

        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value}))
    }

    return <section className="mail-filter">
        <div className="search-box">
            <label htmlFor="txt"><img src="../../assets/img/search.png"/></label>
            <input value={filterByToEdit.txt} onChange={handleChange} name="txt" type="text" placeholder="Search" id="txt"/>
        </div>

<<<<<<< HEAD
        <select name="readStatus" onChange={handleChange}>
            <option value="">All</option>
            <option value="read">Read Mails</option>
            <option value="unread">Unread Mails</option>
        </select>
=======
            {/* <button onClick={(ev) => handleChange(ev)} name="readStatus">Read / Unread</button> */}
            <select name="readStatus" onChange={handleChange}>
                <option value="">All</option>
                <option value="read">Read Mails</option>
                <option value="unread">Unread Mails</option>
            </select>
>>>>>>> b7d8270a2fd30c9b57297ee781119d1c11c248e1
    </section>
}