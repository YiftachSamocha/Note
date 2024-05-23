const { Link } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onRemoveMail }) {
    return (
    <section className="mail-list">
        <ul>
            { mails.map(mail => 
            <li key={mail.id}>
                <MailPreview mail={mail} />
                <div className="actions-btn">
                    <Link to={`/mail/${mail.id}`}><button>Details</button></Link>
                    {/* <button className="note-mail-btn" onClick={() => onRemoveMail(mail.id)}>note</button>
                    <button className="unread-mail-btn" onClick={() => onRemoveMail(mail.id)}>unread</button> */}
                    <button className="delete-mail-btn" onClick={() => onRemoveMail(mail.id)}>Delete</button>
                </div>
            </li>
            )}
        </ul>
    </section>
    ) 
}