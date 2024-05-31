import { bookService } from "../services/book.service.js"
import { googleBookService } from "../services/google.book.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { BookEdit } from "./BookEdit.jsx"

const { useNavigate } = ReactRouter
const { useState } = React
export function BookAdd() {
    const [addingType, setAddingType] = useState('')
    const [bookList, setBookList] = useState(null)
    const navigate = useNavigate()

    function searchBooks({ target }) {
        const txt = target.value
        googleBookService.query(txt)
            .then(list => setBookList(list))

    }
    function addBook(book) {
        bookService.add(book)
            .then(() => {
                navigate('/book')
            })
            .then(() => showSuccessMsg('Book added successfully'))
            .catch(() => showErrorMsg('Error: Can not add book'))
    }

    return <section className="add">
        <section className="type-buttons">
            <div onClick={() => setAddingType('regular')} >
                <i className="fa-regular fa-pen-to-square"></i>
                <p>Manually</p>
            </div>
            <div onClick={() => setAddingType('google')}>
                <i class="fa-brands fa-google"></i>
                <p>By Google</p>
            </div>
        </section>

        {addingType === 'google' &&
            <section >
                <div>
                    <label htmlFor="title">Add Book</label>
                    <input type="text" id="title" onChange={searchBooks} />
                </div>
                {bookList && <ul>
                    {bookList.map(book => {
                        return <li key={book.id}>
                            {book.title}
                            <button onClick={() => addBook(book)} >+</button>
                        </li>
                    })}
                </ul>}
            </section>}
        {addingType === 'regular' && <BookEdit />}
    </section>


}