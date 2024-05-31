const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"


import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { BookCategory } from "./BookCategory.jsx"

export function BooksIndex() {
    const [books, setBooks] = useState([])
    const [searchParams, setSearchParams]= useSearchParams()
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))
    


    useEffect(() => {
        setSearchParams(filterBy)
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }
        , [filterBy])

    function removeBook(bookId) {
        bookService.remove(bookId)
            .then(setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId)))
            .then(() => showSuccessMsg('Book removed successfully'))
            .catch(() => showErrorMsg('Error: Can not remove book'))
    }


    function onFilterBy(filter) {
        setFilterBy(filter)
    }

    function getCategories(categories) {
        return categories.map(category => {
            return <div key={category.title} className="category">
                <div style={{ height: category.value*10 + 'px' }}>{category.value}%</div>
                <p>{category.title}</p>
            </div>
        })
    }
    const categories = bookService.getCategories(books)




    return <section>
        <BookFilter filterBy={filterBy} setFilterBy={onFilterBy} />
        <section className="main-buttons">
            <Link to="/book/add"><button>Add Book!</button></Link>
        </section>
        <BookList list={books} onRemove={removeBook} />
        <BookCategory>
            {getCategories(categories)}
        </BookCategory>
    </section>
}