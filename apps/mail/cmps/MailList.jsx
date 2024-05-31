const { useParams } = ReactRouter
const { Outlet } = ReactRouterDOM

import { MailCompose } from "./MailCompose.jsx"
import { MailPreview } from "./MailPreview.jsx"

export function MailList(props) {
    const params = useParams()

    if (props.mails.length === 0 && !props.isMailCompose) return 'No mails to show...'

    return (
    <section className="mail-list">
        { <ul>
            { props.mails.map(mail => 
            <li key={mail.id}>
                <MailPreview mail={mail} {...props}/>
            </li>
            )}
        </ul>}
        {props.isMailCompose && <MailCompose {...props}/>}
    </section>
    ) 
}