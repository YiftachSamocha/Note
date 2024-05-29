import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { Link, useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail, onChangeStarMail, onChangeMailRead }) {
    const navigate = useNavigate()

    const isRead = mail.isRead ? 'read' : 'unread'
    const mailImage = mail.isRead ? 'mail-read' : 'envelope'

    function getShortSubject(subject) {
        const arrSubject = subject.split(' ')
        if (arrSubject.length > 5) return arrSubject.join(' ') + '...'
        return arrSubject.join(' ')
    }

    function sendAsNote() {
        const note = mailService.convertToNote(mail)
        mailService.addNoteFromMail(note)
            .then(() => navigate('/note'))
    }

    return (
        <article className={`mail-preview ${isRead}`} >
            <span className={`star ${mail.isStared ? 'on' : 'off'}`}
                onClick={() => onChangeStarMail(mail.id)}>
                &#9733;
            </span>
            <Link to={`/mail/${mail.id}`}>
                <div className="mails-info">
                    <p>{mail.from}</p>
                    <p>{getShortSubject(mail.subject)}</p>
                </div>                
            </Link>
            <div className="actions-btn">
                <span className="note-mail" title="Save as a Note" onClick={() => sendAsNote()}><img src="../../assets/img/paper-plane.png"/></span>
                <span className="unread-mail" title="Unread/Read Mail" onClick={() => onChangeMailRead(mail.id)}><img src={`../../assets/img/${mailImage}.png`}/></span>
                <span className="delete-mail" title="Delete Mail" onClick={() => onRemoveMail(mail.id)}><img src="../../assets/img/delete.png"/></span>
            </div>
        </article>
    )
}