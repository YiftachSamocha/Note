import { MailPreview } from "./MailPreview.jsx"

export function MailList(props) {
    if (props.mails.length === 0) return 'No mails to show...'

    return (
    <section className="mail-list">
        <ul>
            { props.mails.map(mail => 
            <li key={mail.id}>
                <MailPreview mail={mail} {...props}/>
            </li>
            )}
        </ul>
    </section>
    ) 
}