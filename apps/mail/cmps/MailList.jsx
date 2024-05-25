const { useParams } = ReactRouter
const { Outlet } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx"

export function MailList(props) {
    const params = useParams()

    if (props.mails.length === 0) return 'No mails to show...'

    return (
    <section className="mail-list">
        {/* <Outlet /> */}
        { <ul>
            { props.mails.map(mail => 
            <li key={mail.id}>
                <MailPreview mail={mail} {...props}/>
            </li>
            )}
        </ul>}
    </section>
    ) 
}