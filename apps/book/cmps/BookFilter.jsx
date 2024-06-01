const { useState, useEffect } = React
export function BookFilter({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])
    
    function handleFilter({ target }) {
        const { type, name } = target
        const value = (type === 'number') ? +target.value : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    return <section className="filter">
        <div>
            <label htmlFor="bookName">Name:</label>
            <input type="text" name="txt" id="bookName" onChange={handleFilter} value={filterByToEdit.txt} />
        </div>

        <div>
            <label htmlFor="bookPrice">Max Price:</label>
            <input type="number" name="maxPrice" id="bookPrice" onChange={handleFilter} value={filterByToEdit.maxPrice} />
        </div>

    </section>
}