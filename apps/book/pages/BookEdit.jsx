import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { bookService } from "../services/book.service.js"
const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React

export function BookEdit() {
    const params = useParams()
    const [book, setBook] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    useEffect(() => {
        if (params.bookId) {
            bookService.get(params.bookId)
                .then(setBook)
        }
    }, [])

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        if (type === 'number') value = +value
        if (prop === 'authors') {
            value = [value]
        }
        setBook(prev => ({ ...prev, [prop]: value }))
    }

    function submit(event) {
        event.preventDefault()
        if (book.id === '') {
            bookService.add(book)
                .then(() => {
                    navigate('/book')
                    showSuccessMsg('Book added successfully')
                })
        }
        else {
            bookService.save(book)
                .then(() => {
                    navigate('/book')
                    showSuccessMsg('Book edited successfully')
                })
        }

    }
    const authorsStr = book.authors[0] === 'anonymous' ? '' : book.authors[0]
    const buttonTxt = book.id === '' ? 'Add' : 'Edit'

    return <div className="edit" >
        <header>
            <h2>{buttonTxt + ' Book!'}</h2>
            <button onClick={() => navigate('/book')} className="close-button" >X</button>
        </header>

        <form action="" onSubmit={submit}>

            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" placeholder="Enter title"
                    value={book.title} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="authors">Author:</label>
                <input type="text" id="author" name="authors" placeholder="Enter author"
                    value={authorsStr} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" placeholder="Enter description"
                    value={book.description} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="publishedDate">Publish Year:</label>
                <input type="number" id="publishedDate" name="publishedDate"
                    value={book.publishedDate} max="2024" min="1950" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="pageCount">Number of Pages:</label>
                <input type="number" id="pageCount" name="pageCount"
                    value={book.pageCount} min="20" max="1000" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price"
                    value={book.price} max="250" min="10" onChange={handleChange} />
            </div>
            <button>{buttonTxt}</button>
        </form>
    </div>
}


