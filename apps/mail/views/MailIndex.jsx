const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"

export function MailIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        mailService.query(filterBy)
            .then((mails) => setMails(mails))
    }, [filterBy])

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    function removeMail(mailId) {
        bookService.remove(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
                showSuccessMsg('The mail has been removed successfully!')
            })
            .catch(() => {
                showErrorMsg('The mail could not be removed')
            })
    }

    return (
        <section className="mail-index grid-content">
            <header className="grid-sections">
                <div className="mail-compose">
                    <MailCompose />
                </div>
                <div className="mail-filter">
                    <MailFilter />
                </div>
            </header>
            <aside className="grid-sections">
                <div className="mail-folder-list">
                    <MailFolderList />
                </div>
                <div className="mail-list">
                    <MailList />
                </div>
            </aside>
        </section>
    )
}

