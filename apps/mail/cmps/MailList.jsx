import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onRemoveMail, onChangeStarMail }) {
    return (
    <section className="mail-list">
        <ul>
            { mails.map(mail => 
            <li key={mail.id}>
                <MailPreview mail={mail} onRemoveMail={onRemoveMail} onChangeStarMail={onChangeStarMail}/>
            </li>
            )}
        </ul>
    </section>
    ) 
}