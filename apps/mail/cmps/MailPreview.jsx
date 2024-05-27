const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail, onChangeStarMail, onChangeMailRead }) {
    const isRead = mail.isRead ? 'read' : 'unread'

    function getShortSubject(subject) {
        const arrSubject = subject.split(' ')
        if (arrSubject.length > 5) return arrSubject.join(' ') + '...'
        return arrSubject.join(' ')
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
                <span className="note-mail" title="Save as a Note" onClick={() => console.log('will be developed')}><img src="../../assets/img/paper-plane.png"/></span>
                <span className="unread-mail" title="Unread/Read Mail" onClick={() => onChangeMailRead(mail.id)}><img src="../../assets/img/envelope.png"/></span>
                <span className="delete-mail" title="Delete Mail" onClick={() => onRemoveMail(mail.id)}><img src="../../assets/img/delete.png"/></span>
            </div>
        </article>
    )
}