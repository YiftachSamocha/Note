const { useState } = React
export function NoteFilterTxt({ filterBy, onFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy.txt)

    function handleChange({ target }) {
        const { value } = target
        setFilterByToEdit(value)
        onFilter({ ...filterBy, txt: value })
    }

    return <div className="filter-txt">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search" value={filterByToEdit} onChange={handleChange} />
    </div> 
    
}