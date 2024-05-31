const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { Loader } from "../cmps/Loader.jsx"
import { bookService } from "../services/book.service.js"
import { BookReview } from "../cmps/BookReview.jsx"

export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        bookService.get(params.bookId)
            .then(book => {
                setBook(book)
            })
            .catch(() => {
                navigate('/book')
            })
    }, [params.bookId])
    if (!book) return <Loader />

    function setCaptions() {
        let authorsStr = ''
        for (var i = 0; i < book.authors.length; i++) {
            if (i === book.authors.length - 2) {
                authorsStr += book.authors[i] + ' & '
            } else if (i === book.authors.length - 1) {
                authorsStr += book.authors[i]
            } else {
                authorsStr += book.authors[i] + ', '
            }
        }
        const { pageCount } = book
        var readingType = ''
        switch (true) {
            case pageCount < 100:
                readingType = 'Light Reading'
                break
            case pageCount < 200:
                readingType = 'Normal Reading'
                break
            case pageCount < 500:
                readingType = 'Decent Reading'
                break
            case pageCount > 500:
                readingType = 'Serious Reading'
                break
        }
        readingType = ',   ' + readingType + '...'
        const isOnSale = book.listPrice.isOnSale ? 'On Sale!' : ''
        const timing = (2024 - book.publishedDate > 10) ? ',   Vintage...' : '   New!'
        var colorClass = ''
        if (book.price > 120) colorClass = 'red'
        else if (book.price < 80) colorClass = 'green'
        const { prevBookId, nextBookId } = book
        const captions = { authorsStr, readingType, pageCount, isOnSale, timing, colorClass, prevBookId, nextBookId }
        return captions
    }

    const captions = setCaptions()
    console.log(captions)

    return <div className="details">
        <div className="button-container">
            <div>
                <Link to={`/book/${captions.prevBookId}`}><button>Prev</button></Link>
                <Link to={`/book/${captions.nextBookId}`}> <button>Next</button></Link>
            </div>
            <Link to="/book"><button >X</button></Link>
        </div>
        <div className="book-info">
            <div>
                <div>
                    <h1>{book.title}</h1>
                    <h2>Written by {captions.authorsStr}</h2>
                    <p>{book.subtitle}</p>
                    <p>{book.description}</p>
                    <p>Published in {book.publishedDate} {captions.timing}</p>
                    <p>Categories: {book.categories[0]}, {book.categories[1]}</p>
                    <p>Number of Pages: {book.pageCount} {captions.readingType}</p>
                    <p>Amount: {book.listPrice.amount}</p>
                    <h5 className={captions.colorClass}>Price: {book.price}₪  {captions.isOnSale}</h5>
                </div>
                <img src={book.thumbnail} />
            </div>
            <BookReview book={book} />
        </div>
    </div>

}
