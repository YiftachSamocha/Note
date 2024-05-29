const { useState, useEffect } = React
const { useParams } = ReactRouter
const { Link, useSearchParams, Outlet } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { MailDetails } from "../pages/MailDetails.jsx"

export function MailIndex() {
    const params = useParams()
    const [isMailCompose, setIsMailCompose] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [mails, setMails] = useState([])
    const [folder, setFolder] = useState({ status: 'inbox' })
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams({ ...filterBy, ...folder })
        console.log(filterBy)
        mailService.query({ ...filterBy, ...folder })
        .then((mails) => setMails(mails))
    }, [filterBy, folder, isMailCompose])

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }
    
    function onSetFolder(value) {
        setFolder(prevFolder => {
            return ({...prevFolder, status: value })
        })
        setSearchParams({ ...filterBy, status: value })
    }

    function onSetIsMailCompose() {
        setIsMailCompose(false)
    }

    function sendMail(mail) {
        mailService.send(mail)
            .then(() => {
                showSuccessMsg('The mail has been sent successfully!')
            })
            .catch(() => {
                showErrorMsg('The mail could not be send')
            })
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

    // function removeMailFromTrash(mailId) {
    //     mailService.remove(mailId)
    //         .then(() => {
    //             setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
    //             showSuccessMsg('The mail has been removed successfully!')
    //         })
    //         .catch(() => {
    //             showErrorMsg('The mail could not be removed')
    //         })
    // }

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

    function changeMailRead(mailId) {
        mailService.changeMailRead(mailId)
            .then(() => {
                setMails(prevMails => {
                    const mailIdx = prevMails.findIndex(mail => mail.id === mailId)
                    prevMails[mailIdx].isRead = !prevMails[mailIdx].isRead
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
                    <div className="mail-compose-btn">
                        <span onClick={() => setIsMailCompose(true)}><img src="../../assets/img/pencil.png"/>Compose</span>
                    </div>
                    <MailFilter folder={folder} filterBy={filterBy} onFilter={onSetFilterBy}/>
            </header>
            <aside className="grid-sections">
                    <MailFolderList folder={folder} onSetFolder={onSetFolder} />
                    <DynamicCmp isMailCompose={isMailCompose} onSetIsMailCompose={onSetIsMailCompose} 
                    sendMail={sendMail} params={params} mails={mails} onRemoveMail={removeMail} 
                    onChangeStarMail={changeStarMail} onChangeMailRead={changeMailRead}/>
            </aside>
        </section>
    )
}

function DynamicCmp(props) {

    if (props.params.mailId) {
        return <MailDetails {...props}/>
    } else {
        return <MailList {...props}/>
    }
}