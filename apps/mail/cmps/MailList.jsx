import { MailPreview } from "./MailPreview.jsx"

export function MailList(props) {
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