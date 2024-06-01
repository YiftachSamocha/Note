import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { googleBookService } from './google.book.service.js'

export const bookService = {
    query, remove, add, get, save, addReview, getReviews, deleteReview,
    getEmptyReview, getEmptyBook, getDeafultFilter, getCategories, getFilterFromSearchParams,
}
const BOOKS_KEY = 'booksDB'

function query(filterBy) {
    return storageService.query(BOOKS_KEY)
        .then(books => {
            if (books.length === 0) return _createBooks()
            else return books
        })
        .then(books => {
            if (filterBy.txt) {
                books = books.filter(book => book.title.includes(filterBy.txt))
            }
            if (filterBy.maxPrice) {
                books = books.filter(book => book.price < filterBy.maxPrice)
            }
            return books

        })


}

function remove(bookId) {
    return storageService.remove(BOOKS_KEY, bookId)
}

function add(book) {
    return storageService.post(BOOKS_KEY, book)
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
        .then(book => {
            book = _setNextPrevBookId(book)
            return book
        })
}

function save(book) {
    return storageService.query(BOOKS_KEY)
        .then(books => {
            if (books.some(currBook => book.id === currBook.id)) return storageService.put(BOOKS_KEY, book)
            return storageService.post(BOOKS_KEY, book)
        })


}

function getEmptyBook() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const book = {
        id: '',
        title: '',
        price: 0,
        subtitle: utilService.makeLorem(4),
        authors: [],
        publishedDate: 0,
        description: '',
        pageCount: 0,
        categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)], ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
        thumbnail: `http://coding-academy.org/books-photos/${utilService.getRandomIntInclusive(1, 20)}.jpg`,
        reviews: [],
        language: "en",
        listPrice:
        {
            amount: 100,
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        }
    }
    return book
}

function addReview(bookId, review) {
    return storageService.get(BOOKS_KEY, bookId)
        .then(book => {
            book.reviews.push(review)
            return storageService.put(BOOKS_KEY, book)
        })

}

function getReviews(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
        .then(book => {
            return book.reviews
        })
}

function deleteReview(bookId, reviewId) {
    return storageService.get(BOOKS_KEY, bookId)
        .then(book => {
            const index = book.reviews.findIndex(review => review.id === reviewId)
            book.reviews.splice(index, 1)
            return storageService.put(BOOKS_KEY, book)

        })
}

function getEmptyReview() {
    return {
        reviewer: '',
        rating: 1,
        date: '2024-05-13',
        id: utilService.makeId()
    }
}

function getDeafultFilter() {
    return {
        txt: '',
        maxSpeed: 300
    }
}

function getCategories(books) {
    let categoriesAmount = {}
    books.forEach(book => {
        for (var i = 0; i < book.categories.length; i++) {
            const currCategory = book.categories[i]
            if (categoriesAmount.hasOwnProperty(currCategory)) {
                categoriesAmount[currCategory]++
            } else {
                categoriesAmount[currCategory] = 1
            }
        }

    })

    const bookSum = books.length
    let categoriesPercent = []
    for (var i = 0; i < Object.keys(categoriesAmount).length; i++) {
        const categoryName = Object.keys(categoriesAmount)[i]
        const categoryValue = Object.values(categoriesAmount)[i]
        const result = (categoryValue * 100) / bookSum
        categoriesPercent.push({ title: categoryName, value: Math.floor(result * 100) / 100 })
    }
    return categoriesPercent

}

function getFilterFromSearchParams(searchParams) {
    return {
        txt: searchParams.get('txt') || '',
        maxPrice: searchParams.get('maxPrice') || '',
    }

}

function _setNextPrevBookId(book) {
    return storageService.query(BOOKS_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}


function _createBooks() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books = []
    for (let i = 0; i < 20; i++) {
        const book = {
            id: utilService.makeId(),
            title: utilService.makeLorem(2),
            price: utilService.getRandomIntInclusive(10, 200),
            subtitle: utilService.makeLorem(4),
            authors: [utilService.makeLorem(1)],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)], ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
            reviews: [],
            language: "en",
            listPrice:
            {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            }
        }
        books.push(book)
    }
    utilService.saveToStorage(BOOKS_KEY, books)
    return books
}