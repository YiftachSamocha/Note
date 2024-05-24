import { MailPreview } from "./MailPreview.jsx"

export function MailList(prop) {
    return (
    <section className="mail-list">
        <ul>
            { prop.mails.map(mail => 
            <li key={mail.id}>
                <MailPreview mail={mail} onRemoveMail={prop.onRemoveMail}/>
            </li>
            )}
        </ul>
    </section>
    ) 
}