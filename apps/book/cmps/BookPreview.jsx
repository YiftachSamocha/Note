const { Link } = ReactRouterDOM
export function BookPreview({ book, onRemove }) {
    function handleDelete(event) {
        event.preventDefault()
        event.stopPropagation()
        onRemove(book.id)
    }

    return <Link to={`/book/${book.id}`}>
        <section className="book" >
            <h2>{book.title}</h2>
            <p>{book.price}₪</p>
            <img src={book.thumbnail} />
            <div>
                <button onClick={handleDelete} className="delete-button"><i className="fa-solid fa-trash"></i></button>
                <Link to={`/book/edit/${book.id}`}><button className="edit-button"><i className="fa-regular fa-pen-to-square"></i></button></Link>
            </div>
        </section>
    </Link>


}