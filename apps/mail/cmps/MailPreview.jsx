const { Link } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail }) {
    const isRead = mail.isRead ? 'read' : 'unread'
    const isStared = mail.isStared ? 'star' : ''

    function getShortSubject(subject) {
        const arrSubject = subject.split(' ')
        if (arrSubject.length > 5) return arrSubject.join(' ') + '...'
        return arrSubject.join(' ')
    }

    return (
        <article className={`mail-preview ${isRead} ${isStared}`} >
            <Link to={`/mail/${mail.id}`}>
                <div className="mails-info"></div>
                    <p>{mail.from}</p>
                    <p>{getShortSubject(mail.subject)}</p>                
            </Link>
            <div className="actions-btn">
                {/* <button className="note-mail-btn" onClick={() => onRemoveMail(mail.id)}>note</button>
                <button className="unread-mail-btn" onClick={() => onRemoveMail(mail.id)}>unread</button> */}
                <button className="delete-mail-btn" onClick={() => onRemoveMail(mail.id)}>Delete</button>
            </div>
        </article>
    )
}