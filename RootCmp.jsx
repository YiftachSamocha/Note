const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { MailDetails } from "./apps/mail/pages/MailDetails.jsx"
import { BooksIndex } from "./apps/book/pages/BookIndex.jsx"
import { BookDetails } from "./apps/book/pages/BookDetails.jsx"
import { BookEdit } from "./apps/book/pages/BookEdit.jsx"
import { BookAdd } from "./apps/book/pages/BookAdd.jsx"


export function App() {
    return <Router>
        <section className="app">
            <AppHeader />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />}>
                    <Route path="/mail/:mailId" element={<MailDetails />} />
                </Route>

                <Route path="/note" element={<NoteIndex />} />

                <Route path="/book" element={<BooksIndex />} />
                <Route path="/book/:bookId" element={<BookDetails />} />
                <Route path="/book/edit/:bookId" element={<BookEdit />} />
                <Route path="/book/add" element={<BookAdd />} />

            </Routes>

            <UserMsg />
        </section>
    </Router>
}