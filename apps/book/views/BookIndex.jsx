const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { booksService } from '../services/books.service.js'
import { BookList } from '../cmps/BookList.jsx' 
import { BookFilter } from '../cmps/BookFilter.jsx'
import { showSuccessMsg } from '../../../services/event-bus.service.js'


export function BookIndex() {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(booksService.getDefaultFilter())

    useEffect(() => {
        booksService.query(filterBy).then(books => setBooks(books))
    }, [filterBy])

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    function removeBook(bookId) {
        booksService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => bookId !== book.id))
                showSuccessMsg('Book has been successfully removed!')
            })
            .catch(() => {
                showErrorMsg(`couldn't remove book`)
                navigate('/book')
            })
    }

    return (
        <div className='books-container'>
            <h2>Books list</h2>
            <BookFilter filterBy={filterBy} onFilterBy={onSetFilterBy} />
            <Link to="/book/edit"><button className='add-book'>Add book</button></Link>
            <BookList books={books} onRemove={removeBook} />
        </div>
    )
}