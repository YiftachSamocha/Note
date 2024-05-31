import { bookService } from "../services/book.service.js"
import { utilService } from "../../../services/util.service.js"
import { BookRating } from "./BookRating.jsx"

const { useState, useEffect } = React
export function BookReview({ book }) {
    const [reviewList, setReviewList] = useState([])
    const [currReview, setCurrReview] = useState(bookService.getEmptyReview())
    useEffect(() => {
        bookService.getReviews(book.id)
            .then(setReviewList)
    }, [book])

    function submit(event) {
        event.preventDefault()
        const review = {
            id: utilService.makeId(),
            reviewer: currReview.reviewer,
            rating: currReview.rating,
            date: currReview.date,
        }
        const { id } = book
        bookService.addReview(id, review)
            .then(newBook => {
                setReviewList(newBook.reviews)
            })

    }

    function handleChange({ target }) {
        const { name: prop, value } = target
        setCurrReview(prev => ({ ...prev, [prop]: value }))
    }

    function onDeleteReview(reviewId) {
        return bookService.deleteReview(book.id, reviewId)
            .then(book => setReviewList(book.reviews))

    }
    function createStars(rating) {
        var stars = ''
        for (var i = 0; i < rating; i++) {
            stars += '⭐️'
        }
        return stars

    }

    return <section className="reviews">
        <div className="reviews-input">
            <h5>Add Review</h5>
            <form onSubmit={submit} >
                <div>
                    <label htmlFor="reviewer">Name:</label>
                    <input type="text" id="reviewer" value={currReview.reviewer}
                        name="reviewer" onChange={handleChange} />
                </div>
                <BookRating onChange={handleChange}/>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input type="date" value={currReview.date}
                        name="date" id="date" onChange={handleChange} />
                </div>
                <button>Submit</button>
            </form>
        </div>
        <div className="reviews-list">

            {reviewList.length === 0 ? <h4>No reviews yet... Add one!</h4> : reviewList.map(review => {
                return <div key={review.id}>
                    <p>Reviewer:  {review.reviewer}</p>
                    <p>Rating:  {createStars(review.rating)}</p>
                    <p>Date:  {review.date}</p>
                    <button onClick={() => onDeleteReview(review.id)} >X</button>
                </div>
            })

            }

        </div>
    </section>
}
