const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

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
        mailService.remove(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
                showSuccessMsg('The mail has been removed successfully!')
            })
            .catch(() => {
                showErrorMsg('The mail could not be removed')
            })
    }

    function changeStarMail(mailId) {
        mailService.changeStarMail(mailId)
            .then(() => {
                setMails(prevMails => {
                    const mailIdx = prevMails.findIndex(mail => mail.id === mailId)
                    prevMails[mailIdx].isStared = !prevMails[mailIdx].isStared
                    return [...prevMails]
                })
                showSuccessMsg('The mail has been updated successfully!')
            })
            .catch(() => {
                showErrorMsg('The mail could not be updated')
            })
    }

    return (
        <section className="mail-index grid-content">
            <header className="grid-sections">
                    <MailCompose />
                    <MailFilter />
            </header>
            <aside className="grid-sections">
                    <MailFolderList />
                    <MailList mails={mails} onRemoveMail={removeMail} onChangeStarMail={changeStarMail}/>
            </aside>
        </section>
    )
}