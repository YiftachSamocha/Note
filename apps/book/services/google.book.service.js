import { utilService } from './util.service.js'
import axios from "./axios.js"
export const googleBookService = { query, createGoogleBookList }

const BOOKS_KEY = 'BOOKS'

const url = 'https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20'
function query(txt) {
    return axios.get(url + txt)
        .then(list => {
            return list.data.items.map(item => {
                const book = item.volumeInfo
                return {
                    id: item.id,
                    title: book.title,
                    price: utilService.getRandomIntInclusive(20, 250),
                    subtitle: book.subtitle,
                    authors: book.authors ? book.authors : ['anonymous'],
                    publishedDate: book.publishedDate,
                    description: book.description,
                    pageCount: book.pageCount,
                    categories: book.categories ? book.categories : ['uncategorized'],
                    thumbnail: book.imageLinks.smallThumbnail,
                    reviews: [],
                    language: book.language,
                    listPrice:
                    {
                        amount: 100,
                        currencyCode: "EUR",
                        isOnSale: Math.random() > 0.7
                    }

                }
            })
        })
}

function createGoogleBookList() {
    return axios.get(url)
        .then(list => {
            return list.data.items.map(item => {
                const book = item.volumeInfo
                return {
                    id: item.id,
                    title: book.title,
                    price: utilService.getRandomIntInclusive(20, 250),
                    subtitle: book.subtitle,
                    authors: book.authors ? book.authors : ['anonymous'],
                    publishedDate: book.publishedDate,
                    description: book.description,
                    pageCount: book.pageCount,
                    categories: book.categories ? book.categories : ['uncategorized'],
                    thumbnail: book.imageLinks.smallThumbnail,
                    reviews: [],
                    language: book.language,
                    listPrice:
                    {
                        amount: 100,
                        currencyCode: "EUR",
                        isOnSale: Math.random() > 0.7
                    }

                }
            })
        }).then(list => {
            utilService.saveToStorage(BOOKS_KEY, list)
            return list
        })
}