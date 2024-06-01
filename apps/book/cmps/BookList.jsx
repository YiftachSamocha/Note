import { BookPreview } from "./BookPreview.jsx";

export function BookList({ list, onRemove }) {

    return <section className="book-list">
        {list.map(book => {
            return <BookPreview book={book} onRemove={onRemove} key={book.id} />
        })}
    </section>

}