const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    const isRead = mail.isRead ? 'read' : 'unread'
    const isStared = mail.isStared ? 'star' : ''

    return <article className={`mail-preview ${isRead} ${isStared}`} >
            <Link to={`/mail/${mail.id}`}>
                <div className="mails-info"></div>
                    <p>{mail.from}</p>
                    <p>{mail.subject}</p>                
            </Link>
        
        <div className="actions-btn">
            {/* <button className="note-mail-btn" onClick={() => onRemoveMail(mail.id)}>note</button>
            <button className="unread-mail-btn" onClick={() => onRemoveMail(mail.id)}>unread</button> */}
            <button className="delete-mail-btn" onClick={() => onRemoveMail(mail.id)}>Delete</button>
        </div>
    </article>
}